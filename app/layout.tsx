import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DocumentContainer } from "@/components/layout/document-container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { getResumeData } from "@/lib/loader";
import { generatePersonSchema } from "@/lib/seo/structured-data";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const resumeData = await getResumeData();

  return {
    metadataBase: new URL(resumeData.url),
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
      </head>
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
