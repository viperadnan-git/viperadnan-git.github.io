import { NEW_TAB_NOTE_ID } from "@/lib/utils";

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/** Render once per page (DocumentContainer); every ExternalLink points at it. */
export function NewTabNote() {
  return (
    <span id={NEW_TAB_NOTE_ID} hidden>
      Opens in a new tab
    </span>
  );
}

/** New tab, announced via aria-describedby so the notice stays out of copied text. */
export function ExternalLink(props: ExternalLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby={NEW_TAB_NOTE_ID}
      {...props}
    />
  );
}
