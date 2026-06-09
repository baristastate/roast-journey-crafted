import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="theme-dark bg-espresso text-cream">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl md:text-5xl tracking-display leading-[1.05] max-w-md">
              Frisch geröstet. Bewusst ausgewählt.
            </p>
            <p className="mt-6 text-sm text-cream/60 max-w-sm">
              Kuratierte Kaffees, Heimröster und Wissen für Menschen, die Kaffee verstehen wollen.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs uppercase tracking-[0.28em] text-cream/50">Navigation</h4>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                ["/kaffee", "Kaffee"],
                ["/heimroester", "Heimröster"],
                ["/community", "Community"],
                ["/roestereien", "Röstereien"],
                ["/ueber-uns", "Über uns"],
                ["/shop", "Shop"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-cream/80 hover:text-cyan-bloom transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.28em] text-cream/50">Bleib in Kontakt</h4>
            <p className="mt-5 text-sm text-cream/70">Neue Kaffees, Röstereien und Heimröst-Notizen — einmal im Monat.</p>
            <form className="mt-5 flex border-b border-cream/20" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="deine@email.de"
                aria-label="E-Mail"
                className="flex-1 bg-transparent py-3 text-sm placeholder:text-cream/40 focus:outline-none"
              />
              <button className="text-sm text-amber pl-3">Abonnieren →</button>
            </form>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-cream/10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-cream/50">
          <span>© {new Date().getFullYear()} Barista State</span>
          <span>Made with care for specialty coffee.</span>
        </div>
      </div>
    </footer>
  );
}
