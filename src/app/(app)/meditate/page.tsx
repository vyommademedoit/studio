"use client";

import { MeditationPlayer } from "@/components/meditation/meditation-player";

export default function MeditatePage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 text-center md:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-foreground">
          Meditation Space
        </h1>
        <p className="text-lg text-muted-foreground">
          Find your focus, relax your mind.
        </p>
      </header>
      <MeditationPlayer />
    </div>
  );
}
