import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Noto_Serif_Bengali,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home/Navbar";
import { Footer } from "react-day-picker";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Milanmela — Premium Bengali Cultural Platform",
  description:
    "Milanmela is a premium Bengali cultural event platform celebrating festivals, community gatherings, and the rich heritage of Bengali tradition. Bringing people together through culture.",
  keywords: [
    "Milanmela",
    "Bengali culture",
    "cultural events",
    "Bengali festivals",
    "community gatherings",
    "Bangladeshi culture",
  ],
  openGraph: {
    title: "Milanmela — Where Culture Meets Community",
    description:
      "Experience the beauty of Bengali culture through curated events, festivals, and community celebrations.",
    siteName: "Milanmela",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${notoSerifBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F1E3]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
