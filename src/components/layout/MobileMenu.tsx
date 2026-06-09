import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type Nav = ReadonlyArray<{ to: string; label: string }>;

export function MobileMenu({ open, onClose, nav }: { open: boolean; onClose: () => void; nav: Nav }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] theme-dark bg-espresso text-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-display text-lg">Barista State</span>
            <button onClick={onClose} className="h-10 w-10 rounded-full border border-cream/20" aria-label="Schließen">
              ×
            </button>
          </div>
          <nav className="px-5 pt-10">
            <ul className="space-y-4">
              {nav.map((n, i) => (
                <motion.li
                  key={n.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={n.to}
                    onClick={onClose}
                    className="font-display text-5xl tracking-display block py-1"
                  >
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12">
              <Link
                to="/kaffee"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-amber px-5 py-3 text-sm font-medium text-espresso"
              >
                Kaffee entdecken →
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
