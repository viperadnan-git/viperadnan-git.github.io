# Portfolio Project - Claude Context

## Project Overview
PDF-like resume portfolio **template** with interactive project showcases. Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui. Data-driven via JSON with Zod schema validation.

## Tech Stack
- **Package Manager**: Bun
- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS v4, shadcn/ui (New York style)
- **Animations**: Framer Motion (collapsibles only)
- **Icons**: Lucide React, React Icons (brands)
- **Theme**: next-themes (system default, toggle available)
- **Validation**: Zod v4 (build-time JSON validation)

## Project Structure
```
app/
├── layout.tsx          # Root layout with ThemeProvider, DocumentContainer, ThemeToggle
├── page.tsx            # Home page with all resume sections
├── not-found.tsx       # 404 page with BackButton and centered content
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
│   ├── email-link.tsx          # Email link with copy functionality
│   └── visitor-counter.tsx     # Visitor counter using hitscounter.dev API
├── icons/
│   └── brand-icons.tsx         # GitHub, LinkedIn icons
├── providers/
│   └── theme-provider.tsx      # next-themes provider
└── ui/                         # shadcn components

lib/
├── data/
│   ├── resume.json     # Resume data (JSON, validated at build time)
│   └── loader.ts       # Async data loader with Zod validation
├── types/
│   └── resume.ts       # Zod schemas + inferred TypeScript types
└── utils.ts            # cn() utility

scripts/
└── generate-schema.ts  # Generates JSON schema from Zod types

public/
└── resume.schema.json  # Generated JSON schema for external users
```

## Data Loading System

### JSON-Based Configuration
Resume data is loaded from JSON at build time with validation:

1. **Data Source Priority**:
   - If `RESUME_DATA_URL` env variable is set → fetch from URL
   - Otherwise → use local `lib/data/resume.json`

2. **Validation**: Zod validates data against schema at build time
3. **Version Check**: Major version must match `RESUME_SCHEMA_VERSION`

### Environment Variables
```bash
# Optional: Fetch resume JSON from external URL
RESUME_DATA_URL=https://example.com/resume.json
```

### Data Loader Usage
```typescript
import { getResumeData } from "@/lib/data/loader";

// In async server components
const resumeData = await getResumeData();
```

## Type System

Types are defined as Zod schemas in `lib/types/resume.ts`:

```typescript
// Schemas define validation rules
export const ResumeSchema = z.object({
  version: z.string(),
  name: z.string(),
  // ...
});

// Types are inferred from schemas
export type Resume = z.infer<typeof ResumeSchema>;
```

### Key Types
- `Resume` - Root type with version, name, meta, contact, sections
- `Section` - Contains id, title, limit?, items[]
- `SectionEntry` - Discriminated union (type: "timeline" | "list" | "showcase")
- `TimelineEntry` - For experience, education, certifications
- `ListEntry` - For skills
- `ShowcaseEntry` - For projects

### ShowcaseEntry Fields
- `slug`, `title`, `subtitle`, `link`, `description` - required
- `images` - required string array (supports multiple images with slideshow)
- `technologies` - optional string array (shows max 3, all when expanded)
- `status` - optional: "active" | "archived" | "development"
- `featured` - optional boolean (shows label)
- `links` - optional array of `{ type: "github"|"demo"|"website"|"docs", url }`

### SiteMeta Fields
- `keywords` - required string array (SEO keywords)
- `counter` - optional boolean (enables visitor counter in footer)

## Schema Generation

JSON schema is auto-generated from Zod types:

```bash
bun run schema:generate  # Generates public/resume.schema.json
```

Schema auto-updates on commit via `pre-commit.sh` when `lib/types/resume.ts` changes.

## Features

### Section Limiting & View All
- Sections can have a `limit` field to show only N items on home page
- When limited, a "View all" link appears at section bottom
- Links to `/section/[id]` which shows all items without limits
- **Only sections with `limit` get dedicated pages** - sections without `limit` don't generate `/section/[id]` routes

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
- Data-driven rendering via `getResumeData()` async loader
- Entry-level type discrimination (`entry.type` determines rendering)
- Use shadcn/ui components, customize minimally
- Icons: lucide-react for UI, react-icons/fa for brands
- Use `cn()` utility for conditional class merging

## Page Layout Conventions
- All pages render inside `DocumentContainer` (from root layout)
- **Home page**: No BackButton, starts with ContactHeader
- **Sub-pages**: Always start with `<BackButton />`, use Fragment wrapper (`<>...</>`)

## Build & Deploy
```bash
bun dev      # Development
bun build    # Schema generation + static export to out/
```
Configured for GitHub Pages deployment (output: "export").

## Template Usage

To use this as a template:

1. Fork/clone the repository
2. Edit `lib/data/resume.json` with your data (use `public/resume.schema.json` for validation)
3. Or set `RESUME_DATA_URL` to point to your hosted JSON file
4. Run `bun build` to generate static site

## Important
- **Keep CLAUDE.md updated** when making structural changes
- Always use Bun (not npm/yarn)
- Maintain PDF-like simplicity - avoid modern/flashy UI patterns
- Showcase image features (lightbox, slideshow) are intentional enhancements
- Zod is a dev dependency - only used at build time, not in static output
