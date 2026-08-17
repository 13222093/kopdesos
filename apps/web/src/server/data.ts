/**
 * Data-access layer untuk Pendamping AI.
 * Saat ini membaca fixtures src/mocks/* — saat backend Postgres dibangun,
 * HANYA file ini yang diganti; tools & AI tidak berubah.
 */
import { daftarAnggota, totalSimpanan } from "../mocks/anggota";
import { entriKas, proyeksiKas, saldoKas } from "../mocks/kas";
import { HARI_INI, koperasi } from "../mocks/koperasi";
import {
  penjualan90Hari,
  penjualanHariIni,
  penjualanKemarin,
  totalHari,
} from "../mocks/penjualan";
import {
  labelKolektibilitas,
  pinjamanAnggota,
  pinjamanHimbara,
  ringkasanSimpanPinjam,
  type Kolektibilitas,
} from "../mocks/pinjaman";
import {
  daftarProduk,
  hampirKedaluwarsa,
  prediksiStok,
  stokMenipis,
} from "../mocks/produk";
import { ringkasanPpob } from "../mocks/ppob";
import { daftarInsight } from "../mocks/insight";

export { HARI_INI, koperasi };

export function ringkasanHariIni() {
  return {
    tanggal: HARI_INI,
    penjualanHariIni: { ...penjualanHariIni, total: totalHari(penjualanHariIni) },
    penjualanKemarin: { ...penjualanKemarin, total: totalHari(penjualanKemarin) },
    saldoKas,
    angsuranBankBerikut: {
      bank: pinjamanHimbara.bank,
      jumlah: pinjamanHimbara.angsuranBulanan,
      jatuhTempo: pinjamanHimbara.jatuhTempoBerikut,
    },
    piutangAnggotaBeredar: ringkasanSimpanPinjam.totalPinjamanBeredar,
    jumlahStokMenipis: daftarProduk.filter(stokMenipis).length,
    ppob: {
      komisiBulanIni: ringkasanPpob.komisiBulanIni,
      jumlahTransaksiBulanIni: ringkasanPpob.jumlahTransaksiBulanIni,
    },
    insightPeringatan: daftarInsight
      .filter((i) => i.tipe === "peringatan")
      .map((i) => i.judul),
  };
}

export function dataPenjualan(hari: 7 | 30 | 90) {
  const irisan = penjualan90Hari.slice(-hari);
  const total = irisan.reduce(
    (acc, p) => ({
      sembako: acc.sembako + p.sembako,
      apotek: acc.apotek + p.apotek,
      coldStorage: acc.coldStorage + p.gudang,
    }),
    { sembako: 0, apotek: 0, coldStorage: 0 },
  );
  const totalSemua = total.sembako + total.apotek + total.coldStorage;
  return {
    periodeHari: hari,
    total,
    totalSemua,
    rataRataPerHari: Math.round(totalSemua / hari),
    estimasiMarginKotorPersen: 11,
    // seri harian hanya untuk periode pendek agar ringkas
    seriHarian:
      hari <= 30
        ? irisan.map((p) => ({ tanggal: p.tanggal, total: totalHari(p) }))
        : undefined,
  };
}

export function dataStok(opsi: {
  filter: "semua" | "menipis" | "kedaluwarsa";
  gerai?: "sembako" | "apotek" | "gudang";
}) {
  let hasil = daftarProduk;
  if (opsi.gerai) hasil = hasil.filter((p) => p.gerai === opsi.gerai);
  if (opsi.filter === "menipis") hasil = hasil.filter(stokMenipis);
  if (opsi.filter === "kedaluwarsa") hasil = hasil.filter((p) => hampirKedaluwarsa(p));
  return hasil.map((p) => {
    const pred = prediksiStok(p);
    return {
      id: p.id,
      nama: p.nama,
      gerai: p.gerai,
      stok: p.stok,
      satuan: p.satuan,
      stokMinimum: p.stokMinimum,
      hargaBeli: p.hargaBeli,
      hargaJual: p.hargaJual,
      menipis: stokMenipis(p),
      batch: p.batch,
      kedaluwarsa: p.kedaluwarsa,
      hampirKedaluwarsa: hampirKedaluwarsa(p),
      prediksi: {
        rataTerjualPerHari: pred.lajuHarian,
        habisDalamHari: pred.habisDalamHari,
        saranPesanUlang: pred.saranPesan,
        estimasiBiayaPesan: pred.estimasiBiayaPesan,
      },
    };
  });
}

export function dataPinjamanAnggota(kolektibilitas?: Kolektibilitas) {
  const hasil = kolektibilitas
    ? pinjamanAnggota.filter((p) => p.kolektibilitas === kolektibilitas)
    : pinjamanAnggota;
  return {
    ringkasan: {
      totalPinjamanBeredar: ringkasanSimpanPinjam.totalPinjamanBeredar,
      totalSimpananAnggota: ringkasanSimpanPinjam.totalSimpananAnggota,
      jumlahMacet: ringkasanSimpanPinjam.pinjamanMacet,
      jumlahPerluPerhatian: ringkasanSimpanPinjam.pinjamanPerhatian,
    },
    pinjaman: hasil.map((p) => ({
      id: p.id,
      nama: p.namaAnggota,
      tujuan: p.tujuan,
      pokok: p.pokok,
      sisa: p.sisa,
      angsuranBulanan: p.angsuranBulanan,
      angsuranKe: `${p.angsuranKe}/${p.tenorBulan}`,
      jatuhTempoBerikut: p.jatuhTempoBerikut,
      kolektibilitas: labelKolektibilitas[p.kolektibilitas],
    })),
  };
}

