<h1 align="center">viperadnan-git.github.io</h1>

<p align="center">
  A minimal, PDF-like resume portfolio template with JSON-based configuration
</p>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/github/package-json/dependency-version/viperadnan-git/viperadnan-git.github.io/next?logo=next.js&logoColor=white&label=Next.js&color=black" alt="Next.js" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/github/package-json/dependency-version/viperadnan-git/viperadnan-git.github.io/dev/typescript?logo=typescript&logoColor=white&label=TypeScript&color=3178C6" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/github/package-json/dependency-version/viperadnan-git/viperadnan-git.github.io/dev/tailwindcss?logo=tailwind-css&logoColor=white&label=Tailwind&color=06B6D4" alt="Tailwind CSS" /></a>
  <a href="https://github.com/viperadnan-git/viperadnan-git.github.io/actions/workflows/deploy.yml"><img src="https://img.shields.io/github/actions/workflow/status/viperadnan-git/viperadnan-git.github.io/deploy.yml?logo=github&label=Deploy" alt="Deploy" /></a>
  <a href="https://github.com/viperadnan-git/viperadnan-git.github.io/blob/main/LICENSE"><img src="https://img.shields.io/github/license/viperadnan-git/viperadnan-git.github.io?color=blue" alt="License" /></a>
  <a href="https://viperadnan.com"><img src="https://img.shields.io/website?url=https%3A%2F%2Fviperadnan.com&label=Demo&color=brightgreen" alt="Live Demo" /></a>
</p>

---
![banner](https://github.com/user-attachments/assets/ed820e50-baa6-4482-86c7-7fdcfd2f2d24)
---

## Features

- **JSON-Driven Content** — Edit a single JSON file to update your entire portfolio
- **Schema Validation** — Zod validates your data at build time with helpful error messages
- **Remote Data Support** — Fetch your resume JSON from any URL via environment variable
- **Static Export** — Generates pure HTML/CSS/JS, deploy anywhere (GitHub Pages, Vercel, Netlify)
- **Dark/Light Theme** — System-aware theme with manual toggle
- **PDF-Like Design** — Clean, minimal aesthetic that looks professional
- **Responsive** — Mobile-first design that works on all devices
- **Project Showcases** — Image slideshows, lightbox viewer, technology tags
- **Visitor Counter** — Optional footer counter via [hitscounter.dev](https://hitscounter.dev)

## Demo

Check out the live demo at [https://viperadnan.com](https://viperadnan.com)

## Quick Start

### Use as Template

1. **Fork or clone** this repository

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Edit your data** in [`lib/data/resume.json`](lib/data/resume.json)
   - Use [`public/resume.schema.json`](public/resume.schema.json) for validation in your editor
   - Or [generate it with AI](#generate-with-ai)

4. **Build and preview**
   ```bash
   bun run build
   bun run start
   ```

### Use with Remote JSON

Set the `RESUME_DATA_URL` environment variable to fetch your JSON from any URL:

```bash
RESUME_DATA_URL=https://example.com/my-resume.json bun run build
```

## JSON Schema

Your resume data must follow the schema defined in [`public/resume.schema.json`](public/resume.schema.json). Here's the basic structure:

```json
{
  "version": "1.0.0",
  "name": "Your Name",
  "title": "Your Title",
  "about": "A brief description about yourself",
  "location": "City, Country",
  "url": "https://yoursite.com",
  "image": "https://example.com/og-image.png",
  "meta": {
    "keywords": ["keyword1", "keyword2"],
    "counter": true
  },
  "contact": {
    "links": [
      { "type": "email", "url": "#", "label": "email@example.com" },
      { "type": "github", "url": "https://github.com/username", "label": "username" },
      { "type": "linkedin", "url": "https://linkedin.com/in/username", "label": "username" }
    ]
  },
  "sections": [
    {
      "id": "projects",
      "title": "Projects",
      "limit": 4,
      "items": [...]
    }
  ]
}
```

### Section Entry Types

| Type | Use Case | Required Fields |
|------|----------|-----------------|
| `showcase` | Projects | `slug`, `title`, `subtitle`, `images`, `link`, `description` |
| `timeline` | Experience, Education | `slug`, `title`, `subtitle`, `period` |
| `list` | Skills | `slug`, `title`, `subtitle` |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `RESUME_DATA_URL` | URL to fetch resume JSON from | [`lib/data/resume.json`](lib/data/resume.json) |

## Generate with AI

You can use LLM models (ChatGPT, Claude, Gemini, etc.) to generate your `resume.json` file.

> [!NOTE]
> Only share non-sensitive information with LLMs. Avoid sending private data like phone numbers, home addresses, or other personal details you don't want public.

**Using context-aware tools** (Claude Code, Cursor, Windsurf, etc.):
> Simply ask the AI to read [`public/resume.schema.json`](public/resume.schema.json) and generate a resume.json with your details.

**Using web-based LLMs**:

1. **Get the schema** — Copy the contents of [`public/resume.schema.json`](public/resume.schema.json)

2. **Prepare your details** — Gather your non-sensitive resume information:
   - Name, title, location, about
   - Contact links (email, GitHub, LinkedIn, etc.)
   - Work experience and education
   - Projects with descriptions and images
   - Skills and certifications

3. **Use this prompt**:
   ```
   I want to create a portfolio website. Generate a valid JSON file based on the following schema and my details.

   JSON Schema:
   <paste the schema here>

   My Details:
   <paste your resume details here>

   Requirements:
   - Output only valid JSON, no explanations
   - Follow the schema exactly
   - Generate appropriate slugs for each item
   ```

4. **Validate** — Paste the generated JSON into [`lib/data/resume.json`](lib/data/resume.json) and run `bun run build` to validate

## Scripts

```bash
bun run dev           # Start development server
bun run build         # Generate static export
bun run schema:generate  # Regenerate JSON schema from types
```

## Deployment

The project is configured for static export. The `out/` directory can be deployed to:

- **[GitHub Pages](https://pages.github.com)** — Push to `gh-pages` branch or use GitHub Actions
- **[Vercel](https://vercel.com)** — Connect your repository for automatic deployments
- **[Netlify](https://netlify.com)** — Drag and drop the `out/` folder or connect repository
- **Any static host** — Upload the `out/` directory

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE). You are free to use, modify, and distribute this code under the terms of the GPL-3.0 license.

---

<p align="center">
  <sub>Built with <a href="https://nextjs.org">Next.js</a>, <a href="https://tailwindcss.com">Tailwind CSS</a>, and <a href="https://ui.shadcn.com">shadcn/ui</a></sub>
</p>
