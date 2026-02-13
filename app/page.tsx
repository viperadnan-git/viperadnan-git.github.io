import { SectionHeader } from "@/components/layout/section-header";
import { ContactHeader } from "@/components/resume/contact-header";
import { Section } from "@/components/resume/section";
import { getResumeData } from "@/lib/loader";

export default async function Home() {
  const resumeData = await getResumeData();

  return (
    <>
      <ContactHeader
        name={resumeData.name}
        bio={resumeData.bio}
        contact={resumeData.contact}
      />

      {resumeData.sections.map((section) => {
        const viewAllHref = section.limit
          ? `/section/${section.id}`
          : undefined;
        return (
          <div key={section.id}>
            <SectionHeader
              title={section.title}
              id={section.id}
              href={viewAllHref}
            />
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
