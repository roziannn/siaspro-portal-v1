"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type EventItem = {
  id: number;
  nama: string;
  tanggal: string;
  jenis: string;
  lokasi: string;
  kuota: number;
  status: string;
  totalJoin: number;
  createdById: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (event: EventItem) => void;
  event: EventItem | null;
  editMode: boolean;
};

export default function EventModal({ open, onClose, onSave, event, editMode }: Props) {
  const [form, setForm] = useState<EventItem | null>(event);

  useEffect(() => {
    setForm(event);
  }, [event]);

  if (!form) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit Event" : "Tambah Event"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="pb-2" htmlFor="nama">
              Nama
            </Label>
            <Input id="nama" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} required />
          </div>

          <div>
            <Label className="pb-2" htmlFor="tanggal">
              Tanggal
            </Label>
            <Input id="tanggal" type="datetime-local" value={new Date(form.tanggal).toISOString().slice(0, 16)} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} required />
          </div>

          <div>
            <Label className="pb-2" htmlFor="jenis">
              Jenis
            </Label>
            <Select value={form.jenis} onValueChange={(val) => setForm({ ...form, jenis: val })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih jenis event" />
              </SelectTrigger>
              <SelectContent>
                {["Workshop", "Bootcamp", "Kuliah Umum", "Lomba", "Seminar", "Kampus"].map((jenis) => (
                  <SelectItem key={jenis} value={jenis}>
                    {jenis}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="pb-2" htmlFor="lokasi">
              Lokasi
            </Label>
            <Input id="lokasi" value={form.lokasi} onChange={(e) => setForm({ ...form, lokasi: e.target.value })} required />
          </div>

          <div>
            <Label className="pb-2" htmlFor="kuota">
              Kuota
            </Label>
            <Input id="kuota" type="number" value={form.kuota} onChange={(e) => setForm({ ...form, kuota: +e.target.value })} required />
          </div>

          {editMode && (
            <div>
              <Label className="pb-2" htmlFor="status">
                Status
              </Label>
              <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

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
