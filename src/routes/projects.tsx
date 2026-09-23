import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Shell } from "@/components/shell";
import { projects, regions } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects — Asmara Web Design" },
      {
        name: "description",
        content:
          "Websites Asmara Web Design has designed and built for local businesses, plus one design concept.",
      },
    ],
  }),
});

function ProjectsPage() {
  const [region, setRegion] = useState<(typeof regions)[number]>("All");
  const visible = projects.filter((project) => region === "All" || project.region === region);

  return (
    <Shell>
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-muted">
            <Link to="/" className="font-medium text-lagoon">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            Projects
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold text-ink">Projects</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Websites we've designed and built for local businesses, plus one design concept.
          </p>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by industry">
            {regions.map((item) => {
              const count =
                item === "All" ? projects.length : projects.filter((project) => project.region === item).length;
              const selected = region === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setRegion(item)}
                  className={cn(
                    "min-h-11 rounded-full px-4 text-sm font-semibold transition-transform duration-150 active:scale-[0.96]",
                    selected ? "bg-ink text-bg" : "border border-line bg-surface text-ink",
                  )}
                >
                  {item}
                  <span className={cn("ml-2 tabular-nums", selected ? "text-bg/70" : "text-muted")}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {visible.map((project) => (
              <article key={project.slug} className="overflow-hidden rounded-3xl border border-line bg-surface">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={project.image}
                    alt={`Screenshot of the ${project.name} website`}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="shot"
                  />
                </a>
                <div className="p-5">
                  <p className="text-sm text-muted">{project.host}</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-ink">{project.name}</h2>
                  <p className="mt-1 text-sm text-lagoon">
                    {project.kind}, {project.place}
                  </p>
                  <p className="mt-3 text-sm text-muted">{project.summary}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-lagoon"
                  >
                    {project.cta}
                    <span className="sr-only"> (opens in a new tab)</span>
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted">
            Client sites are added here once they launch and the client agrees to be listed.
          </p>
          <Link
            to="/"
            hash="contact"
            className="mt-4 inline-flex min-h-11 items-center rounded-full bg-coral px-5 text-sm font-semibold text-surface"
          >
            Have a site to build or a problem to fix?
          </Link>
        </div>
      </section>
    </Shell>
  );
}
