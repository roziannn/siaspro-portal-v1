"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Mahasiswa = {
  id: number;
  nim: string;
  nama: string;
  angkatan: string;
  jurusan: string;
  fakultas: string; // tambahkan fakultas sebagai optional string
  email: string;
  isActive: boolean;
  fotoUrl?: string;
};

type CreateModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Mahasiswa) => void;
};

export default function CreateModal({ open, onClose, onSubmit }: CreateModalProps) {
  const [form, setForm] = useState<Mahasiswa>({
    id: 0,
    nim: "",
    nama: "",
    angkatan: "",
    jurusan: "",
    fakultas: "",
    email: "",
    isActive: true,
    fotoUrl: "",
  });

  // Reset form saat modal dibuka
  useEffect(() => {
    if (open) {
      setForm({
        id: 0,
        nim: "",
        nama: "",
        angkatan: "",
        jurusan: "",
        fakultas: "",
        email: "",
        isActive: true,
        fotoUrl: "",
      });
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Mahasiswa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nim" className="pb-2">
              NIM
            </Label>
            <Input id="nim" value={form.nim} onChange={(e) => setForm({ ...form, nim: e.target.value })} required />
          </div>

          <div>
            <Label htmlFor="nama" className="pb-2">
              Nama
            </Label>
            <Input id="nama" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} required />
          </div>

          <div>
            <Label htmlFor="angkatan" className="pb-2">
              Angkatan
            </Label>
            <Input id="angkatan" value={form.angkatan} onChange={(e) => setForm({ ...form, angkatan: e.target.value })} required />
          </div>

          <div>
            <Label htmlFor="jurusan" className="pb-2">
              Jurusan
            </Label>
            <Input id="jurusan" value={form.jurusan} onChange={(e) => setForm({ ...form, jurusan: e.target.value })} required />
          </div>

          <div>
            <Label htmlFor="fakultas" className="pb-2">
              Fakultas
            </Label>
            <Input id="fakultas" value={form.fakultas} onChange={(e) => setForm({ ...form, fakultas: e.target.value })} />
          </div>

          <div>
            <Label htmlFor="email" className="pb-2">
              Email
            </Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>

          <div>
            <Label htmlFor="isActive" className="pb-2">
              Status
            </Label>
            <Select value={form.isActive ? "true" : "false"} onValueChange={(val) => setForm({ ...form, isActive: val === "true" })}>
              <SelectTrigger className="w-full">
                <SelectValue>{form.isActive ? "Aktif" : "Tidak Aktif"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Aktif</SelectItem>
                <SelectItem value="false">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
