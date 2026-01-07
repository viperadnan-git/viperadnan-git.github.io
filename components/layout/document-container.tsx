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
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 pt-[15vh] pb-[30vh] md:pt-[20vh] md:pb-[40vh] md:px-8">
        {children}
      </div>
      <footer className="pb-8 text-center text-sm">
        <div className="flex flex-col items-center gap-1">
          {showCounter && <VisitorCounter />}
          <Link
            aria-label="developed by viperadnan"
            className="text-muted-foreground hover:text-foreground"
            href="https://github.com/viperadnan-git/viperadnan-git.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            developed by viperadnan
          </Link>
        </div>
      </footer>
    </main>
  );
}
