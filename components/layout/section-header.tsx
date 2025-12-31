interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h2 className="mb-4 mt-16 font-heading text-lg font-bold uppercase tracking-wide">
      {title}
    </h2>
  );
}
