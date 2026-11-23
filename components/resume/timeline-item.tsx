import { ExternalLink } from "@/components/shared/external-link";
import { Button } from "@/components/ui/button";
import { displayHost } from "@/lib/utils";
import { Disclosure } from "./disclosure";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  link?: string;
  location?: string;
  period: string;
  details?: React.ReactNode;
  level?: 2 | 3;
}

/** "May 2026 - Present" → "2026 – now", "Jun 2024 – Jul 2024" → "2024", "2019-2022" → "2019 – 2022" */
function shortPeriod(period: string) {
  const years = period.match(/\d{4}/g);
  if (!years) return period;
  const start = years[0];
  const end = /present|now|current/i.test(period) ? "now" : years.at(-1);
  return start === end ? start : `${start} – ${end}`;
}

export function TimelineItem({
  title,
  subtitle,
  link,
  location,
  period,
  details,
  level,
}: TimelineItemProps) {
  const hasPanel = Boolean(details || link || location);

  return (
    <Disclosure
      level={level}
      title={title}
      meta={shortPeriod(period)}
      subtitle={subtitle}
    >
      {hasPanel && (
        <>
          <p className="text-muted-foreground">
            {[location, period].filter(Boolean).join(", ")}
          </p>
          {details && (
            <div className="mt-3 text-muted-foreground">{details}</div>
          )}
          {link && (
            <p className="mt-3">
              <Button asChild variant="underline" size="text">
                <ExternalLink href={link}>{displayHost(link)}</ExternalLink>
              </Button>
            </p>
          )}
        </>
      )}
    </Disclosure>
  );
}
