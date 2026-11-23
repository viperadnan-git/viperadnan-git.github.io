"use client";

import { useEffect } from "react";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <BackButton />
      <h1 className="font-medium">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">
        {error.message || "The page failed to load."}
      </p>
      <Button variant="quiet" size="text" onClick={reset} className="mt-6">
        Try again
      </Button>
    </>
  );
}
