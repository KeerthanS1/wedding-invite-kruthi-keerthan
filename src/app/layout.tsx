import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Great_Vibes, Noto_Serif_Kannada, Poppins } from "next/font/google";
import { site } from "@/data/wedding";
import "./globals.css";

/** Headings */
const display = DM_Serif_Display({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

/** Body copy */
const body = Poppins({
  variable: "--font-body-face",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/** The couple's names in the hero */
const script = Great_Vibes({
  variable: "--font-script-fallback",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Kannada text */
const kannada = Noto_Serif_Kannada({
  variable: "--font-kannada",
  subsets: ["kannada"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    siteName: "Kruthi & Keerthan",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#3a0f17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${script.variable} ${kannada.variable}`}>
      <body>{children}</body>
    </html>
  );
}
