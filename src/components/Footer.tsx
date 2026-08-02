import type { SocialLink } from "@/lib/types";
import { SocialIcon } from "./SocialIcon";

export function Footer({ socials }: { socials: SocialLink[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display font-semibold">Abdullah Ibne Ali</p>
          <p className="text-sm text-muted">Copyright © {year} — All rights reserved</p>
        </div>

        <div className="flex gap-5 text-xl text-primary">
          {socials.map((social) => (
            <a
              key={social._id}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.platform}
              className="transition duration-200 hover:scale-125"
            >
              <SocialIcon iconKey={social.iconKey} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
