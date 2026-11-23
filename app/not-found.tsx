import { BackButton } from "@/components/layout/back-button";

export default function NotFound() {
  return (
    <>
      <BackButton />
      <section className="enter [--i:1]">
        <h1 className="font-medium">Page not found</h1>
        <p className="mt-2 max-w-[44ch] text-muted-foreground">
          &ldquo;You are free, and that is why you are lost.&rdquo; Franz Kafka
        </p>
      </section>
    </>
  );
}
