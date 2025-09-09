# Lib Directory

This directory contains utility functions, library initializations, and other shared code that doesn't fit into the other categories like `hooks` or `components`.

## Files

- **`firebase.ts`**:
  - **Purpose**: Initializes and exports the Firebase app instance and authentication service.
  - **Details**: This file reads the Firebase configuration keys from environment variables (`.env`) and uses them to initialize the Firebase SDK with `initializeApp`. It then exports the `auth` service, which is used by the `AuthContext` to handle all user authentication tasks. This centralized setup ensures that Firebase is initialized only once in the application.

- **`utils.ts`**:
  - **Purpose**: A collection of general-purpose utility functions.
  - **Details**: This file currently contains the `cn` function, which is a helper for conditionally joining CSS class names. It combines the functionality of `clsx` and `tailwind-merge` to safely merge Tailwind CSS classes without style conflicts. It's a standard utility provided by ShadCN/UI.
