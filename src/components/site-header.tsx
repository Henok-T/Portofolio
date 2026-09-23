import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Mark } from "@/components/logo";
import { studio } from "@/lib/content";

const links = [
  { label: "Services", hash: "services" },
  { label: "Work", hash: "work" },
  { label: "Pricing", hash: "pricing" },
  { label: "About", hash: "about" },
];

export function SiteHeader() {
  const menuRef = useRef<HTMLDialogElement>(null);

  function closeMenu() {
    menuRef.current?.close();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 md:px-8">
        <Link to="/" className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-full pr-1 sm:gap-3" onClick={closeMenu}>
          <Mark className="h-10 sm:h-12" />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-brand text-sm uppercase tracking-wide text-ink sm:text-base">{studio.short}</span>
            <span className="mt-1 font-brand text-[0.62rem] lowercase tracking-[0.16em] text-lagoon sm:text-xs">
              web design
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.hash}
              to="/"
              hash={link.hash}
              className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-ink hover:text-lagoon"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/projects"
            className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-ink hover:text-lagoon"
          >
            Projects
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            hash="contact"
            className="hidden min-h-11 items-center rounded-full bg-coral px-5 text-sm font-semibold text-surface transition-transform duration-150 ease-out active:scale-[0.96] sm:inline-flex"
          >
            Start a project
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink md:hidden"
            aria-label="Open menu"
            onClick={() => menuRef.current?.showModal()}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <dialog
        ref={menuRef}
        className="menu"
        aria-label="Menu"
        onClick={(event) => {
          if (event.target === menuRef.current) closeMenu();
        }}
      >
        <div className="flex h-full flex-col px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-semibold">Menu</span>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.hash}
                to="/"
                hash={link.hash}
                onClick={closeMenu}
                className="font-display border-b border-line py-4 text-4xl text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/projects" onClick={closeMenu} className="font-display border-b border-line py-4 text-4xl">
              Projects
            </Link>
            <Link to="/reviews" onClick={closeMenu} className="font-display border-b border-line py-4 text-4xl">
              Reviews
            </Link>
          </nav>
          <Link
            to="/"
            hash="contact"
            onClick={closeMenu}
            className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full bg-coral px-5 text-base font-semibold text-surface"
          >
            Start a project
          </Link>
        </div>
      </dialog>
    </header>
  );
}
