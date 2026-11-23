"use client";

import Link from "next/link";
import { useOwner } from "@/components/providers/owner-provider";
import { Button } from "@/components/ui/button";

/** Sub-pages start with the owner's name, linking home. */
export function BackButton() {
  return (
    <Button asChild variant="quiet" size="text" className="enter mb-12">
      <Link href="/">{useOwner()}</Link>
    </Button>
  );
}
