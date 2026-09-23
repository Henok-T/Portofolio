import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home";
import { Shell } from "@/components/shell";

const description =
  "We build websites, and we fix what breaks in them. Small-business sites, maintenance, and technical support from a Metro Atlanta studio.";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Asmara Web Design — Websites and technical support" },
      { name: "description", content: description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Asmara Web Design",
          description,
          areaServed: "Metro Atlanta",
          url: "https://asmaraweb.netlify.app/",
          founder: { "@type": "Person", name: "Henok T." },
          sameAs: ["https://www.linkedin.com/in/henok-t/", "https://github.com/Henok-T"],
        }),
      },
    ],
  }),
});

function Home() {
  return (
    <Shell>
      <HomePage />
    </Shell>
  );
}
