import Link from "next/link";

interface DocumentContainerProps {
  children: React.ReactNode;
}

export function DocumentContainer({ children }: DocumentContainerProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 pt-[15vh] pb-[30vh] md:pt-[20vh] md:pb-[40vh] md:px-8">
        {children}
      </div>
      <footer className="pb-8 text-center text-sm text-muted-foreground/50">
        <Link href="https://github.com/viperadnan-git/viperadnan-git.github.io" target="_blank" rel="noopener noreferrer">
          developed by viperadnan
        </Link>
      </footer>
    </main>
  );
}
