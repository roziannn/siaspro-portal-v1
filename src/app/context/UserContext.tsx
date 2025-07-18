"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Role = "administrator" | "mahasiswa" | "dosen"; // Tambah sesuai kebutuhan

interface User {
  id: number;
  email: string;
  role: Role; // Simpan sebagai string, bukan array
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Ambil dari localStorage saat pertama load
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserState(parsed);
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Simpan ke localStorage setiap kali user berubah
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const setUser = (newUser: any) => {
    if (newUser && Array.isArray(newUser.roles)) {
      const role = newUser.roles[0] || "mahasiswa";
      const cleanedUser: User = {
        id: newUser.id,
        email: newUser.email,
        role,
      };
      setUserState(cleanedUser);
    } else {
      setUserState(null);
    }
  };

  return <UserContext.Provider value={{ user, setUser, loading }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
