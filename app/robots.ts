import type { MetadataRoute } from "next";
import { getResumeData } from "@/lib/loader";

export const dynamic = "force-static";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { url } = await getResumeData();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}
