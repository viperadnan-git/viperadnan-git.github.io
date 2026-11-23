interface SectionHeaderProps {
  title: string;
  id?: string;
}

export function SectionHeader({ title, id }: SectionHeaderProps) {
  const anchor = id ?? title.toLowerCase().replace(/\s+/g, "-");

  return (
    <h2 id={anchor} className="mb-7 scroll-mt-8 font-medium">
      {title}
    </h2>
  );
}
