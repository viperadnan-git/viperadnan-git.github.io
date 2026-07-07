import type { MetadataRoute } from "next";
import { getResumeData } from "@/lib/loader";

export const dynamic = "force-static";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const resume = await getResumeData();
  return {
    name: resume.name,
    short_name: resume.name,
    description: resume.about,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F2EC",
    theme_color: "#17160F",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", type: "image/svg+xml" },
    ],
  };
}
