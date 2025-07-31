"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconSend } from "@tabler/icons-react";

import SectionHeader from "@/components/font/headerSectionText"; // Ganti dengan path yang sesuai
import data from "../data.json";

type Pesan = {
  id: number;
  nama: string;
  isi: string;
  waktu: string;
  status: "belum dibaca" | "dibaca";
};

type ChatMessage = {
  from: "admin" | "saya";
  text: string;
  time: string;
};

export default function DetailPesanPage() {
  const params = useParams();
  const router = useRouter();
  const [reply, setReply] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const id = Number(params.id);
  const pesan = (data as Pesan[]).find((p) => p.id === id);

  if (!pesan) {
    return <p className="text-center py-10 text-muted-foreground">Pesan tidak ditemukan.</p>;
  }

  const handleSend = () => {
    if (reply.trim() === "") return;

    setChatHistory((prev) => [
      ...prev,
      {
        from: "saya",
        text: reply.trim(),
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setReply("");
  };

  return (
    <div className="px-1 lg:px-6 py-4 space-y-4">
      <SectionHeader title="Detail Pesan" />

      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarFallback>
                {pesan.nama
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold">{pesan.nama}</h2>
                <Badge className={pesan.status === "belum dibaca" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-600 border"}>{pesan.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{new Date(pesan.waktu).toLocaleString("id-ID")}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          {/* Isi pesan awal */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm max-w-md">{pesan.isi}</div>

          {/* Chat History */}
          <div className="max-h-72 overflow-y-auto space-y-3 pr-2">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "saya" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-lg px-4 py-2 text-sm max-w-xs break-words shadow ${msg.from === "saya" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                  <p>{msg.text}</p>
                  <p className="text-xs mt-1 text-right opacity-70">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Balasan */}
          <div className="mt-4 border-t pt-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input id="balasan" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Tulis balasan Anda..." className="flex-1 h-12 text-sm" />
              <Button onClick={handleSend} disabled={!reply.trim()} className="h-12 px-4 text-sm flex items-center justify-center">
                <IconSend className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
