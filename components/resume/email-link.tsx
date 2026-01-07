"use client";

interface EmailLinkProps {
  email: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function EmailLink({ email, children, ariaLabel }: EmailLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${atob(btoa(email))}`;
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className="flex items-center gap-1.5 hover:text-foreground"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
