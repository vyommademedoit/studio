"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import {
  BookText,
  BrainCircuit,
  Headphones,
  LoaderCircle,
  Sparkles,
  Target,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Logo } from "@/components/shared/logo";

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <LoaderCircle className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 py-20 text-center md:grid-cols-2 md:py-32 md:text-left">
          <div className="space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              Find Your Calm, One Breath at a Time
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Breathe Easy is your personal sanctuary to cultivate mindfulness, build healthy habits, and reflect on your emotional well-being.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Start Your Journey Today</Link>
            </Button>
          </div>
          <div className="relative h-64 w-full md:h-96">
            <Image
              src="https://picsum.photos/600/400"
              data-ai-hint="serene landscape"
              alt="Serene landscape"
              fill
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </section>

        <section id="features" className="bg-secondary/50 py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                A Toolbox for Your Mind
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover features designed to support your mental wellness journey.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<BookText className="h-8 w-8 text-primary" />}
                title="Mindful Journaling"
                description="Capture your thoughts and feelings. Our AI-powered analysis helps you understand your emotional landscape over time."
              />
              <FeatureCard
                icon={<Target className="h-8 w-8 text-primary" />}
                title="Habit Tracking"
                description="Build positive habits and break negative ones. Track your progress with streaks and stay motivated."
              />
              <FeatureCard
                icon={<Headphones className="h-8 w-8 text-primary" />}
                title="Guided Meditation"
                description="Access a library of guided meditations and ambient sounds to find your inner peace, anytime, anywhere."
              />
              <FeatureCard
                icon={<Sparkles className="h-8 w-8 text-primary" />}
                title="Daily Reflection"
                description="Start your day with intention using our AI-generated reflection prompts designed to spark insight."
              />
              <FeatureCard
                icon={<BrainCircuit className="h-8 w-8 text-primary" />}
                title="Journal Analysis"
                description="Gain deeper insights from your journal entries about your sentiment, trends and mental state."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Breathe Easy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <CardTitle className="font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
