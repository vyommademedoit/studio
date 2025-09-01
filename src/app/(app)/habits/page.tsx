"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import useLocalStorage from "@/hooks/use-local-storage";
import type { Habit } from "@/types";
import { HabitDialog } from "@/components/habits/habit-dialog";
import { HabitCard } from "@/components/habits/habit-card";

export default function HabitsPage() {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const handleAddHabit = () => {
    setEditingHabit(null);
    setIsDialogOpen(true);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsDialogOpen(true);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const handleSaveHabit = (habit: Habit) => {
    if (editingHabit) {
      setHabits(habits.map((h) => (h.id === habit.id ? habit : h)));
    } else {
      setHabits([habit, ...habits]);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold text-foreground">
            Habit Tracker
          </h1>
          <p className="text-lg text-muted-foreground">
            Cultivate good habits, one day at a time.
          </p>
        </div>
        <Button onClick={handleAddHabit}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Habit
        </Button>
      </header>

      {habits.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              setHabits={setHabits}
              onEdit={handleEditHabit}
              onDelete={handleDeleteHabit}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
          <p className="mb-4 text-xl text-muted-foreground">
            You haven&apos;t added any habits yet.
          </p>
          <Button onClick={handleAddHabit} size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Your First Habit
          </Button>
        </div>
      )}

      <HabitDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onSave={handleSaveHabit}
        habit={editingHabit}
      />
    </div>
  );
}
