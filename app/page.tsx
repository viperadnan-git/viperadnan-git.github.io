import { ContactHeader, ContactLine } from "@/components/resume/contact-header";
import { Section } from "@/components/resume/section";
import { SectionHeader } from "@/components/resume/section-header";
import { getResumeData } from "@/lib/loader";
import { cn, hasSectionPage } from "@/lib/utils";

export default async function Home() {
  const resumeData = await getResumeData();
  // an about text that opens the page reads as the intro, not a section
  const hasIntro =
    resumeData.sections[0]?.items.every((item) => item.type === "summary") ??
    false;
  const contactLine = (
    <ContactLine
      contact={resumeData.contact}
      location={resumeData.location}
      className="mt-4 max-w-[60ch] text-muted-foreground"
    />
  );

  return (
    <>
      <ContactHeader name={resumeData.name} title={resumeData.title} />

      {!hasIntro && <section className="enter mt-14">{contactLine}</section>}

      {resumeData.sections.map((section, i) => {
        const viewAllHref = hasSectionPage(section)
          ? `/section/${section.id}`
          : undefined;
        const isIntro = i === 0 && hasIntro;
        return (
          <section
            key={section.id}
            aria-labelledby={isIntro ? undefined : section.id}
            className={cn(
              i < 2 && "enter",
              isIntro ? "mt-10 md:mt-14" : "mt-16 md:mt-24",
            )}
            style={{ "--i": i + 1 } as React.CSSProperties}
          >
            {!isIntro && (
              <SectionHeader title={section.title} id={section.id} />
            )}
            <Section
              section={section}
              limit={section.limit}
              viewAllHref={viewAllHref}
            />
            {isIntro && contactLine}
          </section>
        );
      })}
    </>
  );
}
