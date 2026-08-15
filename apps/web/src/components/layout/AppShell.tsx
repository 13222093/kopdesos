import { Link, useNavigate, type LinkProps } from "@tanstack/react-router";
import {
  Bell,
  BookOpenText,
  Boxes,
  FileCheck2,
  Globe2,
  HandCoins,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Rocket,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import * as React from "react";

import { LogoBni } from "~/components/bni/LogoBni";
import { PendampingAI } from "~/components/pendamping/PendampingAI";
import { Avatar } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { formatTanggal } from "~/lib/format";
import { daftarAnggota } from "~/mocks/anggota";
import { HARI_INI, koperasi } from "~/mocks/koperasi";
import { cn } from "~/lib/utils";

function Emblem({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 flex-col overflow-hidden rounded-lg border border-line shadow-sm",
        className,
      )}
      aria-hidden
    >
      <span className="h-1/2 bg-merah" />
      <span className="h-1/2 bg-card" />
    </span>
  );
}

type Peran = "manajer" | "kasir" | "anggota";

const infoPeran: Record<Peran, { nama: string; label: string }> = {
  manajer: { nama: koperasi.manajer, label: "Manajer KDMP" },
  kasir: { nama: koperasi.kasir, label: "Kasir" },
  anggota: { nama: daftarAnggota[0].nama, label: "Anggota" },
};

type NavItem = {
  to: LinkProps["to"];
  params?: LinkProps["params"];
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navUtama: NavItem[] = [
  { to: "/", label: "Beranda", icon: LayoutDashboard },
];

const navPendamping: NavItem[] = [
  { to: "/pendamping", label: "Chat Pendamping", icon: Sparkles },
  { to: "/inbox", label: "Inbox WhatsApp", icon: MessageCircle },
];

const navOperasi: NavItem[] = [
  { to: "/pos", label: "Kasir", icon: ShoppingCart },
  { to: "/inventori", label: "Inventori & Pengadaan", icon: Boxes },
  { to: "/produk-digital", label: "Produk Digital", icon: Smartphone },
];

const navKeuangan: NavItem[] = [
  { to: "/keuangan", label: "Keuangan & Laporan", icon: BookOpenText },
  { to: "/simpan-pinjam", label: "Simpan Pinjam", icon: HandCoins },
  { to: "/anggota", label: "Keanggotaan", icon: Users },
];

const navEkspor: NavItem[] = [
  { to: "/ekspor", label: "Kesiapan", icon: Rocket },
  { to: "/ekspor/peluang", label: "Peluang Pasar", icon: Globe2 },
  { to: "/ekspor/dokumen", label: "Dokumen & Regulasi", icon: FileCheck2 },
];

const navAnggota: NavItem[] = [
  {
    to: "/anggota/$anggotaId",
    params: { anggotaId: daftarAnggota[0].id },
    label: "Profil Saya",
    icon: User,
  },
  { to: "/pendamping", label: "Chat Pendamping", icon: Sparkles },
];

function NavLink({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      params={item.params}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-line-soft hover:text-ink"
      activeOptions={{ exact: item.to === "/" || item.to === "/ekspor" }}
      activeProps={{
        className: "bg-merah-soft text-merah font-medium hover:bg-merah-soft hover:text-merah",
      }}
    >
      <Icon className="size-4 shrink-0" />
      {item.label}
    </Link>
  );
}

function NavGroup({ label, items }: { label?: string; items: NavItem[] }) {
  return (
    <div className="flex flex-col gap-0.5">
      {label ? (
        <p className="px-3 pt-4 pb-1 text-[10px] font-semibold tracking-[0.14em] text-muted/70 uppercase">
          {label}
        </p>
      ) : null}
      {items.map((item) => (
        <NavLink key={`${item.to as string}-${item.label}`} item={item} />
      ))}
    </div>
  );
}

function SidebarContent({ peran }: { peran: Peran }) {
  const identitas = infoPeran[peran];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-line px-4 py-4">
        <Emblem />
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold leading-tight">
            {koperasi.namaPendek}
          </p>
          <p className="text-[11px] text-muted">
            <span className="font-semibold">Kop</span>Pilot
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {peran === "anggota" ? (
          <NavGroup items={navAnggota} />
        ) : (
          <>
            <NavGroup items={navUtama} />
            <NavGroup label="Pendamping AI" items={navPendamping} />
            <NavGroup label="Copilot Operasi" items={navOperasi} />
            {peran === "manajer" ? (
              <>
                <NavGroup label="Copilot Keuangan" items={navKeuangan} />
                <NavGroup label="Copilot Ekspor" items={navEkspor} />
              </>
            ) : null}
          </>
        )}
      </nav>

      <div className="border-t border-line px-4 py-2.5">
        <div className="flex items-center gap-1.5 pb-2 text-[10px] whitespace-nowrap text-muted/70">
          Perbankan oleh <LogoBni className="h-3" /> · Spark Arc 2026
        </div>
        <div className="flex items-center gap-2.5 border-t border-line-soft pt-2.5">
          <Avatar nama={identitas.nama} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{identitas.nama}</p>
            <p className="text-[11px] text-muted">{identitas.label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [peran, setPeran] = React.useState<Peran>("manajer");
  const identitas = infoPeran[peran];

  function gantiPeran(baru: Peran) {
    setPeran(baru);
    if (baru === "manajer") {
      navigate({ to: "/" });
    } else if (baru === "kasir") {
      navigate({ to: "/pos" });
    } else {
      navigate({
        to: "/anggota/$anggotaId",
        params: { anggotaId: daftarAnggota[0].id },
      });
    }
  }

  return (
    <div className="flex min-h-dvh">
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 border-r border-line bg-card lg:block">
        <SidebarContent peran={peran} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-line bg-paper/90 px-4 backdrop-blur">
          <Sheet>
            <SheetTrigger className="rounded-lg p-2 text-muted hover:bg-line-soft lg:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Buka menu</span>
            </SheetTrigger>
            <SheetContent className="left-0 right-auto w-72 max-w-[80vw] border-r border-l-0 p-0">
              <SidebarContent peran={peran} />
            </SheetContent>
          </Sheet>

          <div className="relative hidden max-w-sm flex-1 md:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted/70" />
            <Input
              className="pl-9"
              placeholder="Cari anggota, produk, transaksi…"
              readOnly
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <p className="hidden text-xs text-muted sm:block">
              {formatTanggal(HARI_INI)}
            </p>
            <select
              value={peran}
              onChange={(e) => gantiPeran(e.target.value as Peran)}
              className="h-9 rounded-lg border border-line bg-card px-2.5 text-xs font-medium text-ink"
              aria-label="Pilih peran"
            >
              <option value="manajer">Manajer Koperasi</option>
              <option value="kasir">Kasir</option>
              <option value="anggota">Anggota</option>
            </select>
            <button
              type="button"
              className="relative rounded-lg p-2 text-muted hover:bg-line-soft"
            >
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-merah" />
              <span className="sr-only">Notifikasi</span>
            </button>
            <Avatar nama={identitas.nama} />
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>
      </div>

      <PendampingAI />
    </div>
  );
}
