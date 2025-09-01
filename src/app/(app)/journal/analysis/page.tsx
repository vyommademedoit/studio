"use client";

import { useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircle, BrainCircuit, Info, Lightbulb, TrendingUp, Smile } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { analyzeJournalEntries, AnalyzeJournalEntriesOutput } from "@/ai/flows/analyze-journal-entries";
import type { JournalEntry } from "@/types";

export default function JournalAnalysisPage() {
  const [entries] = useLocalStorage<JournalEntry[]>("journalEntries", []);
  const [analysis, setAnalysis] = useState<AnalyzeJournalEntriesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const journalContents = entries.map((e) => e.content);
      const result = await analyzeJournalEntries({ journalEntries: journalContents });
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      setError("Failed to analyze journal entries. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const canAnalyze = entries.length >= 3;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-foreground">
          Journal Analysis
        </h1>
        <p className="text-lg text-muted-foreground">
          Uncover insights from your entries with AI.
        </p>
      </header>

      <div className="mb-8 max-w-2xl">
        {!canAnalyze ? (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>More Entries Needed</AlertTitle>
            <AlertDescription>
              You need at least 3 journal entries to get an analysis. Keep writing!
              You currently have {entries.length} {entries.length === 1 ? 'entry' : 'entries'}.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="flex flex-col items-start gap-4 rounded-lg border p-6">
            <p className="text-muted-foreground">
              When you're ready, we'll analyze your {entries.length} journal entries to identify emotional trends and insights. Your data stays on your device and is only sent for this analysis.
            </p>
            <Button onClick={handleAnalyze} disabled={isLoading || !canAnalyze} size="lg">
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  Analyze My Journal
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle>Analysis Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {analysis && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnalysisCard
            icon={<Smile className="h-8 w-8 text-primary" />}
            title="Overall Sentiment"
            content={analysis.overallSentiment}
          />
          <AnalysisCard
            icon={<TrendingUp className="h-8 w-8 text-primary" />}
            title="Emotional Trends"
            content={analysis.emotionalTrends}
          />
          <AnalysisCard
            icon={<Lightbulb className="h-8 w-8 text-primary" />}
            title="Mental State Insights"
            content={analysis.mentalStateInsights}
          />
        </div>
      )}
    </div>
  );
}

function AnalysisCard({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}
