import { z } from "zod/v4";

// Schema version for compatibility checks
export const RESUME_SCHEMA_VERSION = "1.0.0";

// Contact types
export const ContactLinkSchema = z.object({
  type: z.enum(["email", "github", "linkedin"]),
  url: z.string(),
  label: z.string(),
});

export const ContactInfoSchema = z.object({
  links: z.array(ContactLinkSchema),
});

// Detail type (shared across entry types)
export const DetailSchema = z.object({
  title: z.string(),
  description: z.string(),
  style: z.enum(["list", "bullet"]).optional(),
});

// Showcase link type
export const ShowcaseLinkSchema = z.object({
  type: z.enum(["github", "demo", "website", "docs"]),
  url: z.string(),
});

// Base entry fields (common to all entry types)
const baseEntryFields = {
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
};

// Entry types (discriminated union)
export const TimelineEntrySchema = z.object({
  ...baseEntryFields,
  type: z.literal("timeline"),
  period: z.string(),
  location: z.string().optional(),
  details: z.array(DetailSchema).optional(),
  link: z.string().optional(),
});

export const ListEntrySchema = z.object({
  ...baseEntryFields,
  type: z.literal("list"),
});

export const ShowcaseEntrySchema = z.object({
  ...baseEntryFields,
  type: z.literal("showcase"),
  images: z.array(z.string()),
  link: z.string(),
  description: z.string(),
  technologies: z.array(z.string()).optional(),
  status: z.enum(["active", "archived", "development"]).optional(),
  featured: z.boolean().optional(),
  links: z.array(ShowcaseLinkSchema).optional(),
});

// Union of all entry types
export const SectionEntrySchema = z.discriminatedUnion("type", [
  TimelineEntrySchema,
  ListEntrySchema,
  ShowcaseEntrySchema,
]);

// Section type
export const SectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  detailsLabel: z.string().optional(),
  limit: z.number().optional(),
  items: z.array(SectionEntrySchema),
});

// Site metadata
export const SiteMetaSchema = z.object({
  keywords: z.array(z.string()),
  counter: z.boolean().optional(),
});

// Root resume type
export const ResumeSchema = z.object({
  version: z.string(),
  name: z.string(),
  title: z.string().optional(),
  about: z.string().optional(),
  location: z.string().optional(),
  url: z.string().optional(),
  image: z.string().optional(),
  meta: SiteMetaSchema,
  contact: ContactInfoSchema,
  sections: z.array(SectionSchema),
});

// Infer TypeScript types from Zod schemas
export type ContactLink = z.infer<typeof ContactLinkSchema>;
export type ContactInfo = z.infer<typeof ContactInfoSchema>;
export type Detail = z.infer<typeof DetailSchema>;
export type ShowcaseLink = z.infer<typeof ShowcaseLinkSchema>;
export type TimelineEntry = z.infer<typeof TimelineEntrySchema>;
export type ListEntry = z.infer<typeof ListEntrySchema>;
export type ShowcaseEntry = z.infer<typeof ShowcaseEntrySchema>;
export type SectionEntry = z.infer<typeof SectionEntrySchema>;
export type Section = z.infer<typeof SectionSchema>;
export type SiteMeta = z.infer<typeof SiteMetaSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

// Type guard helpers (preserved for backwards compatibility)
export type BaseSectionEntry = {
  slug: string;
  title: string;
  subtitle: string;
};
