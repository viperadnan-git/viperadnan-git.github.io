import { Fragment } from "react";
import { ExternalLink } from "@/components/shared/external-link";
import { Button } from "@/components/ui/button";
import type { ContactInfo, ContactLink } from "@/lib/types/resume";
import { getContactUrl, listSeparator } from "@/lib/utils";

const labels: Record<ContactLink["type"], string> = {
  email: "email",
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  x: "X",
  instagram: "Instagram",
  facebook: "Facebook",
  telegram: "Telegram",
  custom: "Link",
};

export function ContactHeader({
  name,
  title,
}: {
  name: string;
  title?: string;
}) {
  return (
    <header className="enter">
      <h1 className="font-medium">{name}</h1>
      {title && <p className="text-muted-foreground">{title}</p>}
    </header>
  );
}

/** "Based in X. Find me on A, B, C, or email." Email goes last; each part appears only when its data exists. */
export function ContactLine({
  contact,
  location,
  className,
}: {
  contact: ContactInfo;
  location?: string;
  className?: string;
}) {
  const profiles = contact.links.filter((l) => l.type !== "email");
  const email = contact.links.filter((l) => l.type === "email");
  const links = [...profiles, ...email];
  if (!location && !links.length) return null;

  return (
    <p className={className}>
      {location && `Based in ${location}.`}
      {location && links.length > 0 && " "}
      {links.length > 0 && (profiles.length ? "Find me on " : "Reach me by ")}
      {links.map((l, i) => {
        const label = l.label || labels[l.type];
        const href = getContactUrl(l);
        return (
          <Fragment key={`${l.type}-${l.value}`}>
            {listSeparator(i, links.length, "or")}
            <Button asChild variant="underline" size="text">
              {l.type === "email" ? (
                <a href={href}>{label}</a>
              ) : (
                <ExternalLink href={href}>{label}</ExternalLink>
              )}
            </Button>
          </Fragment>
        );
      })}
      {links.length > 0 && "."}
    </p>
  );
}
