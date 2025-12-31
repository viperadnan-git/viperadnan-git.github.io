import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DocumentContainer } from "@/components/layout/document-container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { resumeData } from "@/lib/data/resume-data";
import "./globals.css";

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <DocumentContainer>
            <ThemeToggle />
            {children}
          </DocumentContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
