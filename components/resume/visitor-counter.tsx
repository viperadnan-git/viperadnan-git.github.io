"use client";

import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";

interface HitsResponse {
  today_hits: number;
  total_hits: number;
}

export function VisitorCounter() {
  const [hits, setHits] = useState<HitsResponse>({
    today_hits: 0,
    total_hits: 0,
  });
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    const currentOrigin = window.location.origin;
    setOrigin(currentOrigin);

    const apiUrl = `https://hitscounter.dev/api/hit?output=json&url=${encodeURIComponent(currentOrigin)}&label=visitors&icon=file-person-fill&color=%23000&message=&style=flat&tz=UTC`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data: HitsResponse) => {
        setHits(data);
      })
      .catch(() => {});
  }, []);

  const historyUrl = `https://hitscounter.dev/history?url=${encodeURIComponent(origin)}`;

  return (
    <a
      href={historyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
      aria-label={`${hits.today_hits.toLocaleString()} visitors today, ${hits.total_hits.toLocaleString()} total visitors. View history.`}
    >
      <FaUsers className="h-4 w-4" aria-hidden="true" />
      <span>
        {hits.today_hits.toLocaleString()}/{hits.total_hits.toLocaleString()}
      </span>
    </a>
  );
}
