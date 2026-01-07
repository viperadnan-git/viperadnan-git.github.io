import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DocumentContainer } from "@/components/layout/document-container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { getResumeData } from "@/lib/data/loader";
import "./globals.css";

const copernicus = localFont({
  src: [
    {
      path: "../public/fonts/CopernicusTrial-Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CopernicusTrial-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/CopernicusTrial-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/CopernicusTrial-Heavy.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/CopernicusTrial-BookItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/CopernicusTrial-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/CopernicusTrial-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/CopernicusTrial-ExtraboldItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-copernicus",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const resumeData = await getResumeData();
  return {
    title: resumeData.name,
    description: resumeData.about,
    keywords: resumeData.meta.keywords,
    authors: [{ name: resumeData.name }],
    icons: {
      icon: "/icon.svg",
    },
    openGraph: {
      title: resumeData.name,
      description: resumeData.about,
      url: resumeData.url,
      type: "website",
      ...(resumeData.image && { images: [resumeData.image] }),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resumeData = await getResumeData();

  return (
    <html lang="en" suppressHydrationWarning className={copernicus.variable}>
      <body className="antialiased">
        <ThemeProvider>
          <DocumentContainer showCounter={resumeData.meta.counter}>
            <ThemeToggle />
            {children}
          </DocumentContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
