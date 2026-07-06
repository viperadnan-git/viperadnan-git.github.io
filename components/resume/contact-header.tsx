import { Mail, Link2 } from "lucide-react";
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  XIcon,
  InstagramIcon,
  FacebookIcon,
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
        <path d="M39 14 L50 40 L61 14 L85 71 L65 71 L50 47 L35 71 L15 71 Z" />
        <rect x="28" y="79" width="44" height="8" rx="4" />
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
