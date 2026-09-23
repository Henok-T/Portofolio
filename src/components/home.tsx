import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Blocks,
  Gauge,
  Globe,
  LifeBuoy,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PricingSection } from "@/components/pricing-section";
import { fixes, projects, services, steps, studio } from "@/lib/content";
import { useInquiry } from "@/lib/inquiry";

const icons: Record<string, LucideIcon> = {
  globe: Globe,
  wrench: Wrench,
  "life-buoy": LifeBuoy,
  smartphone: Smartphone,
  blocks: Blocks,
  gauge: Gauge,
};

export function HomePage() {
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <>
      <section className="px-5 pb-8 pt-12 md:px-8 md:pt-20">
        <div className="mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="rise inline-flex items-center rounded-full bg-lagoon/10 px-3 py-1 text-sm font-semibold text-lagoon">
              {studio.place} · Taking on new projects
            </p>
            <h1 className="rise rise-2 mt-5 font-display text-5xl font-semibold leading-none text-ink sm:text-6xl">
              We build websites, and we{" "}
              <em className="italic text-lagoon">fix what breaks</em> in them.
            </h1>
            <p className="rise rise-3 mt-5 max-w-xl text-lg text-muted">
              Small businesses get a fast, clear site they can grow with. Teams
              get problems traced to the root, the same way we have handled
              production software since 2020.
            </p>
            <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                hash="contact"
                className="inline-flex min-h-11 items-center rounded-full bg-coral px-5 text-sm font-semibold text-surface transition-transform duration-150 active:scale-[0.96]"
              >
                Start a project
              </Link>
              <a
                href="#work"
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-5 text-sm font-semibold text-ink"
              >
                See the work
              </a>
            </div>
          </div>

          <aside className="rise rise-3 rounded-3xl border border-line bg-surface p-5 shadow-card lg:col-span-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-ink">
                Recently resolved
              </p>
              <span className="rounded-full bg-coral/10 px-2.5 py-1 text-xs font-semibold text-coral">
                From real projects
              </span>
            </div>
            <ol className="mt-4 divide-y divide-line">
              {fixes.map((item, index) => (
                <li key={item.problem} className="py-4">
                  <p className="text-xs font-semibold tabular-nums text-lagoon">
                    0{index + 1}
                  </p>
                  <p className="mt-1 font-medium text-ink">{item.problem}</p>
                  <p className="mt-1 text-sm text-muted">{item.fix}</p>
                </li>
              ))}
            </ol>
            <button
              type="button"
              className="mt-2 min-h-11 text-sm font-semibold text-lagoon underline-offset-4 hover:underline"
              onClick={() =>
                useInquiry.getState().choose({
                  service: "support",
                  seed: "I have something stuck: ",
                })
              }
            >
              Have something stuck? Ask for technical help.
            </button>
          </aside>
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-20 px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-lagoon">
              What we can help with
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
              Each engagement starts from a problem, not a package.
            </h2>
            <p className="mt-4 text-muted">
              These are the ones we solve most often.
            </p>
            <button
              type="button"
              className="mt-6 min-h-11 text-sm font-semibold text-lagoon underline-offset-4 hover:underline"
              onClick={() =>
                useInquiry.getState().choose({
                  service: "",
                  seed: "I'm not sure which of these fits. ",
                })
              }
            >
              Not sure which of these fits? Describe the problem.
            </button>
          </div>
          <div className="lg:col-span-8">
            <ul className="divide-y divide-line border-y border-line">
              {services.map((service, index) => {
                const Icon = icons[service.icon] ?? Globe;
                return (
                  <li key={service.id} className="py-6">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-lagoon/10 text-lagoon">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold tabular-nums text-lagoon">
                          0{index + 1}
                        </p>
                        <h3 className="font-display text-2xl font-semibold text-ink">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-muted">{service.summary}</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {service.points.map((point) => (
                            <li
                              key={point}
                              className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-lagoon">
            How a project runs
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-ink md:text-5xl">
            Four steps, with a checkpoint at each one.
          </h2>
          <ol className="steps mt-12 grid gap-8 md:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="relative">
                <span className="relative z-10 inline-flex size-11 items-center justify-center rounded-full bg-coral font-display text-lg font-semibold text-surface">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PricingSection />

      <section
        id="work"
        className="scroll-mt-20 bg-surface px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold text-lagoon">Selected work</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold text-ink md:text-5xl">
                Websites for local businesses, plus one design concept.
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-lagoon"
            >
              See all projects
            </Link>
          </div>

          <article className="mt-10 grid items-center gap-8 lg:grid-cols-12">
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="overflow-hidden rounded-3xl border border-line lg:col-span-7"
            >
              <img
                src={featured.image}
                alt={`Screenshot of the ${featured.name} website`}
                width={1600}
                height={1000}
                className="shot"
                decoding="async"
              />
            </a>
            <div className="lg:col-span-5">
              <p className="text-sm font-medium text-muted">{featured.host}</p>
              <p className="mt-1 text-sm text-lagoon">
                {featured.kind}, {featured.place}
              </p>
              <h3 className="mt-3 font-display text-4xl font-semibold text-ink">
                {featured.name}
              </h3>
              <p className="mt-3 text-muted">{featured.summary}</p>
              <ul className="mt-4 space-y-2">
                {featured.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-ink">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-coral"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">Role · {featured.role}</p>
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-lagoon"
              >
                {featured.cta}
                <span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </article>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {rest.map((project) => (
              <article
                key={project.slug}
                className="overflow-hidden rounded-3xl border border-line bg-bg"
              >
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
                  <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
                    {project.name}
                  </h3>
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
        </div>
      </section>

      <section id="about" className="scroll-mt-20 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div
                className="absolute -bottom-3 left-3 right-0 top-6 rounded-3xl bg-lagoon/15"
                aria-hidden="true"
              />
              <img
                src="/about.webp?v=ivory"
                alt="Henok T., founding owner of Asmara Web Design"
                width={622}
                height={491}
                className="relative w-full rounded-3xl border border-line object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-lagoon">
              Who you're working with
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
              A small studio with two halves.
            </h2>
            <p className="mt-5 text-lg text-muted">
              Asmara Web Design is a small studio in the Atlanta metro area with
              two halves that feed each other: building websites small
              businesses can actually run, and supporting the software behind
              them once it's live.
            </p>
            <p className="mt-4 text-ink">
              I'm Henok, the founding owner. I spend my working days keeping
              production software stable, which is why this studio cares as much
              about what happens after launch as about the launch itself.
              Everything is built in plain HTML, CSS, and JavaScript, so any
              developer can pick it up later.
            </p>
            <p className="mt-6 text-sm font-semibold text-muted">
              Henok, Founding Owner
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-4 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 rounded-3xl bg-lagoon/10 px-6 py-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-lagoon">
              What clients say
            </p>
            <p className="mt-1 max-w-2xl text-ink">
              Reviews appear here only after a client approves the wording in
              writing. None are published yet.
            </p>
          </div>
          <Link
            to="/reviews"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-lagoon"
          >
            Read the review policy
          </Link>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-20 px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-lagoon">Start a project</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
              Tell us what's stuck, or what you want to launch.
            </h2>
            <p className="mt-4 text-muted">
              A new site, a fix to an existing one, or help tracing a software
              issue. We'll reply with a few questions before suggesting a plan.
            </p>
            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href={studio.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <span className="text-sm font-semibold text-ink">
                    LinkedIn
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">
                    Fastest way to reach us right now
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={studio.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <span className="text-sm font-semibold text-ink">GitHub</span>
                  <span className="mt-0.5 block text-sm text-muted">
                    Public code and training projects
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <p className="text-sm font-semibold text-ink">Studio</p>
                <p className="mt-0.5 text-sm text-muted">{studio.place}</p>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
