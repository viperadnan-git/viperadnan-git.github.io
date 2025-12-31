"use client";

interface EmailLinkProps {
  email: string;
  children: React.ReactNode;
}

export function EmailLink({ email, children }: EmailLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${atob(btoa(email))}`;
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className="flex items-center gap-1.5 hover:text-foreground"
    >
      {children}
    </a>
  );
}
