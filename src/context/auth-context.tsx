"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import type {
  AuthContextType,
  LoginCredentials,
  SignupCredentials,
} from "@/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }: LoginCredentials) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
      throw error;
    }
  };

  const signup = async ({ username, email, password }: SignupCredentials) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: username,
        });
        // Manually update the user state to reflect the displayName immediately
        setUser({ ...userCredential.user, displayName: username });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message,
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password Reset Email Sent",
        description:
          "Check your inbox for a link to reset your password.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Password Reset Failed",
        description: error.message,
      });
      throw error;
    }
  };

  const changePassword = async (newPassword: string) => {
    if (!auth.currentUser) {
      toast({
        variant: "destructive",
        title: "Not Authenticated",
        description: "You must be logged in to change your password.",
      });
      throw new Error("User not authenticated");
    }
    try {
      await updatePassword(auth.currentUser, newPassword);
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Password Update Failed",
        description: error.message,
      });
      throw error;
    }
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
