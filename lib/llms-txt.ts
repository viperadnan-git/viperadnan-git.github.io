import type {
  Resume,
  Section,
  TimelineEntry,
  ListEntry,
  ShowcaseEntry,
  SummaryEntry,
} from "@/lib/types/resume";

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?strong>/gi, "")
    .replace(/<[^>]+>/g, "");
}

function contactUrl(type: string, value: string): string | null {
  switch (type) {
    case "github":
      return `https://github.com/${value}`;
    case "linkedin":
      return `https://linkedin.com/in/${value}`;
    case "x":
    case "twitter":
      return `https://x.com/${value}`;
    case "instagram":
      return `https://instagram.com/${value}`;
    case "facebook":
      return `https://facebook.com/${value}`;
    default:
      return null;
  }
}

function trimTrailing(s: string, char: string): string {
  return s.endsWith(char) ? s.slice(0, -1) : s;
}

function formatTimelineEntry(entry: TimelineEntry): string {
  const parts: string[] = [];
  parts.push(entry.subtitle);
  if (entry.location) parts.push(entry.location);
  parts.push(entry.period);
  if (entry.details) {
    for (const d of entry.details) {
      parts.push(`${d.title} — ${trimTrailing(d.description, ".")}`);
    }
  }
  return parts.join(". ");
}

function renderSection(section: Section, baseUrl: string): string {
  const lines: string[] = [];
  const items = section.limit
    ? section.items.slice(0, section.limit)
    : section.items;

  lines.push(`## ${section.title}`);

  for (const item of items) {
    switch (item.type) {
      case "summary": {
        const s = item as SummaryEntry;
        lines.push(stripHtml(s.content));
        break;
      }

      case "list": {
        const l = item as ListEntry;
        lines.push(`- ${l.title}: ${l.subtitle}`);
        break;
      }

      case "timeline": {
        const t = item as TimelineEntry;
        const desc = formatTimelineEntry(t);
        if (t.link) {
          lines.push(`- [${t.title}](${t.link}): ${desc}`);
        } else {
          lines.push(`- ${t.title}: ${desc}`);
        }
        break;
      }

      case "showcase": {
        const s = item as ShowcaseEntry;
        lines.push(`- [${s.title}](${s.link}): ${s.description}`);
        break;
      }
    }
  }

  if (section.limit && section.items.length > section.limit) {
    lines.push(
      `- [View all ${section.title.toLowerCase()}](${baseUrl}/section/${section.id})`,
    );
  }

  return lines.join("\n");
}

export function generateLlmsTxt(data: Resume): string {
  const lines: string[] = [];

  // H1: Name
  lines.push(`# ${data.name}`);

  // Blockquote: Short summary
  const summaryParts: string[] = [];
  if (data.title) summaryParts.push(data.title);
  if (data.location) summaryParts.push(`based in ${data.location}`);
  lines.push("", `> ${summaryParts.join(", ")}`);

  // Content paragraphs (no headings allowed before H2 sections per spec)
  if (data.about) lines.push("", stripHtml(data.about));

  const info: string[] = [];
  if (data.languages) info.push(`Languages: ${data.languages.join(", ")}`);

  // Contact as list items with links
  for (const link of data.contact.links) {
    const label =
      link.label || link.type.charAt(0).toUpperCase() + link.type.slice(1);
    const url = contactUrl(link.type, link.value);
    if (link.type === "email") {
      info.push(`Email: ${link.value}`);
    } else if (url) {
      info.push(`${label}: ${url}`);
    } else {
      info.push(`${label}: ${link.value}`);
    }
  }

  if (info.length > 0) {
    lines.push("", info.map((i) => `- ${i}`).join("\n"));
  }

  // H2 sections as file lists
  for (const section of data.sections) {
    lines.push("", renderSection(section, data.url));
  }

  return lines.join("\n") + "\n";
}
