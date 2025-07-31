"use client";

import NavL from "@/components/atoms/navbar/NavL";
import NavButton from "@/components/atoms/navbar/NavButton";

export default function Navbar() {
  return (
    <>
      <div className="bg-background sticky top-0 z-50 mb-0 w-full border-b">
        <div className="bg-background pad-x-xl flex justify-between py-4">
          <NavL />
          <NavButton />
        </div>
      </div>
    </>
  );
}
