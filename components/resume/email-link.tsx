"use client";

interface EmailLinkProps {
  email: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function EmailLink({ email, children, ariaLabel }: EmailLinkProps) {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = `mailto:${atob(btoa(email))}`;
      }}
      className="flex cursor-pointer items-center gap-1.5 hover:text-foreground"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
