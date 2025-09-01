"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Habit } from "@/types";

const formSchema = z.object({
  name: z.string().min(2, { message: "Habit name must be at least 2 characters." }),
  type: z.enum(["good", "bad"]),
});

interface HabitDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: (habit: Habit) => void;
  habit: Habit | null;
}

export function HabitDialog({
  isOpen,
  setIsOpen,
  onSave,
  habit,
}: HabitDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "good",
    },
  });

  useEffect(() => {
    if (habit) {
      form.reset(habit);
    } else {
      form.reset({ name: "", type: "good" });
    }
  }, [habit, form, isOpen]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newHabit: Habit = {
      id: habit ? habit.id : new Date().toISOString(),
      name: values.name,
      type: values.type,
      createdAt: habit ? habit.createdAt : new Date().toISOString(),
      completedDates: habit ? habit.completedDates : [],
    };
    onSave(newHabit);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{habit ? "Edit Habit" : "Add New Habit"}</DialogTitle>
          <DialogDescription>
            {habit
              ? "Make changes to your habit."
              : "Start a new habit to track."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Read for 15 minutes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="good">Good Habit (to build)</SelectItem>
                      <SelectItem value="bad">Bad Habit (to quit)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Habit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
