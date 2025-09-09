# App Directory

This directory contains the core of the application's user interface, managed by the [Next.js App Router](https://nextjs.org/docs/app).

## Routing Structure

The file and folder structure within `src/app` defines the application's routes.

- **`layout.tsx`**: This is the root layout that wraps all pages. It sets up the main HTML structure, including the `<html>` and `<body>` tags, and applies global fonts and the `AuthProvider`.
- **`loading.tsx`**: A global loading component that is displayed via React Suspense while page content is being loaded.
- **`page.tsx`**: The main landing page of the application, visible to unauthenticated users.

### Route Groups

The application uses route groups `(app)` and `(auth)` (implied for top-level pages like `login`) to organize routes and apply specific layouts without affecting the URL path.

- **`(app)` Group**:
  - **`layout.tsx`**: This layout protects all nested routes, ensuring only authenticated users can access them. It includes the main application `AppSidebar`.
  - **`/dashboard`**: The main page for authenticated users after logging in.
  - **`/habits`**: The page for tracking user habits.
  - **`/journal`**: The page for viewing and managing journal entries.
  - **`/journal/analysis`**: The page for the AI-powered journal analysis.
  - **`/meditate`**: The page for the guided meditation player.
  - **`/profile`**: The user profile page.
  - **`/resources`**: A page listing mental health resources.

- **Authentication Pages (outside the `(app)` group)**:
  - **`/login`**: The user login page.
  - **`/signup`**: The user registration page.
  - **`/forgot-password`**: The page for resetting a forgotten password.
  - These pages use the `AuthLayout` component directly within their respective `page.tsx` files to provide a consistent authentication screen design.

This structure ensures a clean separation between public-facing pages and the protected core application experience.
