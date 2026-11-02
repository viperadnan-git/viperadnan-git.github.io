import { Link2, Mail } from "lucide-react";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  XIcon,
} from "@/components/icons/brand-icons";
import type { ContactInfo, ContactLink } from "@/lib/types/resume";
import { getContactUrl } from "@/lib/utils";
import { EmailLink } from "./email-link";

interface ContactHeaderProps {
  name: string;
  bio?: string;
  contact: ContactInfo;
}

const iconMap: Record<
  Exclude<ContactLink["type"], "email">,
  React.ReactNode
> = {
  github: <GitHubIcon className="size-4" />,
  linkedin: <LinkedInIcon className="size-4" />,
  twitter: <TwitterIcon className="size-4" />,
  x: <XIcon className="size-4" />,
  instagram: <InstagramIcon className="size-4" />,
  facebook: <FacebookIcon className="size-4" />,
  custom: <Link2 className="size-4" />,
};

export function ContactHeader({ name, bio, contact }: ContactHeaderProps) {
  return (
    <header className="text-center">
      <svg
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden="true"
        className="mx-auto mb-4 size-12"
      >
        <path d="M36.9 12.5 L50 43.45 L63.1 12.5 L91.67 80.36 L67.86 80.36 L50 51.79 L32.14 80.36 L8.33 80.36 Z" />
      </svg>
      <h1 className="font-heading text-4xl font-bold md:text-5xl">{name}</h1>
      {bio && (
        <p className="mt-3 text-sm text-muted-foreground text-balance">{bio}</p>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        {contact.links.map((link) => {
          const displayLabel = link.label || link.value;
          return link.type === "email" ? (
            <EmailLink
              key={link.type}
              email={link.value}
              ariaLabel={`Email ${link.value}`}
            >
              <Mail className="size-4" />
              <span className="hidden sm:inline">{displayLabel}</span>
            </EmailLink>
          ) : (
            <a
              key={link.type}
              href={getContactUrl(link)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground"
              aria-label={`${link.type.charAt(0).toUpperCase() + link.type.slice(1)}: ${displayLabel}`}
            >
              {iconMap[link.type]}
              <span className="hidden sm:inline">{displayLabel}</span>
            </a>
          );
        })}
      </div>
    </header>
  );
}
