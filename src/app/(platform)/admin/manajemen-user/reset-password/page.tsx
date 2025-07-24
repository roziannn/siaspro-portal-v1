"use client";

import { useState, FormEvent } from "react";
import dataAkun from "../data-akun/data.json";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "react-hot-toast";
import { IconKey } from "@tabler/icons-react";

type Akun = {
  nama: string;
  email: string;
  isActive: boolean;
};

export default function ResetPasswordPage() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<Akun | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter data based on search input (nama or email)
  const filteredUsers = dataAkun.filter((user) => user.nama.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));

  const handleSelectUser = (user: Akun) => {
    setSelectedUser(user);
    setSearch(`${user.nama} (${user.email})`);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedUser) {
      toast.error("Pilih user terlebih dahulu");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success(`Password untuk ${selectedUser.nama} berhasil direset!`);
      setSelectedUser(null);
      setSearch("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="px-1 lg:px-6 space-y-4 max-w-2xl">
        <Card>
          <CardHeader>
            <h1 className="text-xl font-semibold">Reset Password</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <label htmlFor="userSearch" className="block font-medium mb-4">
                Cari nama atau email pengguna
              </label>
              <Input
                id="userSearch"
                type="text"
                placeholder="Ketik nama atau email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedUser(null);
                }}
                autoComplete="off"
              />
              {/* List filtered users, simple clickable list */}
              {search && filteredUsers.length > 0 && (
                <ul className="border rounded max-h-40 overflow-auto mt-1 bg-white shadow-sm">
                  {filteredUsers.slice(0, 5).map((user, idx) => (
                    <li key={idx} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectUser(user)}>
                      {user.nama} ({user.email})
                    </li>
                  ))}
                </ul>
              )}
              {search && filteredUsers.length === 0 && <p className="text-sm text-muted-foreground mt-1">Tidak ada user ditemukan.</p>}

              <div className="flex justify-end mt-4">
                <Button type="submit" disabled={isSubmitting} className="flex items-center justify-start gap-2 w-50">
                  <IconKey className="w-5 h-5" />
                  {isSubmitting ? "Sedang reset..." : "Reset Password Akun"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
