"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { IconCircleCheck } from "@tabler/icons-react";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = "Email tidak boleh kosong.";
    if (!password.trim()) newErrors.password = "Password tidak boleh kosong.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setIsModalOpen(true);

        setTimeout(() => {
          setIsModalOpen(false);
          router.push("/dashboard");
        }, 1500);
      }, 1200);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="mb-2">Selamat Datang Kembali!</CardTitle>
          <CardDescription>Masukkan informasi untuk akses akun</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                  {isLoading ? "Memproses..." : "Masuk"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Modal Sukses */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-sm text-center">
          <DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <IconCircleCheck className="text-green-600 w-12 h-12 animate-bounce" stroke={2} />
              <DialogTitle className="text-green-700">Login Berhasil</DialogTitle>
              <DialogDescription>
                Selamat datang, <strong>{email}</strong>
              </DialogDescription>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
