import { formatRupiah, formatRupiahSingkat } from "../lib/format";
import { dataStok, ringkasanHariIni } from "./data";

/**
 * Ringkasan pagi proaktif — disusun DETERMINISTIK dari data (bukan LLM),
 * supaya cron selalu cepat, murah, dan angkanya pasti benar.
 * Dikirim bot Telegram tiap pagi (vercel.json crons) atau manual via /api/digest.
 */
export function buatDigest(): string {
  const r = ringkasanHariIni();
  const kritis = dataStok({ filter: "menipis" })
    .sort((a, b) => a.prediksi.habisDalamHari - b.prediksi.habisDalamHari)
    .slice(0, 3);

  const barisStok = kritis
    .map((p) => `  – ${p.nama}: sisa ${p.stok} ${p.satuan}, habis ±${p.prediksi.habisDalamHari} hari`)
    .join("\n");

  const paling = kritis[0];
  const saran = paling
    ? `Saran hari ini: pesan ulang *${paling.nama}* (${paling.prediksi.saranPesanUlang} ${paling.satuan}, ±${formatRupiahSingkat(paling.prediksi.estimasiBiayaPesan)}) sebelum kehabisan.`
    : "Saran hari ini: stok aman — fokus ke penagihan piutang yang lewat jatuh tempo.";

  return [
    `🌅 *Ringkasan Pagi Koperasi Sukamaju*`,
    ``,
    `• Penjualan kemarin: *${formatRupiahSingkat(r.penjualanKemarin.total)}*`,
    `• Saldo kas: *${formatRupiahSingkat(r.saldoKas)}* (Giro BNI + kas gerai)`,
    `• Angsuran BNI berikutnya: *${formatRupiah(r.angsuranBankBerikut.jumlah)}* — jatuh tempo ${r.angsuranBankBerikut.jatuhTempo.slice(8, 10)} Juli`,
    `• Komisi PPOB bulan ini: *${formatRupiah(r.ppob.komisiBulanIni)}* (${r.ppob.jumlahTransaksiBulanIni} transaksi)`,
    kritis.length
      ? `• Stok kritis (${kritis.length}):\n${barisStok}`
      : `• Stok: semua di atas batas aman`,
    ``,
    saran,
    ``,
    `_Balas pesan ini untuk bertanya apa saja — saya membaca data koperasi langsung._`,
  ].join("\n");
}
