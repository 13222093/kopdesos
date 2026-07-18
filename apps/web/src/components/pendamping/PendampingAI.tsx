import { Send, Sparkles, X } from "lucide-react";
import * as React from "react";

import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

type PesanChat = { id: number; dari: "ai" | "saya"; teks: string };

const sapaanAwal: PesanChat[] = [
  {
    id: 1,
    dari: "ai",
    teks: "Selamat pagi Bu Sari 🙏 Ringkasan pagi ini:\n\n• Penjualan kemarin Rp4,6 jt (naik 9% dari rata-rata Jumat)\n• Saldo kas Rp128,4 jt\n• Angsuran BRI Rp43,1 jt jatuh tempo 7 hari lagi (25 Juli)\n• 3 barang laris hampir habis — beras premium, minyak 1 L, gas LPG\n\nAda yang mau ditanyakan? Saya bisa jelaskan angka mana pun dengan bahasa sederhana.",
  },
];

const pertanyaanCepat = [
  "Berapa untung minggu ini?",
  "Kas cukup untuk bayar cicilan?",
  "Stok apa yang harus dibeli?",
  "Bagaimana pinjaman yang macet?",
];

function jawab(pertanyaan: string): string {
  const q = pertanyaan.toLowerCase();
  if (q.includes("untung") || q.includes("penjualan") || q.includes("omzet")) {
    return "Penjualan 7 hari terakhir totalnya sekitar Rp31,4 jt. Setelah dikurangi harga beli barang, untung kotornya kira-kira Rp3,4 jt (11%).\n\nYang paling laku: beras premium, minyak goreng, dan mie instan. Kalau mau untung lebih besar, stok cabai di cold storage bisa dijual minggu ini selagi harga pasar tinggi (Rp45.000/kg).";
  }
  if (q.includes("kas") || q.includes("cicilan") || q.includes("angsuran") || q.includes("bayar")) {
    return "Cukup, tapi harus hati-hati. Saldo kas sekarang Rp128,4 jt. Angsuran BRI tanggal 25 Juli besarnya Rp43,1 jt.\n\nSetelah bayar angsuran dan gaji, sisa kas kira-kira Rp71 jt. Saran saya: belanja stok bulan ini jangan lebih dari Rp40 jt, dan tunda pembelian yang tidak mendesak sampai tanggal 26.";
  }
  if (q.includes("stok") || q.includes("beli") || q.includes("barang")) {
    return "Ada 5 barang yang perlu segera dipesan:\n\n1. Beras premium — sisa 12 sak (min. 20). Akhir pekan biasanya laku 8 sak/hari\n2. Minyak goreng 1 L — sisa 8 botol\n3. Gas LPG 3 kg — sisa 6 tabung\n4. Oralit — sisa 9 sachet\n5. Bawang merah — sisa 14 kg\n\nPerkiraan biaya pesan semuanya: sekitar Rp4,2 jt. Mau saya buatkan daftar pesanan ke distributor?";
  }
  if (q.includes("macet") || q.includes("pinjaman") || q.includes("nunggak") || q.includes("piutang")) {
    return "Dari 12 pinjaman anggota, 1 macet dan 2 perlu perhatian:\n\n• Pak Ketut Suardana — Rp4,95 jt, telat 38 hari. Saran: kunjungi langsung minggu ini, jangan hanya kirim pesan\n• Bu Kadek Dwi Anjani — telat 3 hari, biasanya bayar kok, kirim pengingat WA yang ramah\n• Pak Made Suarta — baru mulai mengangsur, telat 6 hari\n\nSisanya lancar semua. Total piutang beredar Rp83,1 jt.";
  }
  if (q.includes("rat") || q.includes("laporan") || q.includes("rapat")) {
    return "RAT tahun buku 2026 paling lambat digelar sebelum akhir Maret 2027. Yang perlu disiapkan: LPJ pengurus, laporan keuangan SAK-EP (5 laporan), dan daftar hadir anggota.\n\nTenang, semua angkanya sudah tercatat otomatis di sistem. Menjelang tutup buku, saya bisa susun draf LPJ dan laporannya — pengurus tinggal periksa dan tanda tangan.";
  }
  return "Terima kasih pertanyaannya 🙏 Di versi demo ini saya baru bisa menjawab soal penjualan, kas & cicilan, stok, pinjaman anggota, dan persiapan RAT.\n\nDi versi lengkap, saya membaca seluruh data koperasi dan bisa menjawab pertanyaan apa pun — plus mengirim ringkasan tiap pagi ke WhatsApp pengurus.";
}

