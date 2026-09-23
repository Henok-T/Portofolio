import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export function NotFoundPage() {
  return (
    <Shell>
      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-lagoon">404</p>
          <h1 className="mt-3 font-display text-5xl font-semibold text-ink">This page doesn't exist.</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            The link may point to the previous version of this site. Everything is still here under a new address.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center rounded-full bg-coral px-5 text-sm font-semibold text-surface"
            >
              Go to the homepage
            </Link>
            <Link
              to="/projects"
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-5 text-sm font-semibold text-ink"
            >
              See all projects
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
