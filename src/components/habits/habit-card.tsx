"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Flame, Check, Edit, Trash2 } from "lucide-react";
import type { Habit } from "@/types";
import { format, isToday, isYesterday, differenceInDays } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMemo } from "react";

interface HabitCardProps {
  habit: Habit;
  setHabits: (updateFn: (habits: Habit[]) => Habit[]) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

export function HabitCard({
  habit,
  setHabits,
  onEdit,
  onDelete,
}: HabitCardProps) {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const isDoneToday = habit.completedDates.includes(todayStr);

  const streak = useMemo(() => {
    let currentStreak = 0;
    if (habit.completedDates.length === 0) return 0;

    const sortedDates = [...habit.completedDates]
      .map((d) => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    let lastDate = new Date();

    if (isToday(sortedDates[0]) || isYesterday(sortedDates[0])) {
      if (isToday(sortedDates[0])) {
         currentStreak = 1;
         lastDate = sortedDates[0];
      } else { // isYesterday
         currentStreak = 1;
         lastDate = sortedDates[0];
      }
    } else {
        return 0;
    }
    
    for (let i = 1; i < sortedDates.length; i++) {
        const diff = differenceInDays(lastDate, sortedDates[i]);
        if (diff === 1) {
            currentStreak++;
            lastDate = sortedDates[i];
        } else if (diff > 1) {
            break;
        }
    }

    return currentStreak;
  }, [habit.completedDates]);

  const handleMarkAsDone = () => {
    setHabits((prevHabits) =>
      prevHabits.map((h) =>
        h.id === habit.id
          ? { ...h, completedDates: [...h.completedDates, todayStr] }
          : h
      )
    );
  };

  return (
    <Card
      className={`flex flex-col ${
        habit.type === "bad" ? "bg-red-50 dark:bg-red-900/20" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="font-headline text-lg">{habit.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(habit)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your habit and all its data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(habit.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </div>
        </div>
        <CardDescription>
          {habit.type === "good" ? "Build this habit" : "Quit this habit"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-2 text-lg font-bold text-amber-500">
          <Flame className="h-6 w-6" />
          <span>{streak} Day Streak</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleMarkAsDone}
          disabled={isDoneToday}
        >
          {isDoneToday ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Done for Today
            </>
          ) : (
            "Mark as Done"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
