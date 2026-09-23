import { Link } from "@tanstack/react-router";
import { Mark } from "@/components/logo";
import { studio } from "@/lib/content";

const navigate = [
  { label: "Services", to: "/", hash: "services" },
  { label: "Work", to: "/", hash: "work" },
  { label: "Pricing", to: "/", hash: "pricing" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/", hash: "about" },
  { label: "Reviews", to: "/reviews" },
] as const;

const serviceLinks = [
  { label: "Website development", hash: "services" },
  { label: "Website maintenance", hash: "services" },
  { label: "Technical support", hash: "services" },
  { label: "Installable web apps", hash: "services" },
  { label: "Speed and SEO cleanup", hash: "services" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <Mark />
          <p className="mt-3 font-brand text-2xl uppercase leading-none tracking-wide">Asmara</p>
          <p className="mt-2 font-brand text-xs lowercase tracking-[0.18em] text-bg/80">web design</p>
          <p className="mt-3 max-w-xs text-sm text-bg/75">
            Websites for small businesses in Metro Atlanta, built and kept running.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-bg">Navigate</p>
          <ul className="mt-3 space-y-2">
            {navigate.map((item) => (
              <li key={item.label}>
                {"hash" in item ? (
                  <Link to={item.to} hash={item.hash} className="text-sm text-bg/80 hover:text-bg">
                    {item.label}
                  </Link>
                ) : (
                  <Link to={item.to} className="text-sm text-bg/80 hover:text-bg">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-bg">Services</p>
          <ul className="mt-3 space-y-2">
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <Link to="/" hash={item.hash} className="text-sm text-bg/80 hover:text-bg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-bg">Let's talk</p>
          <p className="mt-3 text-sm text-bg/75">Tell us what's stuck, or what you want to launch.</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/" hash="contact" className="text-bg underline-offset-4 hover:underline">
                Start a project
              </Link>
            </li>
            <li>
              <a href={studio.linkedin} className="text-bg/80 hover:text-bg" rel="noopener noreferrer">
                Message us on LinkedIn
              </a>
            </li>
            <li>
              <a href={studio.github} className="text-bg/80 hover:text-bg" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bg/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-sm text-bg/70 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Asmara Web Design. Web development and technical support in Metro Atlanta, GA.</p>
          <a href="#main" className="inline-flex min-h-11 items-center font-medium text-bg">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
