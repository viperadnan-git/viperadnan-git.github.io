import { notFound } from "next/navigation";
import { BackButton } from "@/components/layout/back-button";
import { SectionHeader } from "@/components/layout/section-header";
import { FullSection } from "@/components/resume/full-section";
import { getResumeData } from "@/lib/loader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const resumeData = await getResumeData();
  // Only generate pages for sections with a limit (those that show "View all" on home page)
  return resumeData.sections
    .filter((section) => section.limit !== undefined)
    .map((section) => ({
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

  return {
    title: `${section.title} - ${resumeData.name}`,
    description: `${section.title} section of ${resumeData.name}'s portfolio`,
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { id } = await params;
  const resumeData = await getResumeData();
  const section = resumeData.sections.find((s) => s.id === id);

  if (!section) {
    notFound();
  }

  return (
    <>
      <BackButton />
      <SectionHeader title={section.title} />
      <FullSection section={section} />
    </>
  );
}
