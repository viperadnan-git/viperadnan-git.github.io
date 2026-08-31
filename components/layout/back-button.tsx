import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BackButton() {
  return (
    <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
      <Link href="/">
        <ArrowLeft className="mr-2 size-4" />
        Back
      </Link>
    </Button>
  );
}
