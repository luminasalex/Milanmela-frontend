import HeroSection from "@/components/home/HeroSection";
import PlatformFeatures from "@/components/home/PlatformFeatures";
import AboutSection from "@/components/home/AboutSection";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import GalleryShowcase from "@/components/home/GalleryShowcase";
import CompletedEvents from "@/components/home/CompletedEvents";
import NewsletterSection from "@/components/home/NewsletterSection";
import AboutDetails from "@/components/home/AboutDetails";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
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
