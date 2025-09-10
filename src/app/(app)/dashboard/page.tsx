"use client";

import { useAuth } from "@/hooks/use-auth";
import { DailyReflection } from "@/components/dashboard/daily-reflection";
import { MoodSuggestions } from "@/components/dashboard/mood-suggestions";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-foreground">
          Welcome back, {user?.displayName?.split(" ")[0] || "friend"}
        </h1>
        <p className="text-lg text-muted-foreground">
          Ready to continue your wellness journey?
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DailyReflection />
        </div>
        <div className="flex flex-col gap-8">
          <MoodSuggestions />
        </div>
      </div>
    </div>
  );
}
