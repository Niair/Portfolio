'use server';

/**
 * @fileOverview Implements an AI chatbot assistant for answering user queries about the portfolio projects.
 *
 * - aiChatbotAssistant - A function that handles the chatbot interaction process.
 * - AIChatbotAssistantInput - The input type for the aiChatbotAssistant function.
 * - AIChatbotAssistantOutput - The return type for the aiChatbotAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotAssistantInputSchema = z.object({
  query: z.string().describe('The user query or question.'),
});
export type AIChatbotAssistantInput = z.infer<typeof AIChatbotAssistantInputSchema>;

const AIChatbotAssistantOutputSchema = z.object({
  response: z.string().describe('The AI chatbot response to the user query.'),
});
export type AIChatbotAssistantOutput = z.infer<typeof AIChatbotAssistantOutputSchema>;

export async function aiChatbotAssistant(input: AIChatbotAssistantInput): Promise<AIChatbotAssistantOutput> {
  return aiChatbotAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotAssistantPrompt',
  input: {schema: AIChatbotAssistantInputSchema},
  output: {schema: AIChatbotAssistantOutputSchema},
  prompt: `You are an AI chatbot assistant designed to answer user queries about data science projects in a portfolio.
  Use the provided context about the projects to answer the user's question as accurately and informatively as possible.
  If the question is not relevant to the projects or the portfolio, respond politely that you cannot answer the question.

  User Query: {{{query}}}
  `,
});

const aiChatbotAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatbotAssistantFlow',
    inputSchema: AIChatbotAssistantInputSchema,
    outputSchema: AIChatbotAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
