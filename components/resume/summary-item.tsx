import type { SummaryEntry } from "@/lib/types/resume";

interface SummaryItemProps {
  item: SummaryEntry;
}

export function SummaryItem({ item }: SummaryItemProps) {
  return (
    <div
      className="text-xs sm:text-sm text-justify leading-relaxed"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized in lib/loader.ts
      dangerouslySetInnerHTML={{ __html: item.content }}
    />
  );
}
