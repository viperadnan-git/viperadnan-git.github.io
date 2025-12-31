import { FaGithub, FaLinkedin } from "react-icons/fa";

interface IconProps {
  className?: string;
}

export function GitHubIcon({ className }: IconProps) {
  return <FaGithub className={className} />;
}

export function LinkedInIcon({ className }: IconProps) {
  return <FaLinkedin className={className} />;
}
