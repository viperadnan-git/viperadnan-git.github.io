"use client";

import { useEffect, useState } from "react";

/** Build year in the static HTML, then the visitor's current year, so it never goes stale between deploys. */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return year;
}
