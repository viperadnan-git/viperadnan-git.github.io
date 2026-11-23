import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Section } from "@/components/resume/section";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/lib/loader";
import { hasSectionPage, listSeparator } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const resumeData = await getResumeData();
  return resumeData.sections.filter(hasSectionPage).map((section) => ({
    id: section.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const resumeData = await getResumeData();
  const section = resumeData.sections.find((s) => s.id === id);

  if (!section) {
    return { title: "Not Found" };
  }

  const all = section.items.flatMap((item) =>
    item.type === "summary" ? [] : [item.title],
  );
  const names = all.slice(0, 6);
  const title = `${section.title} - ${resumeData.name}`;
  const images = resumeData.image ? [resumeData.image] : undefined;
  const list = names.length
    ? `: ${names.join(", ")}${all.length > names.length ? " and more" : ""}`
    : "";
  const description = `${section.title} by ${resumeData.name}${list}.`;

  return {
    title,
    description,
    alternates: { canonical: `/section/${id}` },
    // nested objects replace the layout's, so the image has to come along
    openGraph: {
      title,
      description,
      url: `/section/${id}`,
      type: "website",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { id } = await params;
  const resumeData = await getResumeData();
  const section = resumeData.sections.find((s) => s.id === id);

  if (!section) {
    notFound();
  }

  const others = resumeData.sections.filter(
    (s) => hasSectionPage(s) && s.id !== section.id,
  );

  return (
    <>
      {/* breadcrumb + h1 + count on one line: sub-page identity without a second header */}
      <header className="enter mb-10 flex items-baseline gap-2 md:mb-12">
        <nav aria-label="Breadcrumb">
          <Button asChild variant="quiet" size="text">
            <Link href="/">{resumeData.name}</Link>
          </Button>
        </nav>
        <span aria-hidden="true" className="text-faint">
          /
        </span>
        <h1 id={section.id} className="font-medium">
          {section.title}
        </h1>
        <p className="ml-auto text-muted-foreground tabular-nums">
          {section.items.length}
          <span className="sr-only"> items</span>
        </p>
      </header>
      <section aria-labelledby={section.id} className="enter [--i:1]">
        <Section section={section} level={2} />
      </section>
      {others.length > 0 && (
        <nav
          aria-label="More sections"
          className="mt-16 text-muted-foreground md:mt-24"
        >
          Also see{" "}
          {others.map((s, i) => (
            <Fragment key={s.id}>
              {listSeparator(i, others.length)}
              <Button asChild variant="underline" size="text">
                <Link href={`/section/${s.id}`}>{s.title}</Link>
              </Button>
            </Fragment>
          ))}
          .
        </nav>
      )}
    </>
  );
}
