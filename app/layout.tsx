import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { DocumentContainer } from "@/components/layout/document-container";
import { OwnerProvider } from "@/components/providers/owner-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getResumeData } from "@/lib/loader";
import { generatePersonSchema } from "@/lib/seo/structured-data";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const resumeData = await getResumeData();

  return {
    metadataBase: new URL(resumeData.url),
    title: resumeData.name,
    description: resumeData.about,
    keywords: resumeData.meta.keywords,
    authors: [{ name: resumeData.name }],
    alternates: { canonical: resumeData.url },
    appleWebApp: { capable: true, title: resumeData.name },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-icon.png",
    },
    openGraph: {
      title: resumeData.name,
      description: resumeData.about,
      url: resumeData.url,
      type: "website",
      ...(resumeData.image && { images: [resumeData.image] }),
    },
    twitter: {
      card: "summary_large_image",
      title: resumeData.name,
      description: resumeData.about,
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
  const personSchema = generatePersonSchema(resumeData);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has no other injection point
          dangerouslySetInnerHTML={{
            // "<" escaped so text from resume data cannot end the script element
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={onest.variable}>
        <ThemeProvider>
          <OwnerProvider name={resumeData.name}>
            <DocumentContainer
              showCounter={resumeData.meta.counter}
              legal={resumeData.meta.legal}
            >
              {children}
            </DocumentContainer>
          </OwnerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
