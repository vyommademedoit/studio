"use client";

import { useEffect, useState } from "react";
import { getDailyReflectionQuestion } from "@/ai/flows/get-daily-reflection-question";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, LoaderCircle } from "lucide-react";
import useLocalStorage from "@/hooks/use-local-storage";
import { JournalEntry } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export function DailyReflection() {
  const [question, setQuestion] = useState("");
  const [reflection, setReflection] = useState("");
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>(
    "journalEntries",
    []
  );
  const { toast } = useToast();

  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    const storedQuestionData = localStorage.getItem("dailyQuestion");
    
    if (storedQuestionData) {
      const { date, question: storedQuestion } = JSON.parse(storedQuestionData);
      if (date === today) {
        setQuestion(storedQuestion);
        setLoadingQuestion(false);
        return;
      }
    }

    async function fetchQuestion() {
      try {
        setLoadingQuestion(true);
        const { question: newQuestion } = await getDailyReflectionQuestion();
        setQuestion(newQuestion);
        localStorage.setItem("dailyQuestion", JSON.stringify({ date: today, question: newQuestion }));
      } catch (error) {
        console.error("Failed to fetch daily question:", error);
        setQuestion("What are you grateful for today?"); // Fallback question
      } finally {
        setLoadingQuestion(false);
      }
    }
    fetchQuestion();
  }, []);

  const handleSave = () => {
    if (reflection.trim() === "") {
      toast({
        variant: "destructive",
        title: "Cannot Save Empty Reflection",
        description: "Please write something before saving.",
      });
      return;
    }

    setIsSaving(true);
    const newEntry: JournalEntry = {
      id: new Date().toISOString(),
      content: reflection,
      tags: ["reflection", "daily"],
      date: new Date().toISOString(),
      question: question,
    };

    setJournalEntries([newEntry, ...journalEntries]);
    setReflection("");
    toast({
      title: "Reflection Saved",
      description: "Your reflection has been added to your journal.",
    });
    setIsSaving(false);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" />
          <CardTitle className="font-headline text-2xl">
            Daily Reflection
          </CardTitle>
        </div>
        <CardDescription>
          A moment for yourself, powered by AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loadingQuestion ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          <p className="font-prompt text-lg font-medium text-foreground">{question}</p>
        )}
        <Textarea
          placeholder="Write your thoughts here..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={6}
          className="resize-none"
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Save to Journal
        </Button>
      </CardFooter>
    </Card>
  );
}
