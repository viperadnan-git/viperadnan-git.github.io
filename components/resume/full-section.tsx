import { FaGithub, FaPlayCircle } from "react-icons/fa";
import { Globe, FileText } from "lucide-react";
import { ShowcaseImage } from "./showcase-image";
import { ListItem } from "./list-item";
import { SummaryItem } from "./summary-item";
import type {
  Section as SectionType,
  SectionEntry,
  Detail,
  ShowcaseEntry,
  TimelineEntry,
  ShowcaseLink,
} from "@/lib/types/resume";

interface FullSectionProps {
  section: SectionType;
}

const linkIcons: Record<
  ShowcaseLink["type"],
  React.ComponentType<{ className?: string }>
> = {
  github: FaGithub,
  demo: FaPlayCircle,
  website: Globe,
  docs: FileText,
};

const statusLabels: Record<NonNullable<ShowcaseEntry["status"]>, string> = {
  active: "Active",
  archived: "Archived",
  development: "In Development",
};

function DetailsList({ details }: { details: Detail[] }) {
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

function FullShowcaseEntry({ item }: { item: ShowcaseEntry }) {
  return (
    <div className="py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        {/* Content */}
        <div className="flex-1 min-w-0 order-2 md:order-1">
          <div className="flex flex-wrap items-center gap-2">
            {item.featured && (
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                Featured
              </span>
            )}
            <span className="font-heading font-bold">{item.title}</span>

            {item.status && (
              <span className="text-xs text-muted-foreground">
                ({statusLabels[item.status]})
              </span>
            )}
          </div>

          {/* Link row - default link + additional links */}
          <div className="flex items-center gap-2 mt-0.5">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              {item.link}
            </a>

            {/* Additional links */}
            {item.links && item.links.length > 0 && (
              <>
                <span className="text-muted-foreground">|</span>
                <div className="flex items-center gap-1">
                  {item.links.map((link, index) => {
                    const Icon = linkIcons[link.type];
                    return (
                      <a
                        key={`${link.type}-${index}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-muted-foreground hover:text-foreground"
                        title={
                          link.type.charAt(0).toUpperCase() + link.type.slice(1)
                        }
                      >
                        <Icon className="size-4" />
                      </a>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <p className="mt-1 text-sm">{item.subtitle}</p>

          {/* Description - always visible */}
          <p className="mt-2 text-sm text-muted-foreground">
            {item.description}
          </p>
        </div>

        {/* Thumbnail */}
        <ShowcaseImage
          images={item.images}
          alt={item.title}
          link={item.link}
          size="md"
        />
      </div>
    </div>
  );
}

function FullTimelineEntry({
  item,
  isLast,
  showTimeline,
}: {
  item: TimelineEntry;
  isLast: boolean;
  showTimeline: boolean;
}) {
  return (
    <div className={showTimeline ? "relative flex gap-4" : "py-8"}>
      {/* Timeline line and dot */}
      {showTimeline && (
        <div className="flex flex-col items-center">
          <div className="mt-2 size-2 shrink-0 rounded-full bg-foreground/30" />
          {!isLast && <div className="w-px grow bg-foreground/10" />}
        </div>
      )}

      {/* Content */}
      <div className={showTimeline ? "flex-1 pb-8" : ""}>
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
          <div>
            <span className="font-heading font-bold">{item.title}</span>
            {item.link && (
              <div className="mt-0.5">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  {item.link}
                </a>
              </div>
            )}
            <p className="text-sm text-muted-foreground">{item.subtitle}</p>
          </div>
          <div className="text-sm text-muted-foreground sm:text-right">
            {item.location && <p>{item.location}</p>}
            <p>{item.period}</p>
          </div>
        </div>

        {/* Details - always visible */}
        {item.details && item.details.length > 0 && (
          <div className="mt-2 text-sm font-medium">
            <DetailsList details={item.details} />
          </div>
        )}
      </div>
    </div>
  );
}

function FullEntryRenderer({
  entry,
  isLast,
  showTimeline,
}: {
  entry: SectionEntry;
  isLast: boolean;
  showTimeline: boolean;
}) {
  switch (entry.type) {
    case "showcase":
      return <FullShowcaseEntry item={entry} />;
    case "timeline":
      return (
        <FullTimelineEntry
          item={entry}
          isLast={isLast}
          showTimeline={showTimeline}
        />
      );
    case "list":
      return <ListItem item={entry} />;
    case "summary":
      return <SummaryItem item={entry} />;
  }
}

export function FullSection({ section }: FullSectionProps) {
  // Check if all items are list type for compact rendering
  const allList = section.items.every((item) => item.type === "list");

  if (allList) {
    return (
      <div className="space-y-8">
        {section.items.map((entry, index) => (
          <FullEntryRenderer
            key={entry.slug}
            entry={entry}
            isLast={index === section.items.length - 1}
            showTimeline={!!section.timeline}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={section.timeline ? "" : "divide-y divide-border"}>
      {section.items.map((entry, index) => (
        <FullEntryRenderer
          key={entry.slug}
          entry={entry}
          isLast={index === section.items.length - 1}
          showTimeline={!!section.timeline}
        />
      ))}
    </div>
  );
}
