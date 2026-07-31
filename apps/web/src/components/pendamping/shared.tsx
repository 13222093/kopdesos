import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const SAPAAN_AWAL =
  "Selamat pagi Bu Sari 🙏 Ringkasan pagi ini:\n\n• Penjualan kemarin Rp4,6 jt (naik 9% dari rata-rata Jumat)\n• Saldo kas Rp128,4 jt\n• Angsuran BNI Rp43,1 jt jatuh tempo 7 hari lagi (25 Juli)\n• 3 barang laris hampir habis — beras premium, minyak 1 L, gas LPG\n\nAda yang mau ditanyakan? Saya bisa jelaskan angka mana pun dengan bahasa sederhana.";

export const pertanyaanCepat = [
  "Berapa untung minggu ini?",
  "Kas cukup untuk bayar cicilan?",
  "Apakah koperasi kita siap ekspor?",
  "Bagaimana pinjaman yang macet?",
];

export const pertanyaanCepatLengkap = [
  ...pertanyaanCepat,
  "Kapan beras premium habis?",
  "Dokumen apa untuk ekspor kopi ke Jepang?",
  "Layanan BNI apa yang cocok buat kita?",
  "Berapa komisi PPOB bulan ini?",
];

/** Jawaban scripted — fallback saat MOONSHOT_API_KEY belum diatur / API error */
export function jawabScripted(pertanyaan: string): string {
  const q = pertanyaan.toLowerCase();
  if (q.includes("untung") || q.includes("penjualan") || q.includes("omzet")) {
    return "Penjualan 7 hari terakhir totalnya sekitar Rp31,4 jt. Setelah dikurangi harga beli barang, untung kotornya kira-kira Rp3,4 jt (11%).\n\nYang paling laku: beras premium, minyak goreng, dan mie instan.";
  }
  if (q.includes("kas") || q.includes("cicilan") || q.includes("angsuran") || q.includes("bayar")) {
    return "Cukup, tapi harus hati-hati. Saldo kas sekarang Rp128,4 jt. Angsuran BNI tanggal 25 Juli besarnya Rp43,1 jt.\n\nSetelah bayar angsuran dan gaji, sisa kas kira-kira Rp71 jt. Saran saya: belanja stok bulan ini jangan lebih dari Rp40 jt.";
  }
  if (q.includes("stok") || q.includes("beli") || q.includes("barang") || q.includes("beras")) {
    return "Ada beberapa barang yang perlu segera dipesan: beras premium (sisa 12 sak, habis ±3 hari), minyak goreng 1 L (8 botol), gas LPG 3 kg (6 tabung), oralit (9 sachet), dan bawang merah (14 kg).\n\nPerkiraan biaya pesan semuanya sekitar Rp4,2 jt.";
  }
  if (q.includes("macet") || q.includes("pinjaman") || q.includes("piutang")) {
    return "Dari 12 pinjaman anggota, 1 macet (Pak Ketut Suardana, Rp4,95 jt, telat 38 hari) dan 2 perlu perhatian. Total piutang beredar Rp83,1 jt.\n\nSaran: kunjungi Pak Ketut langsung minggu ini, jangan hanya kirim pesan.";
  }
  if (q.includes("ekspor")) {
    return "Skor kesiapan ekspor kita 58 dari 100 (tahap persiapan). Yang paling kuat: legalitas (72). Yang paling lemah: sertifikasi (35).\n\nLangkah pertama yang saya sarankan: daftar program Desa Devisa LPEI dan aktifkan akses kepabeanan di OSS.";
  }
  return "Ini mode demo (AI belum tersambung). Saya baru bisa menjawab soal penjualan, kas & cicilan, stok, pinjaman anggota, dan kesiapan ekspor.\n\nSetelah AI tersambung, saya membaca seluruh data koperasi dan bisa menjawab pertanyaan apa pun.";
}

export type PesanLokal = { id: string; dari: "ai" | "saya"; teks: string };

/** Render markdown jawaban AI (bold, daftar, tabel) dengan gaya bubble */
export function IsiMarkdown({ teks }: { teks: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ node, ...props }) => <p className="mb-1.5 last:mb-0" {...props} />,
        strong: ({ node, ...props }) => (
          <strong className="font-semibold" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="mb-1.5 list-decimal pl-4 last:mb-0" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="mb-1.5 list-disc pl-4 last:mb-0" {...props} />
        ),
        li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-merah underline" target="_blank" rel="noreferrer" {...props} />
        ),
        code: ({ node, ...props }) => (
          <code className="rounded bg-line-soft px-1 font-mono text-[12px]" {...props} />
        ),
        table: ({ node, ...props }) => (
          <div className="mb-1.5 overflow-x-auto">
            <table className="w-full border-collapse text-[12px]" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th className="border-b border-line px-1.5 py-1 text-left font-semibold" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="border-b border-line-soft px-1.5 py-1 align-top" {...props} />
        ),
      }}
    >
      {teks}
    </Markdown>
  );
}
