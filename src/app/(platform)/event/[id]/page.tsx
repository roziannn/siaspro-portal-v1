"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import dataEvent from "../data.json"; // sesuaikan pathnya
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ImageSertifikat from "@/components/img/sertifiakat_template.jpg";
import SectionHeader from "@/components/font/headerSectionText";

const placeholderImage = "https://via.placeholder.com/600x300?text=Foto+Event";

type EventItem = {
  id: string;
  nama: string;
  tanggal: string;
  jenis: string;
  lokasi: string;
  kuota: number;
  deskripsi: string;
  materi: string[];
  pesertaJoin: number;
  userJoined: boolean;
};

export default function DetailEventPage() {
  const { id } = useParams();
  const event = (dataEvent as EventItem[]).find((e) => e.id === id);
  const [showCertificate, setShowCertificate] = useState(false);

  if (!event) {
    return <div className="text-center py-10 text-muted-foreground">Event tidak ditemukan.</div>;
  }

  return (
    <div className="space-y-6 px-1 md:px-4 py-3">
      <SectionHeader title={event.nama} description="Informasi detail seputar event yang kamu pilih." />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Kiri: Info Event */}
        <Card className="flex-1">
          <CardHeader className="space-y-2">
            <Badge className="w-fit">{event.jenis}</Badge>
            <p className="text-sm text-muted-foreground">
              {new Date(event.tanggal).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              - {event.lokasi}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <img src={placeholderImage} alt="Foto Event" className="rounded-md w-full max-h-60 object-cover" />

            <section>
              <h2 className="text-lg font-semibold mb-2">Deskripsi Event</h2>
              <p className="text-gray-700 dark:text-gray-300">{event.deskripsi}</p>
              <p className="mt-3 font-medium">
                Total peserta yang sudah join: <span className="text-blue-600">{event.pesertaJoin}</span> dari {event.kuota}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Materi</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {event.materi.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          </CardContent>
        </Card>

        {/* Kanan: Sertifikat */}
        {event.userJoined && (
          <Card className="flex-1 max-w-md self-start">
            <CardHeader>
              <h2 className="text-lg font-semibold">Sertifikat</h2>
              <p>Selamat, kamu sudah mengikuti event ini!</p>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowCertificate((v) => !v)} className="w-full">
                {showCertificate ? "Sembunyikan Sertifikat" : "Tampilkan Sertifikat"}
              </Button>

              {showCertificate && (
                <div className="mt-6 p-4 border rounded bg-gray-50 dark:bg-gray-800">
                  <p className="text-center font-semibold text-sm mb-2">Sertifikat Partisipasi</p>
                  <Image src={ImageSertifikat} alt="Sertifikat" className="mx-auto" />
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
