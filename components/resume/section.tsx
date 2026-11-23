import Link from "next/link";
import { Button } from "@/components/ui/button";
import type {
  Detail,
  SectionEntry,
  Section as SectionType,
} from "@/lib/types/resume";
import { ListItem } from "./list-item";
import { ShowcaseItem } from "./showcase-item";
import { SummaryItem } from "./summary-item";
import { TimelineItem } from "./timeline-item";

interface SectionProps {
  section: SectionType;
  limit?: number;
  viewAllHref?: string;
  /** heading level of the rows: 2 when the section title is the page h1 */
  level?: 2 | 3;
}

function DetailsList({ details }: { details: Detail[] }) {
  const bullets = details.filter((d) => d.style !== "list");
  const lines = details.filter((d) => d.style === "list");
  return (
    <>
      {bullets.length > 0 && (
        <ul className="list-disc space-y-1 pl-4 marker:text-faint">
          {bullets.map((d) => (
            <li key={d.title}>
              <span className="text-foreground">{d.title}.</span>{" "}
              {d.description}
            </li>
          ))}
        </ul>
      )}
      {lines.map((d) => (
        <p key={d.title}>
          <span className="text-foreground">{d.title}:</span> {d.description}
        </p>
      ))}
    </>
  );
}

function EntryRenderer({
  entry,
  level,
}: {
  entry: SectionEntry;
  level?: 2 | 3;
}) {
  switch (entry.type) {
    case "showcase":
      return <ShowcaseItem item={entry} level={level} />;
    case "list":
      return <ListItem item={entry} />;
    case "summary":
      return <SummaryItem item={entry} />;
    case "timeline":
      return (
        <TimelineItem
          level={level}
          title={entry.title}
          subtitle={entry.subtitle}
          link={entry.link}
          location={entry.location}
          period={entry.period}
          details={
            entry.details ? <DetailsList details={entry.details} /> : undefined
          }
        />
      );
  }
}

export function Section({ section, limit, viewAllHref, level }: SectionProps) {
  const items = limit ? section.items.slice(0, limit) : section.items;
  const isRows = items.some(
    (i) => i.type === "showcase" || i.type === "timeline",
  );

  const entries = items.map((entry) => (
    <EntryRenderer key={entry.slug} entry={entry} level={level} />
  ));

  return (
    <div>
      {/* rows carry their own py-3; -my-3 keeps the list flush with the heading rhythm */}
      <div className={isRows ? "-my-3" : undefined}>{entries}</div>
      {viewAllHref && section.items.length > items.length && (
        <Button
          asChild
          variant="quiet"
          size="text"
          className="group mt-6 gap-1.5"
        >
          <Link href={viewAllHref}>
            See all {section.items.length}
            <span className="sr-only"> {section.title.toLowerCase()}</span>
            {/* nudges toward the destination on hover/focus */}
            <span
              aria-hidden="true"
              className="inline-block transition-[translate] duration-200 ease-(--ease-out) group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </Button>
      )}
    </div>
  );
}
