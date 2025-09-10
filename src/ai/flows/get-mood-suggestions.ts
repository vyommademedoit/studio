'use server';

/**
 * @fileOverview Generates mood improvement suggestions based on user preferences.
 *
 * - getMoodSuggestions - A function that returns mood-boosting suggestions.
 * - GetMoodSuggestionsInput - The input type for the getMoodSuggestions function.
 * - GetMoodSuggestionsOutput - The return type for the getMoodSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetMoodSuggestionsInputSchema = z.object({
  preferences: z
    .array(z.string())
    .describe('An array of user-preferred wellness activities.'),
});
export type GetMoodSuggestionsInput = z.infer<
  typeof GetMoodSuggestionsInputSchema
>;

const GetMoodSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'An array of 3-4 concise, actionable mood-boosting suggestions.'
    ),
});
export type GetMoodSuggestionsOutput = z.infer<
  typeof GetMoodSuggestionsOutputSchema
>;

export async function getMoodSuggestions(
  input: GetMoodSuggestionsInput
): Promise<GetMoodSuggestionsOutput> {
  return getMoodSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moodSuggestionsPrompt',
  input: { schema: GetMoodSuggestionsInputSchema },
  output: { schema: GetMoodSuggestionsOutputSchema },
  prompt: `You are a cheerful and encouraging wellness coach. Based on the user's preferred activities, generate a list of 3-4 simple, actionable, and creative suggestions to help them improve their mood.

Keep the suggestions concise and easy to understand.

User's Preferred Activities:
{{#each preferences}}
- {{{this}}}
{{/each}}
`,
});

const getMoodSuggestionsFlow = ai.defineFlow(
  {
    name: 'getMoodSuggestionsFlow',
    inputSchema: GetMoodSuggestionsInputSchema,
    outputSchema: GetMoodSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
