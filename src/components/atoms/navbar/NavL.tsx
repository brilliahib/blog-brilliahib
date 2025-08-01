import Image from "next/image";
import Link from "next/link";

export default function NavL() {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Link href={"/"} className="flex items-center md:gap-4 gap-3">
            <Image
              src={"/images/brilly.jpg"}
              alt="Meddiscus"
              width={51}
              height={49}
              className="md:max-w-[80px] max-w-[40px] rounded-full"
            />
            <h1 className="font-semibold text-black">
              Blog | Muhammad Ahib Ibrilli
            </h1>
          </Link>
        </div>
      </div>
    </>
  );
}
