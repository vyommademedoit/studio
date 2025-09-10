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

const formSchema = z
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

export default function ProfilePage() {
  const { user, logout, changePassword } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
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
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await changePassword(values.newPassword);
      form.reset();
    } catch (error) {
      // Error is handled by toast in auth context
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-lg shadow-lg">
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
        <CardContent className="space-y-4">
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
          <Separator />
           <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">Change Password</h3>
             <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                           <div className="relative">
                             <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                   <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
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
