import type { ListEntry } from "@/lib/types/resume";

interface ListItemProps {
  item: ListEntry;
}

export function ListItem({ item }: ListItemProps) {
  return (
    <div className="grid gap-x-4 py-1.5 sm:grid-cols-[120px_1fr] sm:py-[5px]">
      <span className="text-muted-foreground">{item.title}</span>
      <span>{item.subtitle}</span>
    </div>
  );
}
