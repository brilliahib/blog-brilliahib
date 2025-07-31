"use client";

import Link from "next/link";
import { Github, Globe, Linkedin } from "lucide-react";

export default function NavButton() {
  return (
    <div className="md:flex hidden items-center">
      <div className="flex items-center md:gap-6 gap-2">
        <Link
          href="https://brilliahib.tech"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Website"
        >
          <Globe className="h-5 w-5 hover:text-primary transition-colors" />
        </Link>
        <Link
          href="https://github.com/Brilliahib"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5 hover:text-primary transition-colors" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/muhammad-ahib-ibrilli-219421255"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />
        </Link>
      </div>
    </div>
  );
}
