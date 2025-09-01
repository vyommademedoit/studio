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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { JournalEntry } from "@/types";

const formSchema = z.object({
  content: z.string().min(1, { message: "Entry content cannot be empty." }),
  tags: z.string(),
});

interface JournalDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: (entry: JournalEntry) => void;
  entry: JournalEntry | null;
}

export function JournalDialog({
  isOpen,
  setIsOpen,
  onSave,
  entry,
}: JournalDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      tags: "",
    },
  });

  useEffect(() => {
    if (entry) {
      form.reset({
        content: entry.content,
        tags: entry.tags.join(", "),
      });
    } else {
      form.reset({ content: "", tags: "" });
    }
  }, [entry, form, isOpen]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newEntry: JournalEntry = {
      id: entry ? entry.id : new Date().toISOString(),
      content: values.content,
      tags: values.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      date: entry ? entry.date : new Date().toISOString(),
      question: entry?.question,
    };
    onSave(newEntry);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {entry ? "Edit Journal Entry" : "New Journal Entry"}
          </DialogTitle>
          <DialogDescription>
            {entry
              ? "Make changes to your entry."
              : "Capture your thoughts and feelings."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Thoughts</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's on your mind?"
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., work, reflection, grateful"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Entry</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
