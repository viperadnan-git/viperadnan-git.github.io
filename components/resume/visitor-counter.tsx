"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";

interface HitsResponse {
  today_hits: number;
  total_hits: number;
}

export function VisitorCounter() {
  const [hits, setHits] = useState<HitsResponse | null>(null);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    const currentOrigin = window.location.origin;
    setOrigin(currentOrigin);

    const apiUrl = `https://hitscounter.dev/api/hit?output=json&url=${encodeURIComponent(currentOrigin)}&label=visitors&icon=file-person-fill&color=%23000&message=&style=flat&tz=UTC`;

    const fetchHits = () => {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data: HitsResponse) => {
          setHits(data);
        })
        .catch(() => {});
    };

    // Defer the API call to improve Time to Interactive
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      requestIdleCallback(fetchHits);
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(fetchHits, 1);
    }
  }, []);

  const historyUrl = `https://hitscounter.dev/history?url=${encodeURIComponent(origin)}`;

  return (
    <div aria-live="polite" aria-atomic="true">
      <a
        href={historyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
        aria-label={
          hits
            ? `${hits.today_hits.toLocaleString()} visitors today, ${hits.total_hits.toLocaleString()} total visitors. View history.`
            : "Loading visitor count"
        }
      >
        <FaUsers className="size-4" aria-hidden="true" />
        <AnimatePresence mode="wait">
          {hits ? (
            <motion.span
              key="count"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {hits.today_hits.toLocaleString()}/
              {hits.total_hits.toLocaleString()}
            </motion.span>
          ) : (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="text-muted-foreground/50"
            >
              —/—
            </motion.span>
          )}
        </AnimatePresence>
      </a>
    </div>
  );
}
