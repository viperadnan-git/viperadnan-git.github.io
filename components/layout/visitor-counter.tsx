"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "@/components/shared/external-link";
import { Button } from "@/components/ui/button";

interface Hits {
  today_hits: number;
  total_hits: number;
}

const fmt = new Intl.NumberFormat("en");
const site = () => encodeURIComponent(location.origin);

/** hitscounter.dev count; hidden if the API fails so the footer never shows a broken value. */
export function VisitorCounter() {
  // null while loading, false if the API failed
  const [hits, setHits] = useState<Hits | null | false>(null);

  useEffect(() => {
    const url = `https://hitscounter.dev/api/hit?output=json&url=${site()}&tz=UTC`;
    const load = () =>
      fetch(url)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((h: Hits) => setHits(Number.isFinite(h?.total_hits) ? h : false))
        .catch(() => setHits(false));
    // after the page is interactive
    if ("requestIdleCallback" in window) requestIdleCallback(load);
    else setTimeout(load, 1);
  }, []);

  if (hits === false) return null;
  if (!hits) return <span className="tabular-nums">Counting visits…</span>;

  return (
    <Button asChild variant="quiet" size="text" className="tabular-nums">
      <ExternalLink href={`https://hitscounter.dev/history?url=${site()}`}>
        {fmt.format(hits.total_hits)} visits, {fmt.format(hits.today_hits)}{" "}
        today
      </ExternalLink>
    </Button>
  );
}
