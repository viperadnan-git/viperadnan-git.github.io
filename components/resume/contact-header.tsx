import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/brand-icons";
import type { ContactInfo, ContactLink } from "@/lib/types/resume";
import { EmailLink } from "./email-link";

interface ContactHeaderProps {
  name: string;
  contact: ContactInfo;
}

const iconMap: Record<Exclude<ContactLink["type"], "email">, React.ReactNode> = {
  github: <GitHubIcon className="h-4 w-4" />,
  linkedin: <LinkedInIcon className="h-4 w-4" />,
};

export function ContactHeader({ name, contact }: ContactHeaderProps) {
  return (
    <header className="text-center">
      <h1 className="font-heading text-4xl font-bold md:text-5xl">
        {name}
      </h1>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        {contact.links.map((link) =>
          link.type === "email" ? (
            <EmailLink key={link.type} email={link.label}>
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">{link.label}</span>
            </EmailLink>
          ) : (
            <a
              key={link.type}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground"
            >
              {iconMap[link.type]}
              <span className="hidden sm:inline">{link.label}</span>
            </a>
          )
        )}
      </div>
    </header>
  );
}
