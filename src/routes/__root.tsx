import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CupProgress } from "@/components/shared/CupProgress";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl tracking-display">404</h1>
        <h2 className="mt-4 text-lg">Diese Seite gibt es nicht.</h2>
        <p className="mt-2 text-sm text-muted-foreground">Vielleicht hilft dir ein frischer Espresso.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-espresso">Zur Startseite</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl tracking-display">Etwas ist schiefgegangen.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Versuch es nochmal, oder kehr zur Startseite zurück.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-amber px-4 py-2 text-sm font-medium text-espresso"
          >
            Nochmal versuchen
          </button>
          <a href="/" className="rounded-full border border-border px-4 py-2 text-sm">Startseite</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Barista State — Frisch gerösteter Kaffee & Heimrösten" },
      { name: "description", content: "Kuratierte Specialty-Kaffees von ausgewählten Röstereien und Heimröster, mit denen du Kaffee zuhause selbst röstest." },
      { name: "theme-color", content: "#1a1410" },
      { property: "og:title", content: "Barista State — Roast Journey" },
      { property: "og:description", content: "Kuratierte Specialty-Kaffees und Heimröster — eine ruhige, moderne Coffee-Welt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://api.fontshare.com" },
      {
        rel: "stylesheet",
        href: "https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CupProgress />
    </QueryClientProvider>
  );
}
