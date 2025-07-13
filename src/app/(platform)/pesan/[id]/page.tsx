"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

    setChatHistory((prev) => [...prev, { from: "saya", text: reply.trim(), time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) }]);
    setReply("");
  };

  return (
    <div className="px-1 lg:px-6">
      <Card>
        <CardHeader>
          <h1 className="text-lg font-semibold">Detail Pesan</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pengirim */}
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarFallback>
                {" "}
                {pesan.nama
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-medium">{pesan.nama}</h2>
                <Badge className={pesan.status === "belum dibaca" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-600 border"}>{pesan.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{new Date(pesan.waktu).toLocaleString("id-ID")}</p>
              <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm max-w-md">{pesan.isi}</div>
            </div>
          </div>

          {/* Chat History */}
          <div className="space-y-3 pt-4">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "saya" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-xl px-4 py-2 text-sm max-w-xs ${msg.from === "saya" ? "bg-blue-100 text-blue-800" : "bg-gray-200 text-gray-800"}`}>
                  <p>{msg.text}</p>
                  <p className="text-xs mt-1 text-right text-muted-foreground">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Balasan */}
          <div className="mt-6 space-y-4">
            <label htmlFor="balasan" className="text-sm font-medium block">
              Balas Pesan
            </label>
            <Input id="balasan" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Tulis balasan Anda..." className="w-full" />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => router.push("/pesan")}>
                Kembali
              </Button>
              <Button onClick={handleSend} disabled={!reply.trim()}>
                Kirim Balasan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
