"use client";

import { useAuth } from "@/hooks/use-auth";
import { DailyReflection } from "@/components/dashboard/daily-reflection";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookText, Headphones, LifeBuoy, Target } from "lucide-react";
import Link from "next/link";

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
          <h2 className="font-headline text-xl font-semibold">Quick Access</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <QuickAccessCard
              href="/journal"
              title="My Journal"
              description="View and manage your entries."
              icon={<BookText className="h-6 w-6 text-primary" />}
            />
            <QuickAccessCard
              href="/habits"
              title="Habit Tracker"
              description="Check in on your daily habits."
              icon={<Target className="h-6 w-6 text-primary" />}
            />
            <QuickAccessCard
              href="/meditate"
              title="Meditate"
              description="Take a moment to be present."
              icon={<Headphones className="h-6 w-6 text-primary" />}
            />
             <QuickAccessCard
              href="/resources"
              title="Resources"
              description="Find helpful support resources."
              icon={<LifeBuoy className="h-6 w-6 text-primary" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAccessCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          {icon}
          <div>
            <CardTitle className="font-headline text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
