# Unwinding - Your Personal Wellness Sanctuary

Welcome to Unwinding, your personal sanctuary to cultivate mindfulness, build healthy habits, and reflect on your emotional well-being. This application is designed to be a private, supportive space for your mental wellness journey.

## ✨ Features

- **Mindful Journaling**: A private space to capture your thoughts and feelings.
- **AI-Powered Analysis**: Uncover insights from your journal entries about your overall sentiment, emotional trends, and mental state. Your data is analyzed on-device to ensure privacy.
- **Habit Tracking**: A tool to help you build positive habits and break negative ones. Track your progress with streaks to stay motivated.
- **Guided Meditation**: Access ambient sounds to find your inner peace and focus, anytime, anywhere.
- **Daily Reflection**: Start your day with intention using AI-generated reflection prompts designed to spark insight and self-discovery.
- **Resource Center**: Quick access to professional mental health resources and hotlines.
- **Secure Authentication**: Your data is protected with secure email/password authentication provided by Firebase.

## 🚀 Technology Stack

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit)
- **Backend & Authentication**: [Firebase](https://firebase.google.com/)
- **Fonts**: Nunito & Lora from [Google Fonts](https://fonts.google.com/) for a relaxing aesthetic.
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Project Structure

Here is a high-level overview of the important files and directories:

```
/
├── public/                 # Static assets
├── src/
│   ├── ai/                 # Genkit flows for AI features
│   ├── app/                # Next.js App Router pages and layouts
│   ├── components/         # Reusable React components (UI, features)
│   ├── context/            # React context providers (e.g., AuthContext)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and library initializations (e.g., Firebase)
│   └── types/              # TypeScript type definitions
├── .env                    # Environment variables (contains Firebase config)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

For more detailed information, please see the `README.md` files within each of the `src` subdirectories.

## Getting Started

First, ensure you have Node.js and npm installed.

Then, to run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.
