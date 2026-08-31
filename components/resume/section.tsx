import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
  isLast,
  showTimeline,
}: {
  entry: SectionEntry;
  detailsLabel?: string;
  isLast?: boolean;
  showTimeline?: boolean;
}) {
  switch (entry.type) {
    case "showcase":
      return <ShowcaseItem item={entry} />;

    case "list":
      return <ListItem item={entry} />;

    case "summary":
      return <SummaryItem item={entry} />;

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
          isLast={isLast}
          showTimeline={showTimeline}
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
      <div className={section.timeline ? "" : "divide-y divide-border"}>
        {items.map((entry, index) => (
          <EntryRenderer
            key={entry.slug}
            entry={entry}
            detailsLabel={section.detailsLabel}
            isLast={index === items.length - 1}
            showTimeline={section.timeline}
          />
        ))}
      </div>
      {viewAllButton}
    </div>
  );
}
