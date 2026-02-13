import type { SummaryEntry } from "@/lib/types/resume";

interface SummaryItemProps {
  item: SummaryEntry;
}

export function SummaryItem({ item }: SummaryItemProps) {
  return (
    <div
      className="text-sm text-justify leading-relaxed"
      dangerouslySetInnerHTML={{ __html: item.content }}
    />
  );
}
