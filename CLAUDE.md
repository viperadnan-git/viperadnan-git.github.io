# Portfolio Project - Claude Context

## Project Overview
PDF-like resume portfolio website with interactive project showcases. Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Tech Stack
- **Package Manager**: Bun
- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS v4, shadcn/ui (New York style)
- **Animations**: Framer Motion (collapsibles only)
- **Icons**: Lucide React, React Icons (brands)
- **Theme**: next-themes (system default, toggle available)

## Project Structure
```
app/
├── layout.tsx          # Root layout with ThemeProvider, DocumentContainer, ThemeToggle
├── page.tsx            # Home page with all resume sections
├── globals.css         # Global styles and theme variables
└── section/[id]/       # Dynamic section detail pages (View All)

components/
├── layout/
│   ├── document-container.tsx  # Main container with padding and footer
│   ├── section-header.tsx      # Section title styling
│   ├── back-button.tsx         # Navigation back button
│   └── theme-toggle.tsx        # Light/dark theme toggle
├── resume/
│   ├── contact-header.tsx      # Name and contact links
│   ├── section.tsx             # Section renderer with limit support
│   ├── section-item.tsx        # Timeline entry with collapsible details
│   ├── showcase-item.tsx       # Project showcase with expandable details
│   ├── showcase-image.tsx      # Image thumbnail with lightbox trigger
│   ├── image-slideshow.tsx     # Auto-rotating image carousel
│   ├── image-lightbox.tsx      # Fullscreen image viewer with navigation
│   ├── full-section.tsx        # Full section view (no limits/collapsibles)
│   └── email-link.tsx          # Email link with copy functionality
├── icons/
│   └── brand-icons.tsx         # GitHub, LinkedIn icons
├── providers/
│   └── theme-provider.tsx      # next-themes provider
└── ui/                         # shadcn components

lib/
├── data/resume-data.ts # All resume content (single source of truth)
├── types/resume.ts     # TypeScript interfaces
└── utils.ts            # cn() utility
```

## Type System

Single `Section` type with entry-level discrimination via `entry.type`:

```typescript
// Base entry type
interface BaseSectionEntry {
  slug: string;
  title: string;
}

// Entry types extending base (discriminated by `type` field)
type SectionEntry = TimelineEntry | ListEntry | ShowcaseEntry;

// TimelineEntry (type: "timeline") - experience, education, certifications
// Extends base + subtitle, period, location?, details?, link?

// ListEntry (type: "list") - skills
// Extends base + subtitle

// ShowcaseEntry (type: "showcase") - projects
// Extends base + tagline, images, link, description,
//   technologies?, status?, featured?, links?

// Single section type
interface Section {
  id: string;
  title: string;
  detailsLabel?: string;
  limit?: number;  // Limit items on home page, enables "View all" link
  items: SectionEntry[];
}
```

### ShowcaseEntry Fields
- `slug`, `title`, `tagline`, `link`, `description` - required
- `images` - required string array (supports multiple images with slideshow)
- `technologies` - optional string array (shows max 3, all when expanded)
- `status` - optional: "active" | "archived" | "development"
- `featured` - optional boolean (shows label)
- `links` - optional array of `{ type: "github"|"demo"|"website"|"docs", url }`

## Features

### Section Limiting & View All
- Sections can have a `limit` field to show only N items on home page
- When limited, a "View all" link appears at section bottom
- Links to `/section/[id]` which shows all items without limits

### Project Showcase
- **Thumbnail**: 16:9 aspect ratio, grayscale, rounded corners
- **Slideshow**: Auto-rotates every 3 seconds when multiple images
- **Lightbox**: Click thumbnail to open fullscreen viewer with navigation
- **Hover**: Shows expand icon overlay to indicate clickability

## Design Rules
- **Theme**: Black & white, minimalistic, PDF-like aesthetic
- **Layout**: Full-width, max-w-4xl container, generous vertical padding
- **Typography**: `font-heading` (Copernicus) for headings, `font-sans` for body
- **Animations**: Minimal - only collapsible expand/collapse with framer-motion
- **No shadows**: Flat design, no elevated elements
- **No navbar**: Clean document feel
- **Links**: External links open in new tab with subtle hover underline
- **Images**: Grayscale filter, rounded-md corners, aspect-video ratio
- **Responsive**: Mobile-first, stacks vertically on small screens

## Code Conventions
- Server components by default, "use client" only when needed
- Data-driven rendering from `lib/data/resume-data.ts`
- Entry-level type discrimination (`entry.type` determines rendering)
- Use shadcn/ui components, customize minimally
- Icons: lucide-react for UI, react-icons/fa for brands
- Use `cn()` utility for conditional class merging

## Build & Deploy
```bash
bun dev      # Development
bun build    # Static export to out/
```
Configured for GitHub Pages deployment (output: "export").

## Important
- **Keep CLAUDE.md updated** when making structural changes
- Always use Bun (not npm/yarn)
- Maintain PDF-like simplicity - avoid modern/flashy UI patterns
- Showcase image features (lightbox, slideshow) are intentional enhancements
