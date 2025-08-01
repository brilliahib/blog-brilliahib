import Image from "next/image";
import Link from "next/link";

export default function FooterContent() {
  return (
    <footer className="bg-[#2b313b] mt-20 text-primary-foreground/65 py-10">
      <div className="flex md:flex-row flex-col md:justify-between pad-x md:gap-0 gap-10">
        <div className="flex flex-col items-between gap-6">
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
          <span className="text-sm">
            © 2025 Muhammad Ahib Ibrilli. All rights reserved.
          </span>
        </div>
        <div className="space-y-4 md:text-end text-left">
          <h1 className="text-white font-medium">Site</h1>
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
      </div>
    </footer>
  );
}
