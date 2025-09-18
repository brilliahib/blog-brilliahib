import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/components/organisms/GlobalProvider";
import Navbar from "@/components/organisms/navbar/Navbar";
import FooterContent from "@/components/molecules/footer/FooterContent";
import { ThemeProvider } from "@/components/theme-provider";
import { getMetadata } from "@/lib/metadata";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = getMetadata({
  title: "Blog | Muhammad Ahib Ibrilli",
  description:
    "A collection of my writings, where I share lessons learned, technical deep dives, and insights from my journey as a developer.",
  url: "https://blog.brilliahib.tech",
  image: "https://brilliahib.tech/images/brilly.jpg",
  keywords: [
    "Muhammad Ahib Ibrilli",
    "brilliahib",
    "brilly",
    "software engineer",
    "web developer",
    "website developer",
    "website development",
    "frontend developer",
    "fullstack developer",
    "software engineer Semarang",
    "web developer Semarang",
    "software engineer Indonesia",
    "freelance web developer Semarang",
    "professional website development",
    "modern web development Indonesia",
  ],
  siteName: "Blog | Muhammad Ahib Ibrilli",
  type: "website",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased font-figtree`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalProvider>
            <Navbar />
            {children}
            <FooterContent />
          </GlobalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
