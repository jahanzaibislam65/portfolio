import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://jahanzaib.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jahanzaib Islam — Software Engineer",
    template: "%s | Jahanzaib Islam",
  },
  description:
    "Software engineer with 5 years of experience building production web and mobile applications with React, Next.js, React Native and Node.js.",
  keywords: [
    "Jahanzaib Islam",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "React Native",
    "Node.js",
    "Lahore",
    "Portfolio",
  ],
  authors: [{ name: "Jahanzaib Islam" }],
  creator: "Jahanzaib Islam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Jahanzaib Islam — Software Engineer",
    description:
      "Software engineer building fast, polished web and mobile products with React, Next.js and Node.js.",
    siteName: "Jahanzaib Islam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jahanzaib Islam — Software Engineer",
    description:
      "Software engineer building fast, polished web and mobile products with React, Next.js and Node.js.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions (Grammarly, dark-mode tools)
    // inject attributes onto <html>/<body> before React hydrates. It only covers
    // this element's own attributes, so real mismatches inside the tree still surface.
    <html lang="en" className={`${inter.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
