"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export type JadwalKuliah = {
  id: number;
  mataKuliah: string;
  dosen: string;
  ruangan: string;
  hari: string;
  jamMulai: string;
  jamSelesai: string;
  aktif: boolean;
  createdById: number;
  updatedById: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (jadwal: JadwalKuliah) => void;
  jadwal: JadwalKuliah | null;
  editMode: boolean;
};

export default function JadwalModal({ open, onClose, onSave, jadwal, editMode }: Props) {
  const [form, setForm] = useState<JadwalKuliah | null>(jadwal);

  useEffect(() => {
    setForm(jadwal);
  }, [jadwal]);

  if (!form) return null;

  const handleChange = (field: keyof JadwalKuliah, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit Jadwal Kuliah" : "Tambah Jadwal Kuliah"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="mataKuliah">Mata Kuliah</Label>
            <Input id="mataKuliah" value={form.mataKuliah} onChange={(e) => handleChange("mataKuliah", e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="dosen">Dosen</Label>
            <Input id="dosen" value={form.dosen} onChange={(e) => handleChange("dosen", e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="ruangan">Ruangan</Label>
            <Input id="ruangan" value={form.ruangan} onChange={(e) => handleChange("ruangan", e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="hari">Hari</Label>
            <Select value={form.hari} onValueChange={(value) => handleChange("hari", value)}>
              <SelectTrigger id="hari" className="w-full">
                <SelectValue placeholder="Pilih Hari" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Senin">Senin</SelectItem>
                <SelectItem value="Selasa">Selasa</SelectItem>
                <SelectItem value="Rabu">Rabu</SelectItem>
                <SelectItem value="Kamis">Kamis</SelectItem>
                <SelectItem value="Jumat">Jumat</SelectItem>
                <SelectItem value="Sabtu">Sabtu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="jamMulai">Jam Mulai</Label>
            <Input id="jamMulai" type="time" value={form.jamMulai} onChange={(e) => handleChange("jamMulai", e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="jamSelesai">Jam Selesai</Label>
            <Input id="jamSelesai" type="time" value={form.jamSelesai} onChange={(e) => handleChange("jamSelesai", e.target.value)} required />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="aktif" checked={form.aktif} onCheckedChange={(val) => handleChange("aktif", val)} />
            <label htmlFor="aktif" className="select-none text-sm">
              Status Aktif
            </label>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
