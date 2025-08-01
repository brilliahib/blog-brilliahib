import { Metadata } from "next";

export function generateStaticMetadata(
  title: string,
  keywords: string
): Metadata {
  return {
    title: `${title} | Muhammad Ahib Ibrilli`,
    keywords,
  };
}