export function dataPinjamanHimbara() {
  return pinjamanHimbara;
}

export function dataKas() {
  return {
    saldoKas,
    proyeksi4Bulan: proyeksiKas.map((p) => ({
      bulan: p.bulan,
      perkiraanKasMasuk: p.kasMasuk,
      perkiraanKasKeluarOperasional: p.kasKeluar,
      sisaKasOperasional: p.kasMasuk - p.kasKeluar,
      angsuranBankBni: p.angsuran,
    })),
    bukuKasTerakhir: entriKas.slice(0, 12),
  };
}

export function cariAnggota(kataKunci: string) {
  const q = kataKunci.toLowerCase();
  const cocok = daftarAnggota
    .filter(
      (a) =>
        a.nama.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.dusun.toLowerCase().includes(q),
    )
    .slice(0, 5);
  return cocok.map((a) => ({
    id: a.id,
    nama: a.nama,
    telepon: a.telepon,
    dusun: a.dusun,
    pekerjaan: a.pekerjaan,
    status: a.status,
    simpanan: { ...a.simpanan, total: totalSimpanan(a) },
    belanja90Hari: a.belanja90Hari,
    pinjamanAktif: pinjamanAnggota
      .filter((p) => p.anggotaId === a.id)
      .map((p) => ({
        id: p.id,
        tujuan: p.tujuan,
        sisa: p.sisa,
        angsuranBulanan: p.angsuranBulanan,
        jatuhTempoBerikut: p.jatuhTempoBerikut,
        kolektibilitas: labelKolektibilitas[p.kolektibilitas],
      })),
  }));
}

// ── Layanan BNI ──────────────────────────────────────────────────

import { layananBni } from "../mocks/bni";

export function dataLayananBni() {
  return {
    layanan: layananBni,
    catatan:
      "Data kurasi mockup Spark Arc 2026 — status menunjukkan kondisi di platform, bukan klaim kemitraan resmi. Jangan mengarang produk/tarif bank di luar daftar ini.",
  };
}

// ── Ekspor ───────────────────────────────────────────────────────

import {
  checklistKombinasi,
  DISCLAIMER_EKSPOR,
  dokumenPerPengiriman,
  kesiapanEkspor,
  legalitasDasar,
  peluangEkspor,
  programPendampingan,
} from "../mocks/ekspor";
import {
  DISCLAIMER_PASAR,
  implikasiKurs,
  kabarPasar,
  kursValas,
  trenKopiDunia,
} from "../mocks/pasar";

export function dataKesiapanEkspor() {
  return {
    ...kesiapanEkspor,
    programPendampingan,
    disclaimer: DISCLAIMER_EKSPOR,
  };
}

export function dataPeluangEkspor() {
  return {
    peluang: peluangEkspor,
    pasar: {
      kurs: kursValas,
      implikasiKurs,
      trenKopiDunia,
      kabarPasar,
      catatan: DISCLAIMER_PASAR,
    },
    disclaimer: DISCLAIMER_EKSPOR,
  };
}

export function dataDokumenEkspor(komoditas?: string, negara?: string) {
  const cocok = checklistKombinasi.filter((k) => {
    const kCocok = komoditas
      ? k.komoditas.toLowerCase().includes(komoditas.toLowerCase())
      : true;
    const nCocok = negara
      ? k.negara.toLowerCase().includes(negara.toLowerCase())
      : true;
    return kCocok && nCocok;
  });
  return {
    legalitasDasar,
    dokumenPerPengiriman,
    kombinasiTerkurasi: checklistKombinasi.map((k) => `${k.komoditas} → ${k.negara}`),
    hasil: cocok,
    catatanPenting:
      cocok.length === 0
        ? "Kombinasi produk/negara ini BELUM ada di data kurasi. Jangan mengarang persyaratan — arahkan pengguna ke InaExport atau Dinas Perdagangan."
        : undefined,
    disclaimer: DISCLAIMER_EKSPOR,
  };
}

/** angka laporan mock — sama dengan halaman /keuangan */
export function dataLaporan(jenis: "neraca" | "phu" | "arus_kas") {
  const laporan = {
    neraca: {
      judul: "Laporan Posisi Keuangan (Neraca) per 30 Juni 2026",
      baris: {
        kasDanSetaraKas: 128_400_000,
        piutangPinjamanAnggota: 83_120_000,
        persediaanBarang: 64_750_000,
        asetTetap: 2_410_000_000,
        totalAset: 2_686_270_000,
        utangBankBni: 2_547_000_000,
        simpananAnggota: 48_350_000,
        ekuitas: 90_920_000,
      },
    },
    phu: {
      judul: "Perhitungan Hasil Usaha (PHU) Juni 2026",
      baris: {
        pendapatanPenjualan: 121_400_000,
        pendapatanJasaSimpanPinjam: 4_820_000,
        pendapatanSewaColdStorage: 3_150_000,
        hargaPokokPenjualan: -103_800_000,
        bebanOperasional: -13_950_000,
        bebanBungaBank: -12_735_000,
        shuBulanIni: -1_115_000,
      },
    },
    arus_kas: {
      judul: "Laporan Arus Kas Juni 2026",
      baris: {
        kasDariOperasi: 15_420_000,
        kasUntukInvestasi: -2_150_000,
        kasUntukAngsuranBank: -43_100_000,
        kasDariSimpananAnggota: 6_930_000,
        perubahanKasBersih: -22_900_000,
        saldoAwal: 151_300_000,
        saldoAkhir: 128_400_000,
      },
    },
  } as const;
  return laporan[jenis];
}
