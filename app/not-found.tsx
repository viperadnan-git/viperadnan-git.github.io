import { BackButton } from "@/components/layout/back-button";

export default function NotFound() {
  return (
    <>
      <BackButton />
      <div className="flex min-h-screen flex-col items-center pt-16 text-center sm:pt-20 md:pt-24">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 max-w-xs px-4 text-sm text-muted-foreground sm:mt-8 sm:max-w-sm sm:text-base">
          &ldquo;You are free, and that is why you are lost.&rdquo;
          <span className="mt-2 block text-xs sm:text-sm">
            &mdash; Franz Kafka
          </span>
        </p>
      </div>
    </>
  );
}
