import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  href?: string;
}

export function SectionHeader({ title, href }: SectionHeaderProps) {
  const headingClasses =
    "mb-4 mt-16 font-heading text-lg font-bold uppercase tracking-wide";

  if (href) {
    return (
      <Link href={href} className={`${headingClasses} block hover:underline`}>
        <h2>{title}</h2>
      </Link>
    );
  }

  return <h2 className={headingClasses}>{title}</h2>;
}
