# Components Directory

This directory houses all the React components that make up the application's user interface. The components are organized to promote reusability and maintain a clean project structure.

## Structure

The `components` directory is broken down into several subdirectories:

- **`auth/`**: Components specifically used in the authentication flow (e.g., login, signup pages).
  - `auth-layout.tsx`: A wrapper component that provides a consistent layout for all authentication screens.

- **`dashboard/`**: Components that are specific to the main user dashboard.
  - `daily-reflection.tsx`: The card component that displays the AI-generated daily reflection prompt.

- **`habits/`**: Components related to the habit tracking feature.
  - `habit-card.tsx`: The card for displaying an individual habit.
  - `habit-dialog.tsx`: The modal dialog for adding or editing a habit.

- **`journal/`**: Components related to the journaling feature.
  - `journal-card.tsx`: The card for displaying a summary of a journal entry.
  - `journal-dialog.tsx`: The modal dialog for writing or editing a journal entry.

- **`meditation/`**: Components for the meditation feature.
  - `meditation-player.tsx`: The interactive player for ambient sounds and timed meditation sessions.

- **`shared/`**: Common, reusable components used across multiple features or pages.
  - `logo.tsx`: The application's logo component.

- **`ui/`**: Low-level, generic UI components, primarily from the **ShadCN/UI** library. These are the building blocks of the application's design system (e.g., `Button.tsx`, `Card.tsx`, `Input.tsx`). The `sidebar.tsx` component is a more complex, custom-built component for the application's navigation.

## UI Library: ShadCN/UI

This project uses [ShadCN/UI](https://ui.shadcn.com/) as its component library. ShadCN is not a traditional component library that you install as a package. Instead, you use a CLI tool to add individual, unstyled components directly into your project's source code (under `src/components/ui`).

This approach gives us full control over the code, styling, and behavior of our base components, making it easy to customize them to fit the application's unique design.
