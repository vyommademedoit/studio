"use client";

import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, LoaderCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import useLocalStorage from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";

const passwordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const wellnessActivities = [
  { id: "exercise", label: "Exercise" },
  { id: "meditation", label: "Meditation" },
  { id: "journaling", label: "Journaling" },
  { id: "creative", label: "Creative Hobbies" },
  { id: "social", label: "Socializing" },
  { id: "learning", label: "Learning" },
] as const;

type ActivityId = (typeof wellnessActivities)[number]["id"];

const preferencesFormSchema = z.object({
  activities: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

export default function ProfilePage() {
  const { user, logout, changePassword } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [preferences, setPreferences] = useLocalStorage<ActivityId[]>(
    "wellness-preferences",
    ["exercise", "meditation"]
  );

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const preferencesForm = useForm<z.infer<typeof preferencesFormSchema>>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      activities: preferences,
    },
  });

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  async function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    setIsPasswordLoading(true);
    try {
      await changePassword(values.newPassword);
      passwordForm.reset();
    } catch (error) {
      // Error is handled by toast in auth context
    } finally {
      setIsPasswordLoading(false);
    }
  }

  function onPreferencesSubmit(data: z.infer<typeof preferencesFormSchema>) {
    setPreferences(data.activities as ActivityId[]);
    toast({
      title: "Preferences Saved",
      description: "Your wellness preferences have been updated.",
    });
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.photoURL ?? undefined} />
            <AvatarFallback className="text-3xl">
              {getInitials(user?.displayName)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-2xl pt-4">
            {user?.displayName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Member Since
              </p>
              <p className="font-semibold">
                {user?.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">
              Wellness Preferences
            </h3>
            <p className="text-sm text-muted-foreground">
              Select activities you enjoy to get personalized suggestions.
            </p>
            <Form {...preferencesForm}>
              <form
                onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={preferencesForm.control}
                  name="activities"
                  render={() => (
                    <FormItem className="space-y-3">
                      {wellnessActivities.map((item) => (
                        <FormField
                          key={item.id}
                          control={preferencesForm.control}
                          name="activities"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save Preferences</Button>
              </form>
            </Form>
          </div>

          <Separator />
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">
              Change Password
            </h3>
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={
                              showConfirmPassword ? "text" : "password"
                            }
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPasswordLoading}
                >
                  {isPasswordLoading && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Password
                </Button>
              </form>
            </Form>
          </div>
          <Separator />
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
