import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ContactLink, ShowcaseImage } from "./types/resume";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getContactUrl(link: ContactLink): string {
  const { type, value } = link;

  switch (type) {
    case "email":
      return `mailto:${value}`;
    case "github":
      return `https://github.com/${value}`;
    case "linkedin":
      return `https://linkedin.com/in/${value}`;
    case "twitter":
    case "x":
      return `https://x.com/${value}`;
    case "instagram":
      return `https://instagram.com/${value}`;
    case "facebook":
      return `https://facebook.com/${value}`;
    case "custom":
      return value;
    default:
      return "#";
  }
}

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

const ID = /^[\w-]{11}$/;

export function getYouTubeId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const { hostname, pathname, searchParams } = parsed;
  const id =
    hostname === "youtu.be"
      ? pathname.slice(1)
      : YOUTUBE_HOSTS.has(hostname)
        ? (pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/)?.[1] ??
          searchParams.get("v"))
        : null;

  // "videoseries" is a playlist embed, not a video id — and it happens to be 11 chars
  return id && id !== "videoseries" && ID.test(id) ? id : null;
}

export function getImageSrc(image: ShowcaseImage): string {
  const id = getYouTubeId(image.url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : image.url;
}

export function getImageTitle(
  image: ShowcaseImage,
  fallback: string,
  index: number,
): string {
  return image.title || `${fallback} - Image ${index + 1}`;
}
