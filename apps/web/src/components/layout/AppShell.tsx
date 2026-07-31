import { Link, type LinkProps } from "@tanstack/react-router";
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
  Settings,
  ShoppingCart,
  Smartphone,
  Users,
} from "lucide-react";
import * as React from "react";

import { LogoBni } from "~/components/bni/LogoBni";
import { PendampingAI } from "~/components/pendamping/PendampingAI";
import { Avatar } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { formatTanggal } from "~/lib/format";
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

type NavItem = {
  to: LinkProps["to"];
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navUtama: NavItem[] = [
  { to: "/", label: "Beranda", icon: LayoutDashboard },
];

const navCrm: NavItem[] = [
  { to: "/anggota", label: "Keanggotaan", icon: Users },
  { to: "/inbox", label: "Inbox WhatsApp", icon: MessageCircle },
];

const navErp: NavItem[] = [
  { to: "/pos", label: "Kasir", icon: ShoppingCart },
  { to: "/produk-digital", label: "Produk Digital", icon: Smartphone },
  { to: "/inventori", label: "Inventori", icon: Boxes },
  { to: "/simpan-pinjam", label: "Simpan Pinjam", icon: HandCoins },
  { to: "/keuangan", label: "Keuangan", icon: BookOpenText },
];

const navEkspor: NavItem[] = [
  { to: "/ekspor", label: "Kesiapan Ekspor", icon: Rocket },
  { to: "/ekspor/peluang", label: "Peluang Pasar", icon: Globe2 },
  { to: "/ekspor/dokumen", label: "Dokumen & Regulasi", icon: FileCheck2 },
];

function NavLink({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
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
        <NavLink key={item.to as string} item={item} />
      ))}
    </div>
  );
}

function SidebarContent() {
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
        <NavGroup items={navUtama} />
        <NavGroup label="CRM" items={navCrm} />
        <NavGroup label="ERP" items={navErp} />
        <NavGroup label="Ekspor" items={navEkspor} />
        <p className="px-3 pt-4 pb-1 text-[10px] font-semibold tracking-[0.14em] text-muted/70 uppercase">
          Lainnya
        </p>
        <span className="flex cursor-not-allowed items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted/50">
          <Settings className="size-4 shrink-0" />
          Pengaturan
          <span className="ml-auto rounded-full border border-line px-1.5 text-[9px] tracking-wide text-muted/60 uppercase">
            segera
          </span>
        </span>
      </nav>

      <div className="border-t border-line px-4 py-2.5">
        <div className="flex items-center gap-1.5 pb-2 text-[10px] whitespace-nowrap text-muted/70">
          Perbankan oleh <LogoBni className="h-3" /> · Spark Arc 2026
        </div>
        <div className="flex items-center gap-2.5 border-t border-line-soft pt-2.5">
          <Avatar nama={koperasi.manajer} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{koperasi.manajer}</p>
            <p className="text-[11px] text-muted">Manajer KDMP</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 border-r border-line bg-card lg:block">
        <SidebarContent />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-line bg-paper/90 px-4 backdrop-blur">
          <Sheet>
            <SheetTrigger className="rounded-lg p-2 text-muted hover:bg-line-soft lg:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Buka menu</span>
            </SheetTrigger>
            <SheetContent className="left-0 right-auto w-72 max-w-[80vw] border-r border-l-0 p-0">
              <SidebarContent />
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
            <button
              type="button"
              className="relative rounded-lg p-2 text-muted hover:bg-line-soft"
            >
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-merah" />
              <span className="sr-only">Notifikasi</span>
            </button>
            <Avatar nama={koperasi.manajer} />
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>
      </div>

      <PendampingAI />
    </div>
  );
}
