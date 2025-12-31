// Contact types
export interface ContactLink {
  type: "email" | "github" | "linkedin";
  url: string;
  label: string;
}

export interface ContactInfo {
  links: ContactLink[];
}

// Detail type (shared across entry types)
export interface Detail {
  title: string;
  description: string;
  style?: "list" | "bullet"; // defaults to "bullet"
}

// Showcase link type
export interface ShowcaseLink {
  type: "github" | "demo" | "website" | "docs";
  url: string;
}

// Base entry type with common fields
export interface BaseSectionEntry {
  slug: string;
  title: string;
}

// Entry types extending base
export interface TimelineEntry extends BaseSectionEntry {
  type: "timeline";
  subtitle: string;
  period: string;
  location?: string;
  details?: Detail[];
  link?: string;
}

export interface ListEntry extends BaseSectionEntry {
  type: "list";
  subtitle: string;
}

export interface ShowcaseEntry extends BaseSectionEntry {
  type: "showcase";
  tagline: string;
  images: string[];
  link: string;
  description: string;
  technologies?: string[];
  status?: "active" | "archived" | "development";
  featured?: boolean;
  links?: ShowcaseLink[];
}

// Union of all entry types
export type SectionEntry = TimelineEntry | ListEntry | ShowcaseEntry;

// Single section type
export interface Section {
  id: string;
  title: string;
  detailsLabel?: string;
  limit?: number; // Limit items shown on home page
  items: SectionEntry[];
}

// Site metadata
export interface SiteMeta {
  keywords: string[];
}

// Root resume type
export interface Resume {
  name: string;
  title?: string;
  about?: string;
  location?: string;
  url?: string;
  image?: string;
  meta: SiteMeta;
  contact: ContactInfo;
  sections: Section[];
}
