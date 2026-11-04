import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Noto_Serif_Bengali,
} from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { ToastContainer } from "react-toastify";

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
  title: "Milanmela — Community Service Events",
  description:
    "Discover, create, and join local community service events with Milanmela.",
  keywords: [
    "Milanmela",
    "community service",
    "volunteer events",
    "local events",
    "cleanup",
    "plantation",
    "donation",
  ],
  openGraph: {
    title: "Milanmela — Community Service Events",
    description:
      "Find local volunteer opportunities, create community events, and make a difference together.",
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="light"
        />
      </body>
    </html>
  );
}
