import { FiLinkedin, FiGithub, FiFacebook, FiTwitter, FiInstagram, FiMail, FiLink } from "react-icons/fi";
import type { IconType } from "react-icons";

const ICONS: Record<string, IconType> = {
  linkedin: FiLinkedin,
  github: FiGithub,
  facebook: FiFacebook,
  twitter: FiTwitter,
  instagram: FiInstagram,
  email: FiMail,
};

export function SocialIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  const Icon = ICONS[iconKey] ?? FiLink;
  return <Icon className={className} />;
}
