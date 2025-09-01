'use server';

/**
 * @fileOverview A journal entry analysis AI agent.
 *
 * - analyzeJournalEntries - A function that handles the journal entries analysis process.
 * - AnalyzeJournalEntriesInput - The input type for the analyzeJournalEntries function.
 * - AnalyzeJournalEntriesOutput - The return type for the analyzeJournalEntries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeJournalEntriesInputSchema = z.object({
  journalEntries: z
    .array(z.string())
    .describe('An array of journal entries to analyze.'),
});
export type AnalyzeJournalEntriesInput = z.infer<typeof AnalyzeJournalEntriesInputSchema>;

const AnalyzeJournalEntriesOutputSchema = z.object({
  overallSentiment: z.string().describe('The overall sentiment of the journal entries.'),
  emotionalTrends: z.string().describe('The emotional trends observed in the journal entries.'),
  mentalStateInsights: z
    .string()
    .describe('Insights into the user\'s mental state based on the journal entries.'),
});
export type AnalyzeJournalEntriesOutput = z.infer<typeof AnalyzeJournalEntriesOutputSchema>;

export async function analyzeJournalEntries(
  input: AnalyzeJournalEntriesInput
): Promise<AnalyzeJournalEntriesOutput> {
  return analyzeJournalEntriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeJournalEntriesPrompt',
  input: {schema: AnalyzeJournalEntriesInputSchema},
  output: {schema: AnalyzeJournalEntriesOutputSchema},
  prompt: `You are an AI specializing in analyzing journal entries to provide insights into a user's emotional well-being.\n\nAnalyze the following journal entries and identify the overall sentiment, emotional trends, and provide insights into the user's mental state.\n\nJournal Entries:\n{{#each journalEntries}}\n- {{{this}}}\n{{/each}}\n\nProvide your analysis in a structured format.  Return the overall sentiment, emotional trends, and mental state insights. Be concise.\n\nOverall Sentiment: Summarize the overall sentiment expressed in the journal entries.\nEmotional Trends: Identify any recurring emotional patterns or shifts in emotions.\nMental State Insights: Provide insights into the user's mental state, such as stress levels, coping mechanisms, or areas of concern.`,
});

const analyzeJournalEntriesFlow = ai.defineFlow(
  {
    name: 'analyzeJournalEntriesFlow',
    inputSchema: AnalyzeJournalEntriesInputSchema,
    outputSchema: AnalyzeJournalEntriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
