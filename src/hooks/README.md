# Hooks Directory

This directory contains custom React hooks that encapsulate and reuse stateful logic across different components in the application.

## Custom Hooks

- **`use-auth.ts`**:
  - **Purpose**: Provides an easy way for components to access the authentication state and methods.
  - **Functionality**: It's a simple consumer for the `AuthContext`. It handles checking if the hook is used within an `AuthProvider` and returns the context's value, which includes the current `user`, `loading` state, and authentication functions (`login`, `logout`, `signup`, etc.).

- **`use-local-storage.ts`**:
  - **Purpose**: A hook to synchronize a component's state with the browser's `localStorage`.
  - **Functionality**: It behaves similarly to `useState`, but the value is persisted in `localStorage`. This is crucial for storing user data like journal entries and habits directly on the user's device, ensuring privacy and data persistence between sessions. It is designed to work correctly with Next.js Server-Side Rendering (SSR) by only accessing `localStorage` on the client side.

- **`use-mobile.tsx`**:
  - **Purpose**: A simple utility hook to detect if the application is being viewed on a mobile-sized screen.
  - **Functionality**: It uses `window.matchMedia` to check the screen width against a predefined breakpoint. This is used to conditionally render different UI elements, such as the collapsible sidebar vs. the mobile off-canvas menu.

- **`use-toast.ts`**:
  - **Purpose**: A hook for displaying toast notifications (small pop-up messages).
  - **Functionality**: It provides a `toast` function that can be called from any component to trigger a notification. This is used throughout the app to give users feedback on actions, such as saving a journal entry or encountering an error.
