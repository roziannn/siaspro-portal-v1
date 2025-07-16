"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { IconCircleCheck } from "@tabler/icons-react";

type Errors = {
  email?: string;
  password?: string;
};

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};
    if (!email.trim()) newErrors.email = "Email tidak boleh kosong.";
    if (!password.trim()) newErrors.password = "Password tidak boleh kosong.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      try {
        // get API login
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          if (data.field && data.message) {
            setErrors({ [data.field]: data.message });
          } else {
            // if gak ada info field, set error di email aja (atau bisa disesuaikan)
            setErrors({ email: data.message || "Login gagal." });
          }
          setIsLoading(false);
          return;
        }

        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
          router.push("/dashboard");
        }, 1500);
      } catch (err) {
        console.error("Login error:", err);
        setErrors({ email: "Terjadi kesalahan koneksi." });
      } finally {
        setIsLoading(false);
      }
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
                <Input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} aria-invalid={!!errors.email} aria-describedby="email-error" />
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} aria-invalid={!!errors.password} aria-describedby="password-error" />
                {errors.password && (
                  <p id="password-error" className="text-xs text-red-500">
                    {errors.password}
                  </p>
                )}
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-sm text-center">
          <DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <IconCircleCheck className="text-blue-500 w-16 h-16 animate-bounce" stroke={2} />
              <DialogTitle className="text-blue-600">Login Berhasil</DialogTitle>
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
