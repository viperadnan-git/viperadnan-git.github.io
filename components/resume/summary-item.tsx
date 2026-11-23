import type { SummaryEntry } from "@/lib/types/resume";

interface SummaryItemProps {
  item: SummaryEntry;
}

export function SummaryItem({ item }: SummaryItemProps) {
  return (
    <div
      className="summary max-w-[60ch] text-muted-foreground"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized in lib/loader.ts
      dangerouslySetInnerHTML={{ __html: item.content }}
    />
  );
}
