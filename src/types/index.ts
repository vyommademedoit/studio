import type { User } from "firebase/auth";

export type Habit = {
  id: string;
  name: string;
  type: "good" | "bad";
  createdAt: string; // ISO string
  completedDates: string[]; // array of 'YYYY-MM-DD'
};

export type JournalEntry = {
  id: string;
  content: string;
  tags: string[];
  date: string; // ISO string
  question?: string;
};

export type Resource = {
  name: string;
  description: string;
  phone: string;
  website: string;
};


// Auth
export type LoginCredentials = {
  email: string;
  password?: string;
};

export type SignupCredentials = LoginCredentials & {
  username: string;
  confirmPassword?: string;
};

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
