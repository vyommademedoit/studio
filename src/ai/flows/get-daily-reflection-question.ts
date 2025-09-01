'use server';

/**
 * @fileOverview Generates a daily reflection question using Genkit.
 *
 * - getDailyReflectionQuestion - A function that returns a daily reflection question.
 * - DailyReflectionQuestionOutput - The return type for the getDailyReflectionQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyReflectionQuestionOutputSchema = z.object({
  question: z.string().describe('A thought-provoking question for daily reflection.'),
});
export type DailyReflectionQuestionOutput = z.infer<
  typeof DailyReflectionQuestionOutputSchema
>;

export async function getDailyReflectionQuestion(): Promise<DailyReflectionQuestionOutput> {
  return getDailyReflectionQuestionFlow();
}

const prompt = ai.definePrompt({
  name: 'dailyReflectionPrompt',
  output: {schema: DailyReflectionQuestionOutputSchema},
  prompt: `You are a mindfulness expert. Your task is to generate a single, thought-provoking question that encourages deep reflection and journaling.  The question should be open-ended and suitable for a daily reflection prompt.`,
});

const getDailyReflectionQuestionFlow = ai.defineFlow({
  name: 'getDailyReflectionQuestionFlow',
  outputSchema: DailyReflectionQuestionOutputSchema,
},
async () => {
  const {output} = await prompt({});
  return output!;
});