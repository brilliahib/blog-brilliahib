"use client";

import { ThemeToggler } from "@/components/theme-toggler";

export default function NavButton() {
  return (
    <div className="flex items-center">
      <ThemeToggler />
    </div>
  );
}
