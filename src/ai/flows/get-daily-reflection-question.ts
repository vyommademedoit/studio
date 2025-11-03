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
  prompt: `You are a wise and compassionate wellness coach, specializing in crafting insightful questions for deep self-reflection. Your goal is to generate a single, unique, and thought-provoking question that encourages the user to pause and journal.

Avoid generic or cliché questions like "What are you grateful for?". Instead, create questions that gently probe into areas like personal growth, emotional awareness, recent experiences, or future aspirations. The question should be open-ended, concise, and feel like a personal invitation to reflect.

Here are some examples of the style you should aim for:
- "What is one small, brave step you took this week, and what did it teach you?"
- "If you could give your younger self one piece of advice right now, what would it be and why?"
- "What emotion have you been trying to avoid lately, and what might happen if you allowed yourself to feel it?"

Now, generate a new, single, thought-provoking question in that style.`,
});

const getDailyReflectionQuestionFlow = ai.defineFlow({
  name: 'getDailyReflectionQuestionFlow',
  outputSchema: DailyReflectionQuestionOutputSchema,
},
async () => {
  const {output} = await prompt({});
  return output!;
});
