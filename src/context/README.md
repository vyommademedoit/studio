# Context Directory

This directory contains React Context providers for managing global state that needs to be accessible by many components throughout the application.

## AuthContext

- **`auth-context.tsx`**: This is the primary context provider for managing user authentication.

### Purpose

The `AuthContext` is responsible for:
- Tracking the current authenticated user's state (`user` object or `null`).
- Providing a `loading` state to indicate when the authentication status is being checked.
- Exposing methods to interact with Firebase Authentication: `login`, `signup`, `logout`, and `resetPassword`.
- Handling communication with the Firebase SDK for all authentication-related tasks.
- Displaying toast notifications for feedback on authentication success or failure.

### How It's Used

The `AuthProvider` is wrapped around the entire application in the root `src/app/layout.tsx`. This makes the authentication state and functions available to every component in the component tree.

Components can then access this context via the `useAuth` custom hook (`src/hooks/use-auth.ts`) to get user information or perform authentication actions.
