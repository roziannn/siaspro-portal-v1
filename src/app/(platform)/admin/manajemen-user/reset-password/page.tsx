// "use client";

// import { useState, FormEvent } from "react";
// import dataAkun from "../data-akun/data.json";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast, Toaster } from "react-hot-toast";
// import { IconKey } from "@tabler/icons-react";
// import SectionHeader from "@/components/font/headerSectionText";
// import PwUnclockimg from "@/../public/img/pwunclock.png";
// import Image from "next/image";

// type Akun = {
//   nama: string;
//   email: string;
//   isActive: boolean;
// };

// export default function ResetPasswordPage() {
//   const [search, setSearch] = useState("");
//   const [selectedUser, setSelectedUser] = useState<Akun | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const filteredUsers = dataAkun.filter((user) => user.nama.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));

//   const handleSelectUser = (user: Akun) => {
//     setSelectedUser(user);
//     setSearch(`${user.nama} (${user.email})`);
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (!selectedUser) {
//       toast.error("Pilih user terlebih dahulu");
//       return;
//     }
//     setIsSubmitting(true);
//     setTimeout(() => {
//       toast.success(`Password untuk ${selectedUser.nama} berhasil direset!`);
//       setSelectedUser(null);
//       setSearch("");
//       setIsSubmitting(false);
//     }, 1500);
//   };

//   return (
//     <div className="space-y-3 px-1 md:px-4">
//       <SectionHeader className="mb-8" title="Reset Password Akun" description="Reset password untuk akun user dengan email." />
//       <div className="flex flex-col lg:flex-row items-center gap-5">
//         {/* Gambar di kiri */}
//         <Image src={PwUnclockimg} alt="Password Unclock" width={600} height={00} className="mx-auto lg:mx-0" />

//         {/* Form di kanan */}
//         <Card className="w-full max-w-xl">
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <label htmlFor="userSearch" className="block font-medium mb-4">
//                 Cari nama atau email pengguna
//               </label>
//               <Input
//                 id="userSearch"
//                 type="text"
//                 placeholder="Ketik nama atau email..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setSelectedUser(null);
//                 }}
//                 autoComplete="off"
//               />

//               {search && filteredUsers.length > 0 && (
//                 <ul className="border rounded max-h-40 overflow-auto mt-1 bg-white shadow-sm">
//                   {filteredUsers.slice(0, 5).map((user, idx) => (
//                     <li key={idx} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectUser(user)}>
//                       {user.nama} ({user.email})
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               {search && filteredUsers.length === 0 && <p className="text-sm text-muted-foreground mt-1">Tidak ada user ditemukan.</p>}

//               <div className="flex justify-end mt-4">
//                 <Button type="submit" disabled={isSubmitting} className="flex items-center justify-start gap-2 w-50">
//                   <IconKey className="w-5 h-5" />
//                   {isSubmitting ? "Sedang reset..." : "Reset Password Akun"}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
