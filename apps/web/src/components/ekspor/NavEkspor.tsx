import { Link } from "@tanstack/react-router";

const langkah = [
  { to: "/ekspor", label: "1 · Kesiapan" },
  { to: "/ekspor/peluang", label: "2 · Peluang Pasar" },
  { to: "/ekspor/dokumen", label: "3 · Dokumen & Regulasi" },
] as const;

/** Alur ekspor 3 langkah — Link bergaya segmented control (bukan Tabs). */
export function NavEkspor() {
  return (
    <div className="flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-lg border border-line bg-card p-1">
      {langkah.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          activeOptions={{ exact: l.to === "/ekspor" }}
          className="rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap text-muted transition-colors hover:text-ink"
          activeProps={{
            className: "bg-merah-soft text-merah hover:text-merah",
          }}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
