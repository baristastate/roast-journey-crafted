import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";

const NAV = [
  { to: "/kaffee", label: "Kaffee" },
  { to: "/heimroester", label: "Heimröster" },
  { to: "/community", label: "Community" },
  { to: "/roestereien", label: "Röstereien" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/shop", label: "Shop" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-[color-mix(in_oklab,var(--background)_75%,transparent)] border-b border-border/60"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="group flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-amber text-espresso text-[0.7rem] font-semibold">B</span>
            <span className="font-display text-lg tracking-display">Barista State</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-foreground/80 hover:text-foreground transition-colors relative py-1"
                activeProps={{ className: "text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/kaffee"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-amber px-4 py-2 text-sm font-medium text-espresso transition-transform hover:-translate-y-0.5"
            >
              Kaffee entdecken
              <span aria-hidden>→</span>
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60"
              aria-label="Menü öffnen"
            >
              <span className="flex flex-col gap-1">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} nav={NAV} />
    </>
  );
}
