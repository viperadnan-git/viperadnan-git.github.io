import type { ListEntry } from "@/lib/types/resume";

interface ListItemProps {
  item: ListEntry;
}

export function ListItem({ item }: ListItemProps) {
  return (
    <div className="flex flex-col gap-1 text-sm sm:flex-row sm:gap-2">
      <span className="font-bold sm:min-w-[140px] sm:shrink-0">
        {item.title}
      </span>
      <span className="sm:flex-1">{item.subtitle}</span>
    </div>
  );
}
