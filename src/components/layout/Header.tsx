import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MobileMenu } from "./MobileMenu";

type DropItem = { label: string; desc: string; to: string };
type NavItem = { label: string; to: string; items?: DropItem[] };

const NAV: NavItem[] = [
  {
    label: "Shop",
    to: "/shop",
    items: [
      { label: "Alle Kaffees", desc: "Frisch geröstet, kuratiert", to: "/shop" },
      { label: "Coffee Finder", desc: "Dein persönlicher Match", to: "/shop" },
      { label: "Espresso & Milk", desc: "Vollmundig und rund", to: "/shop" },
      { label: "Filterkaffee", desc: "Klar, fruchtig, komplex", to: "/shop" },
      { label: "Heimröster", desc: "Rohkaffee rösten zu Hause", to: "/shop" },
    ],
  },
  {
    label: "Heimröster",
    to: "/heimroester",
    items: [
      { label: "Alle Modelle", desc: "Frame by frame rösten", to: "/heimroester" },
      { label: "Rohkaffee", desc: "Grüne Bohnen, handverlesen", to: "/heimroester" },
      { label: "Röst-Guide", desc: "So funktioniert Heimrösten", to: "/heimroester" },
    ],
  },
  { label: "Community", to: "/community" },
  {
    label: "Röstereien",
    to: "/roestereien",
    items: [
      {
        label: "Partner-Röstereien",
        desc: "Vier Häuser, vier Handschriften",
        to: "/roestereien",
      },
      { label: "Partner werden", desc: "B2B & mehr Sichtbarkeit", to: "/roestereien" },
    ],
  },
  { label: "Über uns", to: "/ueber-uns" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeDropdown = NAV.find((n) => n.label === hovered && n.items);
  const showBg = scrolled || !!hovered;

  const enter = (label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovered(label);
  };

  const leave = () => {
    leaveTimer.current = setTimeout(() => setHovered(null), 120);
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-400"
        style={{
          background: showBg ? "rgba(18,18,20,0.94)" : "transparent",
          backdropFilter: showBg ? "saturate(200%) blur(24px)" : "none",
          WebkitBackdropFilter: showBg ? "saturate(200%) blur(24px)" : "none",
          borderBottom: `1px solid ${showBg ? "rgba(255,255,255,0.08)" : "transparent"}`,
        }}
        onMouseLeave={leave}
      >
        {/* ── Bar ─────────────────────────────────── */}
        <div className="mx-auto grid h-12 max-w-[1400px] grid-cols-[200px_1fr_200px] items-center px-6 md:px-10">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group w-fit">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-magenta-coral text-ink-black text-[0.55rem] font-bold ring-2 ring-magenta-coral/0 group-hover:ring-magenta-coral/30 transition-all duration-300">
              B
            </span>
            <span className="font-display text-[0.82rem] font-bold tracking-tight text-pearl-white/85 group-hover:text-pearl-white transition-colors duration-200">
              Barista State
            </span>
          </Link>

          {/* Nav — centered */}
          <nav className="hidden lg:flex items-center justify-center gap-0">
            {NAV.map((n) => (
              <div key={n.label} onMouseEnter={() => enter(n.label)} className="relative">
                <Link
                  to={n.to}
                  className={`relative flex items-center gap-1 px-3.5 py-2 text-[0.75rem] transition-colors duration-150 select-none ${
                    hovered === n.label
                      ? "text-pearl-white"
                      : "text-pearl-white/65 hover:text-pearl-white/90"
                  }`}
                  activeProps={{ className: "!text-pearl-white" }}
                >
                  {n.label}
                  {n.items && (
                    <svg
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      className={`transition-transform duration-200 ${hovered === n.label ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M1 1L4 4L7 1"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {/* Active dot */}
                  <motion.span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-px w-3 rounded-full bg-magenta-coral opacity-0"
                    whileHover={{ opacity: 0 }}
                    style={{ opacity: 0 }}
                  />
                </Link>
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center justify-end gap-0">
            {/* Search */}
            <button
              className="hidden lg:grid h-10 w-10 place-items-center text-pearl-white/55 hover:text-pearl-white transition-colors duration-150 rounded-full hover:bg-white/[0.06]"
              aria-label="Suchen"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.2" />
                <path
                  d="M10.5 10.5L13 13"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Cart */}
            <Link
              to="/shop"
              className="hidden lg:grid h-10 w-10 place-items-center text-pearl-white/55 hover:text-pearl-white transition-colors duration-150 rounded-full hover:bg-white/[0.06]"
              aria-label="Warenkorb"
            >
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
                <path
                  d="M5 5V4a3 3 0 0 1 6 0v1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M1.5 5h13l-1.2 8H2.7L1.5 5Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden grid h-10 w-10 place-items-center text-pearl-white/70 hover:text-pearl-white transition-colors rounded-full hover:bg-white/[0.06]"
              aria-label="Menü öffnen"
            >
              <span className="flex flex-col gap-[5px] items-center">
                <span className="block h-px w-[16px] bg-current rounded-full" />
                <span className="block h-px w-[16px] bg-current rounded-full" />
                <span className="block h-px w-[10px] bg-current rounded-full self-start ml-[3px]" />
              </span>
            </button>
          </div>
        </div>

        {/* ── Dropdown ────────────────────────────── */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              key={activeDropdown.label}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => enter(activeDropdown.label)}
              className="border-t border-white/[0.06]"
            >
              <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-4">
                <div className="flex gap-0.5">
                  {activeDropdown.items!.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.025, duration: 0.16 }}
                      className="flex-1 min-w-0"
                    >
                      <Link
                        to={item.to}
                        onClick={() => setHovered(null)}
                        className="group block rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-white/[0.07]"
                      >
                        <div className="text-[0.75rem] font-medium text-pearl-white/85 group-hover:text-pearl-white transition-colors duration-150 truncate">
                          {item.label}
                        </div>
                        <div className="mt-0.5 text-[0.68rem] text-pearl-white/35 group-hover:text-pearl-white/55 transition-colors duration-150 truncate">
                          {item.desc}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} nav={NAV} />
    </>
  );
}
