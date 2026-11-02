import Link from "next/link";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { LocationMap } from "@/components/resume/location-map";
import { VisitorCounter } from "@/components/resume/visitor-counter";
import type { SiteMeta } from "@/lib/types/resume";

interface DocumentContainerProps {
  children: React.ReactNode;
  showCounter?: boolean;
  legal?: SiteMeta["legal"];
}

export function DocumentContainer({
  children,
  showCounter,
  legal,
}: DocumentContainerProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-md"
      >
        Skip to main content
      </a>
      <main id="main-content" className="relative min-h-screen bg-background">
        <LocationMap />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-[15vh] pb-[30vh] md:pt-[20vh] md:pb-[40vh] md:px-8">
          {children}
        </div>
        <footer className="relative z-10 px-4 pb-16">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-5">
            <div className="flex w-full max-w-[13rem] items-center gap-4 text-foreground/25">
              <span className="h-px flex-1 bg-current" />
              <svg
                viewBox="0 0 100 100"
                fill="currentColor"
                aria-hidden="true"
                className="size-5 shrink-0"
              >
                <path d="M36.9 12.5 L50 43.45 L63.1 12.5 L91.67 80.36 L67.86 80.36 L50 51.79 L32.14 80.36 L8.33 80.36 Z" />
              </svg>
              <span className="h-px flex-1 bg-current" />
            </div>

            <Link
              href="https://github.com/viperadnan-git/viperadnan-git.github.io"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
              className="inline-flex items-center gap-2 font-heading text-base font-medium leading-none tracking-tight text-foreground/80 transition-colors hover:text-foreground"
            >
              <GitHubIcon className="size-4 translate-y-px" />
              viperadnan
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground/60">
              {showCounter && <VisitorCounter />}
              {showCounter && <span aria-hidden="true">&middot;</span>}
              <span>
                map{" "}
                <Link
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  OpenStreetMap
                </Link>{" "}
                &middot;{" "}
                <Link
                  href="https://www.esri.com/en-us/legal/terms/full-master-agreement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  Esri
                </Link>
              </span>
            </div>

            {legal && legal.length > 0 && (
              <nav
                aria-label="Legal"
                className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground/60"
              >
                {legal.map(({ label, url }) => (
                  <Link key={url} href={url} className="hover:text-foreground">
                    {label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </footer>
      </main>
    </>
  );
}
