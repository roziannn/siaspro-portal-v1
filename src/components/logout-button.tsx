"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export function LogoutButton({ setProfileOpen }: { setProfileOpen: (open: boolean) => void }) {
  const router = useRouter();
  const { setUser } = useUser();

  async function handleLogout() {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // agar cookie jwt juga ikut dihapus
      });

      if (res.ok) {
        setUser(null);
        localStorage.removeItem("user");
        setProfileOpen(false);
        router.push("/login");
      } else {
        alert("Logout gagal. Coba lagi.");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat logout.");
      console.error(error);
    }
  }

  return (
    <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100 rounded-lg dark:hover:bg-gray-700" onClick={handleLogout}>
      Logout
    </button>
  );
}
