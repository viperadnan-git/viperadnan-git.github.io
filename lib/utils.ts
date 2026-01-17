import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ShowcaseImage, ContactLink } from "./types/resume";

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

export function getImageTitle(
  image: ShowcaseImage,
  fallback: string,
  index: number,
): string {
  return image.title || `${fallback} - Image ${index + 1}`;
}
