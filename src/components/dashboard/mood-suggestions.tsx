"use client";

import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import {
  getMoodSuggestions,
  GetMoodSuggestionsOutput,
} from "@/ai/flows/get-mood-suggestions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ThumbsUp, LoaderCircle, WandSparkles } from "lucide-react";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

type ActivityId =
  | "exercise"
  | "meditation"
  | "journaling"
  | "creative"
  | "social"
  | "learning";

export function MoodSuggestions() {
  const [preferences] = useLocalStorage<ActivityId[]>(
    "wellness-preferences",
    []
  );
  const [suggestions, setSuggestions] =
    useState<GetMoodSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getMoodSuggestions({ preferences });
      setSuggestions(result);
    } catch (e: any) {
      console.error(e);
      if (e.message?.includes("503")) {
        setError("The AI is currently busy. Please try again in a moment.");
      } else {
        setError("Failed to get suggestions. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (preferences.length > 0) {
      fetchSuggestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferences]);

  const hasPreferences = preferences.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <WandSparkles className="h-6 w-6 text-accent" />
          <CardTitle className="font-headline text-xl">
            For Your Mood
          </CardTitle>
        </div>
        <CardDescription>AI-powered ideas just for you</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
          </div>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!isLoading && !error && suggestions && (
          <ul className="space-y-3">
            {suggestions.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-3">
                <ThumbsUp className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {suggestion}
                </span>
              </li>
            ))}
          </ul>
        )}
        {!isLoading && !hasPreferences && (
          <Alert>
            <AlertTitle>Personalize Your Suggestions!</AlertTitle>
            <AlertDescription>
              <p>
                To get mood-boosting ideas tailored just for you, set your favorite wellness activities in your profile.
              </p>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
       <CardFooter className="flex-col items-start gap-4">
        {!isLoading && hasPreferences && (
          <Button variant="outline" size="sm" onClick={fetchSuggestions}>
            Get New Suggestions
          </Button>
        )}
        {!isLoading && !hasPreferences && (
            <Button asChild variant="outline" className="w-full">
              <Link href="/profile">Set Preferences in Profile</Link>
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
