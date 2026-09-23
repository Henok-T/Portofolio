import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { studio } from "@/lib/content";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
  head: () => ({
    meta: [
      { title: "Reviews — Asmara Web Design" },
      {
        name: "description",
        content:
          "Client reviews for Asmara Web Design are published only after written approval. None are listed yet.",
      },
    ],
  }),
});

function ReviewsPage() {
  return (
    <Shell>
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-muted">
            <Link to="/" className="font-medium text-lagoon">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            Reviews
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold text-ink">What clients say</h1>
          <p className="mt-4 text-lg text-muted">
            Feedback from businesses and teams that have worked with Asmara Web Design.
          </p>

          <div className="mt-10 rounded-3xl border border-dashed border-line bg-surface p-6 sm:p-8">
            <p className="font-display text-2xl font-semibold text-ink">No published reviews yet.</p>
            <p className="mt-3 text-muted">
              We only list a review after the client approves the exact wording in writing. Nothing here is invented, shortened, or anonymous.
            </p>
            <p className="mt-3 text-muted">
              Worked with us? Send a note and we'll ask your permission before adding your review.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/"
                hash="contact"
                className="inline-flex min-h-11 items-center rounded-full bg-coral px-5 text-sm font-semibold text-surface"
              >
                Send a note
              </Link>
              <a
                href={studio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-bg px-5 text-sm font-semibold text-ink"
              >
                Ask on LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
