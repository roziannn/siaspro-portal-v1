"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Akun = {
  nama: string;
  email: string;
  type: string; // role
  isActive: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (akun: Akun) => void;
  akun: Akun | null;
  editMode: boolean;
};

export default function AkunModal({ open, onClose, onSave, akun, editMode }: Props) {
  const [form, setForm] = useState<Akun>({
    nama: "",
    email: "",
    type: "mahasiswa",
    isActive: true,
  });

  useEffect(() => {
    if (akun) {
      setForm(akun);
    } else {
      // Reset saat tambah
      setForm({
        nama: "",
        email: "",
        type: "mahasiswa",
        isActive: true,
      });
    }
  }, [akun]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit Akun" : "Tambah Akun"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input id="nama" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} required />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              disabled={editMode} // Email tidak bisa diubah saat edit
            />
          </div>

          <div>
            <Label htmlFor="type">Role</Label>
            <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrator">Administrator</SelectItem>
                <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                <SelectItem value="dosen">Dosen</SelectItem>
                <SelectItem value="dosen_wali">Dosen Wali</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="isActive" className="pb-2 block">
              Status
            </Label>
            <div className="flex items-center space-x-3">
              <Switch id="isActive" checked={form.isActive} onCheckedChange={(checked) => setForm({ ...form, isActive: checked })} className={`data-[state=checked]:bg-green-500`} />
              <span className={`text-sm font-medium ${form.isActive ? "text-green-600" : "text-gray-500"}`}>{form.isActive ? "Aktif" : "Tidak Aktif"}</span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">{editMode ? "Simpan" : "Tambah"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
