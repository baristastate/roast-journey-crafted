import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type NavItem = { label: string; to: string; items?: { label: string; desc: string; to: string }[] };

export function MobileMenu({
  open,
  onClose,
  nav,
}: {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col"
          style={{
            background: "rgba(22,22,23,0.97)",
            backdropFilter: "saturate(180%) blur(24px)",
            WebkitBackdropFilter: "saturate(180%) blur(24px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Top bar */}
          <div className="flex h-12 shrink-0 items-center justify-between px-5">
            <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-magenta-coral text-ink-black text-[0.55rem] font-bold">
                B
              </span>
              <span className="font-display text-[0.82rem] font-bold tracking-tight text-pearl-white">
                Barista State
              </span>
            </Link>
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full text-pearl-white/60 hover:text-pearl-white transition-colors"
              aria-label="Schließen"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M1 1L12 12M12 1L1 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-5 pt-8">
            <ul>
              {nav.map((n, i) => (
                <motion.li
                  key={n.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + i * 0.05,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-pearl-white/[0.08]"
                >
                  <Link
                    to={n.to}
                    onClick={onClose}
                    className="group flex items-center justify-between py-4 text-[1.5rem] font-display font-bold tracking-[-0.02em] text-pearl-white/80 hover:text-pearl-white transition-colors"
                    activeProps={{ className: "!text-magenta-coral" }}
                  >
                    {n.label}
                    <span className="text-pearl-white/25 group-hover:text-pearl-white/60 text-base transition-colors">
                      →
                    </span>
                  </Link>

                  {/* Sub-items */}
                  {n.items && (
                    <ul className="pb-3 pl-1 space-y-2">
                      {n.items.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            to={sub.to}
                            onClick={onClose}
                            className="group flex items-baseline gap-3 py-1"
                          >
                            <span className="text-[0.8rem] font-medium text-pearl-white/55 group-hover:text-pearl-white transition-colors">
                              {sub.label}
                            </span>
                            <span className="text-[0.68rem] text-pearl-white/30">{sub.desc}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 px-5 pb-10 pt-6 border-t border-pearl-white/[0.08]"
          >
            <Link
              to="/shop"
              onClick={onClose}
              className="btn-shimmer flex items-center justify-center gap-2 rounded-full bg-magenta-coral px-6 py-3.5 text-sm font-semibold text-ink-black"
            >
              Shop entdecken →
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
