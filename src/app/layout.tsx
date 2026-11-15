import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CursorGlow } from "@/components/animations/cursor-glow";
import { BackToTop } from "@/components/layout/back-to-top";
import { SecretsProvider } from "@/components/secrets/secrets";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ThemeProvider } from "@/providers/theme-provider";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: `${siteConfig.url}/og.png`, width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="portfolio-theme"
          disableTransitionOnChange
        >
          <SecretsProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
            >
              Skip to content
            </a>
            <ScrollProgress />
            <CursorGlow />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <BackToTop />
          </SecretsProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: siteConfig.name,
                url: siteConfig.url,
                jobTitle: "Backend and Systems Engineer",
                email: `mailto:${siteConfig.email}`,
                address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressCountry: "IN" },
                alumniOf: "Pandit Deendayal Energy University",
                sameAs: [siteConfig.github, siteConfig.linkedin],
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