export function PendampingAI() {
  const [buka, setBuka] = React.useState(false);
  const [pesan, setPesan] = React.useState<PesanChat[]>(sapaanAwal);
  const [teks, setTeks] = React.useState("");
  const [mengetik, setMengetik] = React.useState(false);
  const ujungRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    ujungRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [pesan, mengetik, buka]);

  function kirim(isi: string) {
    const bersih = isi.trim();
    if (!bersih || mengetik) return;
    setTeks("");
    setPesan((p) => [...p, { id: p.length + 1, dari: "saya", teks: bersih }]);
    setMengetik(true);
    window.setTimeout(() => {
      setPesan((p) => [...p, { id: p.length + 1, dari: "ai", teks: jawab(bersih) }]);
      setMengetik(false);
    }, 900);
  }

  return (
    <>
      {/* Tombol mengambang */}
      <button
        type="button"
        onClick={() => setBuka((b) => !b)}
        className={cn(
          "fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-merah px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] hover:bg-merah-dark",
          buka && "scale-0",
        )}
      >
        <Sparkles className="size-4" />
        Pendamping
        <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-hijau" />
      </button>

      {/* Panel chat */}
      <div
        className={cn(
          "fixed right-5 bottom-5 z-50 flex h-[540px] max-h-[calc(100dvh-6rem)] w-[380px] max-w-[calc(100vw-2.5rem)] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl transition-all",
          buka
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0",
        )}
      >
        <div className="flex items-center gap-2.5 border-b border-line bg-merah px-4 py-3 text-white">
          <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
            <Sparkles className="size-4" />
          </span>
          <div className="flex-1">
            <p className="font-display text-sm font-semibold">Pendamping AI</p>
            <p className="text-[11px] text-white/80">
              Selalu siaga · memantau semua gerai
            </p>
          </div>
          <button
            type="button"
            onClick={() => setBuka(false)}
            className="rounded-md p-1 hover:bg-white/15"
          >
            <X className="size-4" />
            <span className="sr-only">Tutup</span>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto bg-paper p-3.5">
          {pesan.map((p) => (
            <div
              key={p.id}
              className={cn(
                "max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-relaxed whitespace-pre-line shadow-sm",
                p.dari === "ai"
                  ? "self-start rounded-tl-sm border border-line bg-card"
                  : "self-end rounded-tr-sm bg-merah text-white",
              )}
            >
              {p.teks}
            </div>
          ))}
          {mengetik ? (
            <div className="flex items-center gap-1.5 self-start rounded-xl border border-line bg-card px-3 py-2 text-xs text-muted">
              <Sparkles className="size-3 animate-pulse" /> sedang mengetik…
            </div>
          ) : null}
          <div ref={ujungRef} />
        </div>

        <div className="border-t border-line bg-card p-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {pertanyaanCepat.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => kirim(q)}
                className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-merah/40 hover:bg-merah-soft hover:text-merah"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              kirim(teks);
            }}
          >
            <input
              className="h-9 flex-1 rounded-lg border border-line bg-paper px-3 text-sm placeholder:text-muted/70"
              placeholder="Tanya apa saja soal koperasi…"
              value={teks}
              onChange={(e) => setTeks(e.target.value)}
            />
            <button
              type="submit"
              className="flex size-9 items-center justify-center rounded-lg bg-merah text-white hover:bg-merah-dark disabled:opacity-50"
              disabled={!teks.trim() || mengetik}
            >
              <Send className="size-4" />
              <span className="sr-only">Kirim</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
