import { SectionHeader } from "@/components/layout/section-header";
import { ContactHeader } from "@/components/resume/contact-header";
import { Section } from "@/components/resume/section";
import { resumeData } from "@/lib/data/resume-data";

export default function Home() {
  return (
    <>
      <ContactHeader name={resumeData.name} contact={resumeData.contact} />

      {resumeData.sections.map((section) => {
        const viewAllHref = section.limit
          ? `/section/${section.id}`
          : undefined;
        return (
          <div key={section.id}>
            <SectionHeader title={section.title} href={viewAllHref} />
            <Section
              section={section}
              limit={section.limit}
              viewAllHref={viewAllHref}
            />
          </div>
        );
      })}
    </>
  );
}
