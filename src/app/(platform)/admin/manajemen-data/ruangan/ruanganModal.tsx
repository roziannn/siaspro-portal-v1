"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export type Ruangan = {
  id: string;
  nama: string;
  kapasitas: string;
  lokasi: string;
  status: string;
  fasilitas: string;
};

type RuanganModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Ruangan) => void;
  initialData?: Ruangan | null;
};

export default function RuanganModal({ isOpen, onClose, onSave, initialData }: RuanganModalProps) {
  const [formData, setFormData] = useState<Ruangan>({
    id: "",
    nama: "",
    kapasitas: "",
    lokasi: "",
    status: "tersedia",
    fasilitas: "",
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: "",
        nama: "",
        kapasitas: "",
        lokasi: "",
        status: "tersedia",
        fasilitas: "",
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof Ruangan, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Ruangan" : "Tambah Ruangan"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="mb-3" htmlFor="nama">
              Nama Ruangan
            </Label>
            <Input id="nama" value={formData.nama} onChange={(e) => handleChange("nama", e.target.value)} placeholder="Nama Ruangan" required />
          </div>

          <div>
            <Label className="mb-3" htmlFor="kapasitas">
              Kapasitas
            </Label>
            <Input id="kapasitas" type="number" value={formData.kapasitas} onChange={(e) => handleChange("kapasitas", +e.target.value)} placeholder="Kapasitas" min={0} required />
          </div>

          <div>
            <Label className="mb-3" htmlFor="lokasi">
              Lokasi
            </Label>
            <Input id="lokasi" value={formData.lokasi} onChange={(e) => handleChange("lokasi", e.target.value)} placeholder="Lokasi" required />
          </div>

          <div>
            <Label className="mb-3" htmlFor="fasilitas">
              Fasilitas *(pisahkan dengan koma)
            </Label>
            <Input id="fasilitas" value={formData.fasilitas} onChange={(e) => handleChange("fasilitas", e.target.value)} placeholder="Contoh: Proyektor, AC, Papan Tulis" />
          </div>

          <div>
            <Label htmlFor="status" className="mb-3">
              Status
            </Label>
            <Switch id="status" checked={formData.status === "tersedia"} onCheckedChange={(checked) => handleChange("status", checked ? "tersedia" : "tidak tersedia")} />
            <span>{formData.status === "tersedia" ? "Tersedia" : "Tidak Tersedia"}</span>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">{initialData ? "Simpan" : "Tambah"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
