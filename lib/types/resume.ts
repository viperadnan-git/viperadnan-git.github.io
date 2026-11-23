import { z } from "zod/v4";

// the site origin: metadata, canonical URLs and the sitemap are built on it
const webUrl = z.url({ protocol: /^https?$/ });

// Schema version for compatibility checks
export const RESUME_SCHEMA_VERSION = "1.1.0";

// Contact types
export const ContactLinkSchema = z.object({
  type: z.enum([
    "email",
    "github",
    "linkedin",
    "twitter",
    "x",
    "instagram",
    "facebook",
    "telegram",
    "custom",
  ]),
  value: z.string(),
  label: z.string().optional(),
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

// Showcase image type
export const ShowcaseImageSchema = z.object({
  url: z.string(),
  title: z.string().optional(),
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
  /** a full http(s) URL shows as host/path; anything else as written */
  link: z.string().optional(),
});

export const ListEntrySchema = z.object({
  ...baseEntryFields,
  type: z.literal("list"),
});

export const SummaryEntrySchema = z.object({
  slug: z.string(),
  type: z.literal("summary"),
  content: z.string(),
});

export const ShowcaseEntrySchema = z.object({
  ...baseEntryFields,
  type: z.literal("showcase"),
  /** none: the row opens straight to its description */
  images: z.array(ShowcaseImageSchema).optional(),
  /** a full http(s) URL shows as host/path; anything else as written */
  link: z.string(),
  description: z.string(),
  status: z.enum(["active", "archived", "development"]).optional(),
  featured: z.boolean().optional(),
  links: z.array(ShowcaseLinkSchema).optional(),
});

// Union of all entry types
export const SectionEntrySchema = z.discriminatedUnion("type", [
  TimelineEntrySchema,
  ListEntrySchema,
  ShowcaseEntrySchema,
  SummaryEntrySchema,
]);

// Section type
export const SectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z
    .enum(["education", "experience", "project", "award", "custom"])
    .optional(),
  limit: z.number().optional(),
  items: z.array(SectionEntrySchema),
});

// Site metadata
export const SiteMetaSchema = z.object({
  keywords: z.array(z.string()),
  counter: z.boolean().optional(),
  legal: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
});

// Root resume type
export const ResumeSchema = z.object({
  version: z.string(),
  /** site origin; trailing slashes are dropped so paths can be appended */
  url: webUrl.transform((u) => u.replace(/\/+$/, "")),
  name: z.string(),
  username: z.string().optional(),
  honorificSuffix: z.string().optional(),
  title: z.string().optional(),
  about: z
    .string()
    .describe(
      "One or two sentences, ≤160 characters; used for search and social previews",
    )
    .optional(),
  location: z.string().optional(),
  nationality: z.string().optional(),
  gender: z.enum(["male", "female", "rather-not-say"]).optional(),
  languages: z.array(z.string()).optional(),
  image: z.string().optional(),
  meta: SiteMetaSchema,
  contact: ContactInfoSchema,
  sections: z.array(SectionSchema),
});

// Infer TypeScript types from Zod schemas
export type ContactLink = z.infer<typeof ContactLinkSchema>;
export type ContactInfo = z.infer<typeof ContactInfoSchema>;
export type Detail = z.infer<typeof DetailSchema>;
export type ShowcaseImage = z.infer<typeof ShowcaseImageSchema>;
export type ShowcaseLink = z.infer<typeof ShowcaseLinkSchema>;
export type TimelineEntry = z.infer<typeof TimelineEntrySchema>;
export type ListEntry = z.infer<typeof ListEntrySchema>;
export type ShowcaseEntry = z.infer<typeof ShowcaseEntrySchema>;
export type SummaryEntry = z.infer<typeof SummaryEntrySchema>;
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
