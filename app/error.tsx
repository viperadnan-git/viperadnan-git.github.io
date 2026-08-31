"use client";

import { RotateCcw } from "lucide-react";
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
      <div className="flex min-h-screen flex-col items-center pt-16 text-center sm:pt-20 md:pt-24">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-xs px-4 text-sm text-muted-foreground sm:max-w-sm sm:text-base">
          {error.message || "An unexpected error occurred"}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          className="mt-6 cursor-pointer"
        >
          <RotateCcw className="mr-2 size-4" />
          Try again
        </Button>
      </div>
    </>
  );
}
