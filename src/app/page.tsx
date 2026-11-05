"use client";

import HeroSection from "@/components/home/HeroSection";
import PlatformFeatures from "@/components/home/PlatformFeatures";
import AboutSection from "@/components/home/AboutSection";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import GalleryShowcase from "@/components/home/GalleryShowcase";
import CompletedEvents from "@/components/home/CompletedEvents";
import NewsletterSection from "@/components/home/NewsletterSection";
import AboutDetails from "@/components/home/AboutDetails";
import { useLanguage } from "@/components/LanguageProvider";


export default function Home() {
  const language = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <main
        lang={language}
        className="flex-1"
        style={{ fontFamily: language === "bn" ? "var(--font-bengali)" : "inherit" }}
      >
        <HeroSection />
        <PlatformFeatures />
        <AboutSection />
        <UpcomingEvents />
        <GalleryShowcase />
        <CompletedEvents />
        <NewsletterSection />
        <AboutDetails />


      </main>
    </div>
  );
}
