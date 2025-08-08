"use client";

import { useState, useEffect, FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { IconKey, IconX } from "@tabler/icons-react";
import SectionHeader from "@/components/font/headerSectionText";
import PwUnclockimg from "@/../public/img/pwunclock.png";
import Image from "next/image";

type Akun = {
  name: string;
  email: string;
  isActive: boolean;
};

export default function ResetPasswordPage() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<Akun | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState<Akun[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch("/api/user-akun")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => toast.error("Gagal memuat data user"));
  }, []);

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));

  const handleSelectUser = (user: Akun) => {
    setSelectedUser(user);
    setSearch(user.name); // hanya tampilkan nama di input
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedUser) {
      toast.error("Pilih user terlebih dahulu");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/user-akun", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: selectedUser.email }),
      });

      if (!res.ok) {
        throw new Error("Gagal reset password");
      }

      toast.success(`Password untuk ${selectedUser.name} berhasil direset!`);
      setSelectedUser(null);
      setSearch("");
    } catch (error) {
      toast.error("Terjadi kesalahan saat reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3 px-1 md:px-4">
      <SectionHeader className="mb-8" title="Reset Password Akun" description="Reset password untuk akun user dengan email." />
      <div className="flex flex-col lg:flex-row items-center gap-5">
        <Image src={PwUnclockimg} alt="Password Unclock" width={600} height={400} className="mx-auto lg:mx-0" />

        <Card className="w-full max-w-xl">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 relative">
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
                  setShowSuggestions(true);
                }}
                onFocus={() => {
                  if (search) setShowSuggestions(true);
                }}
                autoComplete="off"
              />

              {/* Dropdown hasil pencarian */}
              {showSuggestions && search && !selectedUser && (
                <ul className="absolute z-10 w-full border rounded max-h-50 overflow-auto bg-white shadow-sm">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.slice(0, 5).map((user, idx) => (
                      <li key={idx} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectUser(user)}>
                        <span className="font-medium">{user.name}</span> <span className="text-gray-500">({user.email})</span>
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-sm text-gray-500">Tidak ada user ditemukan.</li>
                  )}
                </ul>
              )}

              {/* Badge user terpilih */}
              {selectedUser && (
                <div className="flex items-center gap-2 mt-1 bg-green-50 border border-green-200 rounded px-2 py-1 text-sm text-green-800">
                  <span>
                    {selectedUser.name} ({selectedUser.email})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUser(null);
                      setSearch("");
                    }}
                  >
                    <IconX size={16} className="text-green-600" />
                  </button>
                </div>
              )}

              <div className="flex justify-end mt-4">
                <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                  <IconKey className="w-5 h-5" />
                  {isSubmitting ? "Sedang reset..." : "Reset Password Akun"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
