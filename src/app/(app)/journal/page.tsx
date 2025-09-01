"use client";

import { useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { JournalDialog } from "@/components/journal/journal-dialog";
import { JournalCard } from "@/components/journal/journal-card";
import type { JournalEntry } from "@/types";

export default function JournalPage() {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>(
    "journalEntries",
    []
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  const handleAddNew = () => {
    setEditingEntry(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleSave = (entry: JournalEntry) => {
    if (editingEntry) {
      setEntries(
        entries.map((e) => (e.id === entry.id ? entry : e))
      );
    } else {
      setEntries([entry, ...entries]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold text-foreground">
            My Journal
          </h1>
          <p className="text-lg text-muted-foreground">
            Your private space for thoughts and reflections.
          </p>
        </div>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Entry
        </Button>
      </header>
      
      {entries.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <JournalCard
              key={entry.id}
              entry={entry}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
         <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
          <p className="mb-4 text-xl text-muted-foreground">
            Your journal is empty.
          </p>
          <Button onClick={handleAddNew} size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Write Your First Entry
          </Button>
        </div>
      )}

      <JournalDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onSave={handleSave}
        entry={editingEntry}
      />
    </div>
  );
}
