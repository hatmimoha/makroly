import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Makroly — Smart PDF Annotation for Generative AI Training Data",
    template: "%s | Makroly",
  },
  description:
    "Makroly is a schema-driven PDF annotation tool built for AI teams. Define custom entity schemas, annotate PDF documents with precision, and export structured JSON training data for LLMs and document AI models.",
  metadataBase: new URL("https://makroly.com"),
  alternates: {
    canonical: "https://makroly.com",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Makroly",
    images: [
      {
        url: "/makroly.png",
        width: 1200,
        height: 630,
        alt: "Makroly — Smart PDF Annotation for Generative AI Training Data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/makroly.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Makroly",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web Browser",
  description:
    "Schema-driven PDF annotation tool for preparing generative AI training data. Define entity schemas, annotate documents, export structured JSON.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Schema-driven annotation",
    "Typed entity properties",
    "Implicit object support",
    "JSON export for AI pipelines",
    "Schema import/export",
    "100% local processing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q2RSMZM9PT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q2RSMZM9PT');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
