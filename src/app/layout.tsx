import type { Metadata, Viewport } from "next";
import { Akaya_Kanadaka, DM_Serif_Display, Montaga, Poppins } from "next/font/google";
import { site } from "@/data/wedding";
import { localFontFaces } from "@/lib/fonts";
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

/** The couple's names */
const script = Montaga({
  variable: "--font-script-face",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Kannada text: brush-style and playful, with correct conjunct shaping */
const kannada = Akaya_Kanadaka({
  variable: "--font-kannada",
  subsets: ["kannada"],
  weight: "400",
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
  themeColor: "#2a1a0e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fontFaces = localFontFaces();
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${script.variable} ${kannada.variable}`}>
      <body>
        {fontFaces && <style dangerouslySetInnerHTML={{ __html: fontFaces }} />}
        {children}
      </body>
    </html>
  );
}
