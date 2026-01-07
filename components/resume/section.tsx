import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TimelineItem } from "./timeline-item";
import { ShowcaseItem } from "./showcase-item";
import type {
  Section as SectionType,
  SectionEntry,
  Detail,
} from "@/lib/types/resume";

interface SectionProps {
  section: SectionType;
  limit?: number;
  viewAllHref?: string;
}

function DetailsList({ details }: { details: Detail[] | undefined }) {
  if (!details) return null;
  return (
    <div className="space-y-1">
      {details.map((detail) =>
        detail.style === "list" ? (
          <p key={detail.title}>
            <span className="font-bold">{detail.title}:</span>{" "}
            {detail.description}
          </p>
        ) : (
          <ul key={detail.title} className="list-inside list-disc">
            <li>
              <span className="font-bold">{detail.title}:</span>{" "}
              {detail.description}
            </li>
          </ul>
        ),
      )}
    </div>
  );
}

function EntryRenderer({
  entry,
  detailsLabel,
}: {
  entry: SectionEntry;
  detailsLabel?: string;
}) {
  switch (entry.type) {
    case "showcase":
      return <ShowcaseItem item={entry} />;

    case "list":
      return (
        <div className="flex flex-wrap gap-x-2 text-sm">
          <span className="font-bold">{entry.title}:</span>
          <span>{entry.subtitle}</span>
        </div>
      );

    case "timeline":
      return (
        <TimelineItem
          title={entry.title}
          subtitle={entry.subtitle}
          link={entry.link}
          location={entry.location ?? ""}
          period={entry.period}
          details={
            entry.details ? <DetailsList details={entry.details} /> : undefined
          }
          detailsLabel={detailsLabel}
        />
      );
  }
}

export function Section({ section, limit, viewAllHref }: SectionProps) {
  const items = limit ? section.items.slice(0, limit) : section.items;
  const remainingCount = limit ? section.items.length - limit : 0;

  // Check if all items are list type for compact rendering
  const allList = items.every((item) => item.type === "list");

  const viewAllButton = viewAllHref && (
    <div className="pt-4">
      <Link
        href={viewAllHref}
        className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
      >
        View all
        {remainingCount > 0 && (
          <span className="text-muted-foreground">({remainingCount} more)</span>
        )}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );

  if (allList) {
    return (
      <div>
        <div className="space-y-2">
          {items.map((entry) => (
            <EntryRenderer
              key={entry.slug}
              entry={entry}
              detailsLabel={section.detailsLabel}
            />
          ))}
        </div>
        {viewAllButton}
      </div>
    );
  }

  return (
    <div>
      <div className="divide-y divide-border">
        {items.map((entry) => (
          <EntryRenderer
            key={entry.slug}
            entry={entry}
            detailsLabel={section.detailsLabel}
          />
        ))}
      </div>
      {viewAllButton}
    </div>
  );
}
