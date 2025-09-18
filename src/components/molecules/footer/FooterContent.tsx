"use client";

import Image from "next/image";
import Link from "next/link";

export default function FooterContent() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background mt-20 text-muted-foreground py-10">
      <div className="grid md:grid-cols-2 grid-cols-1 pad-x md:gap-0 gap-10">
        <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
          <Link href={"/"} className="flex items-center md:gap-4 gap-3">
            <Image
              src={"/images/brilly.jpg"}
              alt="Meddiscus"
              width={51}
              height={49}
              className="md:max-w-[80px] max-w-[40px] rounded-full"
            />
            <h1 className="font-semibold text-white">
              Blog | Muhammad Ahib Ibrilli
            </h1>
          </Link>
          <p className="text-sm leading-relaxed max-w-md md:flex hidden">
            A collection of my writings, where I share lessons learned,
            technical deep dives, and insights from my journey as a developer.
          </p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 text-center md:text-left">
          <div className="space-y-4 md:text-end text-center">
            <h1 className="text-white font-medium">Site</h1>
            <div className="flex flex-col gap-2">
              <Link
                href={"https://brilliahib.tech"}
                className="hover:text-white"
                target="_blank"
              >
                Portfolio
              </Link>
              <Link
                href={"https://brilliahib.tech/project"}
                target="_blank"
                className="hover:text-white"
              >
                Project
              </Link>
              <Link
                href={"https://brilliahib.tech/personal"}
                target="_blank"
                className="hover:text-white"
              >
                Personal
              </Link>
            </div>
          </div>

          <div className="space-y-4 md:text-end text-center">
            <h1 className="text-white font-medium">Social</h1>
            <div className="flex flex-col gap-2">
              <Link
                href={"https://github.com/Brilliahib"}
                className="hover:text-white"
                target="_blank"
              >
                Github
              </Link>
              <Link
                href={
                  "https://www.linkedin.com/in/muhammad-ahib-ibrilli-219421255"
                }
                target="_blank"
                className="hover:text-white"
              >
                Linkedin
              </Link>
              <Link
                href={"https://brilliahib.tech"}
                className="hover:text-white"
                target="_blank"
              >
                Portfolio
              </Link>
            </div>
          </div>

          <div className="space-y-4 md:text-end text-center">
            <h1 className="text-white font-medium">Short</h1>
            <div className="flex flex-col gap-2">
              <p
                onClick={handleScrollTop}
                className="hover:text-white cursor-pointer"
              >
                Top
              </p>
              <Link
                href="mailto:brilliahib21@gmail.com"
                className="hover:text-white"
              >
                @ email
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="pad-x text-center text-sm text-muted-foreground md:mt-24 mt-16">
        © 2025 Muhammad Ahib Ibrilli. All rights reserved.
      </div>
    </footer>
  );
}
