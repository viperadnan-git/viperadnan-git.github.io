import { ExternalLink } from "@/components/shared/external-link";
import { Button } from "@/components/ui/button";
import type { ShowcaseEntry, ShowcaseLink } from "@/lib/types/resume";
import { cn, displayHost } from "@/lib/utils";
import { Disclosure } from "./disclosure";
import { ShowcaseImage } from "./showcase-image";

interface ShowcaseItemProps {
  item: ShowcaseEntry;
}

const linkLabels: Record<ShowcaseLink["type"], string> = {
  github: "GitHub",
  demo: "Demo",
  website: "Website",
  docs: "Docs",
};

// active is the default state, so only the exceptions are shown
const statusLabels: Partial<
  Record<NonNullable<ShowcaseEntry["status"]>, string>
> = {
  archived: "Archived",
  development: "In development",
};

export function ShowcaseItem({
  item,
  level,
}: ShowcaseItemProps & { level?: 2 | 3 }) {
  const extra = (item.links ?? []).filter((l) => l.url !== item.link);
  const images = item.images ?? [];
  const hasImages = images.length > 0;

  return (
    <Disclosure
      level={level}
      title={item.title}
      meta={item.status && statusLabels[item.status]}
      subtitle={item.subtitle}
    >
      {hasImages && <ShowcaseImage images={images} alt={item.title} />}
      <p className={cn("text-muted-foreground", hasImages && "mt-4")}>
        {item.description}
      </p>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        <Button asChild variant="underline" size="text">
          <ExternalLink href={item.link}>{displayHost(item.link)}</ExternalLink>
        </Button>
        {extra.map((link) => (
          <Button
            key={`${link.type}-${link.url}`}
            asChild
            variant="underline"
            size="text"
          >
            <ExternalLink href={link.url}>{linkLabels[link.type]}</ExternalLink>
          </Button>
        ))}
      </p>
    </Disclosure>
  );
}
