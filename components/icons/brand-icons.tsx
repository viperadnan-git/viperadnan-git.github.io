import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaXTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";

interface IconProps {
  className?: string;
}

export function GitHubIcon({ className }: IconProps) {
  return <FaGithub className={className} />;
}

export function LinkedInIcon({ className }: IconProps) {
  return <FaLinkedin className={className} />;
}

export function TwitterIcon({ className }: IconProps) {
  return <FaTwitter className={className} />;
}

export function XIcon({ className }: IconProps) {
  return <FaXTwitter className={className} />;
}

export function InstagramIcon({ className }: IconProps) {
  return <FaInstagram className={className} />;
}

export function FacebookIcon({ className }: IconProps) {
  return <FaFacebook className={className} />;
}
