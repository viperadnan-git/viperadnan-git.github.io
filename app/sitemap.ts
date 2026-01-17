import type { MetadataRoute } from "next";
import { getResumeData } from "@/lib/loader";

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

  // Add section pages (only those with limits)
  resumeData.sections
    .filter((section) => section.limit !== undefined)
    .forEach((section) => {
      entries.push({
        url: `${resumeData.url}/section/${section.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });

  return entries;
}
