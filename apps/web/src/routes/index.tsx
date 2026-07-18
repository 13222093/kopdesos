import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Beranda,
});

function Beranda() {
  return (
    <main className="grid min-h-dvh place-items-center">
      <h1 className="text-2xl font-semibold">KopdesOS — scaffold OK</h1>
    </main>
  );
}
