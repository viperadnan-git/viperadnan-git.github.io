import { CurrentYear } from "@/components/layout/current-year";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { VisitorCounter } from "@/components/layout/visitor-counter";
import { ExternalLink, NewTabNote } from "@/components/shared/external-link";
import { Button } from "@/components/ui/button";
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-foreground focus:px-3 focus:py-1 focus:text-background"
      >
        Skip to main content
      </a>
      <NewTabNote />
      {/* min-h-dvh + grow keeps the footer at the bottom when the page is short */}
      <div className="mx-auto flex min-h-dvh max-w-[600px] flex-col px-6 pt-16 pb-12 md:pt-[120px] md:pb-16">
        <main id="main-content" className="grow">
          {children}
        </main>
        <footer className="mt-20 text-[13px] text-muted-foreground md:mt-[120px]">
          <div className="flex flex-wrap items-center gap-x-[18px] gap-y-3">
            <Button asChild variant="quiet" size="text">
              <ExternalLink href="https://github.com/viperadnan-git/viperadnan-git.github.io">
                Source
              </ExternalLink>
            </Button>
            {legal?.map(({ label, url }) => (
              <Button key={url} asChild variant="quiet" size="text">
                <a href={url}>{label}</a>
              </Button>
            ))}
            <ThemeToggle />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <p>
              {/* viewBox cropped to the glyph, height = Onest cap height, so it sits on the baseline like a capital */}
              <svg
                viewBox="8.33 12.5 83.34 67.86"
                aria-hidden="true"
                className="mr-2 inline-block h-[0.707em] w-auto fill-current align-baseline"
              >
                <path d="M36.9 12.5 50 43.45 63.1 12.5l28.57 67.86H67.86L50 51.79 32.14 80.36H8.33Z" />
              </svg>
              ©&nbsp;
              <CurrentYear buildYear={new Date().getFullYear()} />
            </p>
            {/* right edge: the count grows leftward as it loads, shifting nothing */}
            {showCounter && <VisitorCounter />}
          </div>
        </footer>
      </div>
    </>
  );
}
