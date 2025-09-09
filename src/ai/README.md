# AI Directory

This directory is the heart of the application's generative AI capabilities, powered by **Genkit**. It contains all the server-side logic required to interact with Google's AI models.

## Genkit

[Genkit](https://firebase.google.com/docs/genkit) is a framework from Google that simplifies the development of AI-powered features. It provides a structured way to define prompts, manage model interactions, and create robust AI "flows".

### Core Concepts

- **`genkit.ts`**: This file initializes and configures the global Genkit instance for the application. It specifies which plugins to use (like `googleAI`) and sets the default model (e.g., `gemini-2.5-flash`).

- **Flows (`flows/`)**: A "flow" is a server-side function that orchestrates an AI task. It can involve calling an AI model, processing data, and interacting with other services. Each flow is defined in its own file within the `flows/` directory.

- **Prompts**: A prompt is a template that is sent to the language model. In Genkit, prompts are strongly typed using Zod schemas for both input and output, which helps ensure that the model's response is structured and predictable.

### Current AI Flows

- **`analyze-journal-entries.ts`**:
  - **Purpose**: To analyze a user's journal entries and provide insights.
  - **Input**: An array of journal entry strings.
  - **Output**: A structured object containing `overallSentiment`, `emotionalTrends`, and `mentalStateInsights`.
  - **How it works**: This flow takes the user's journal entries and uses a specifically crafted prompt to ask the AI model to act as a wellness expert and provide a concise analysis.

- **`get-daily-reflection-question.ts`**:
  - **Purpose**: To generate a unique, thought-provoking question for the user's daily reflection.
  - **Input**: None.
  - **Output**: An object containing a single `question` string.
  - **How it works**: This flow uses a simple prompt that instructs the AI model to act as a mindfulness expert and generate a single, open-ended question suitable for journaling.
