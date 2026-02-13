import Link from "next/link";
import { VisitorCounter } from "@/components/resume/visitor-counter";

interface DocumentContainerProps {
  children: React.ReactNode;
  showCounter?: boolean;
}

export function DocumentContainer({
  children,
  showCounter,
}: DocumentContainerProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-md"
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 pt-[15vh] pb-[30vh] md:pt-[20vh] md:pb-[40vh] md:px-8">
          {children}
        </div>
        <footer className="pb-16 text-center text-sm">
          <div className="flex flex-col items-center gap-1">
            {showCounter && <VisitorCounter />}
            <Link
              aria-label="developed by viperadnan"
              className="text-muted-foreground/60 hover:text-foreground"
              href="https://github.com/viperadnan-git/viperadnan-git.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              developed by viperadnan
            </Link>
            <span className="text-muted-foreground text-xs">
              yes, you can steal this &mdash;{" "}
              <Link
                href="https://github.com/viperadnan-git/viperadnan-git.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                fork it, ship yours
              </Link>
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
