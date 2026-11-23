import type { MetadataRoute } from "next";
import { getResumeData } from "@/lib/loader";
import { hasSectionPage } from "@/lib/utils";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const resumeData = await getResumeData();

  const entries: MetadataRoute.Sitemap = [
    {
      url: resumeData.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  resumeData.sections.filter(hasSectionPage).forEach((section) => {
    entries.push({
      url: `${resumeData.url}/section/${section.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return entries;
}
