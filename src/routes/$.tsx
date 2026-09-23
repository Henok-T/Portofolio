import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "@/components/not-found";

export const Route = createFileRoute("/$")({
  component: NotFoundPage,
  head: () => ({
    meta: [
      { title: "Page not found — Asmara Web Design" },
      { name: "description", content: "This page doesn't exist on the Asmara Web Design site." },
    ],
  }),
});
