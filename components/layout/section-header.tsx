import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  id?: string;
  href?: string;
}

export function SectionHeader({ title, id, href }: SectionHeaderProps) {
  const anchor = id ?? title.toLowerCase().replace(/\s+/g, "-");
  const headingClasses =
    "mb-4 mt-16 font-heading text-lg font-bold uppercase tracking-wide scroll-mt-8";

  if (href) {
    return (
      <Link href={href} className={`${headingClasses} block hover:underline`}>
        <h2 id={anchor}>{title}</h2>
      </Link>
    );
  }

  return (
    <h2 id={anchor} className={headingClasses}>
      {title}
    </h2>
  );
}
