"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";

const upcomingEvents = [
  {
    title: "Baishakhi Mela 2025",
    date: "April 14, 2025",
    time: "10:00 AM – 8:00 PM",
    location: "Ramna Park, Dhaka",
    category: "Festival",
    categoryColor: "bg-[#C83D2B]/90 text-white",
    description:
      "Celebrate the Bengali New Year with vibrant folk music, traditional dance performances, artisan crafts, and authentic Bengali cuisine in the heart of Dhaka.",
  },
  {
    title: "Rabindra Jayanti Evening",
    date: "May 8, 2025",
    time: "6:00 PM – 10:00 PM",
    location: "Bangladesh Shilpakala Academy",
    category: "Cultural",
    categoryColor: "bg-[#064B38]/90 text-white",
    description:
      "An elegant cultural evening dedicated to Rabindranath Tagore — featuring classical songs, readings, and theatrical performances by celebrated artists.",
  },
  {
    title: "Nakshi Kantha Craft Fair",
    date: "June 20, 2025",
    time: "11:00 AM – 7:00 PM",
    location: "Bashundhara City, Dhaka",
    category: "Heritage",
    categoryColor: "bg-[#C99A4B] text-[#064B38]",
    description:
      "Discover the artistry of Nakshi Kantha embroidery and traditional Bengali crafts from across the country, celebrating artisans and their living heritage.",
  },
];

export default function UpcomingEvents() {
  return (
    <section
      id="upcoming-events"
      className="relative w-full bg-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C99A4B] via-[#064B38] to-[#C83D2B]" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-alpana-cream bg-repeat" style={{ backgroundSize: "80px 80px" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#C99A4B]" />
              <span className="text-xs font-bold tracking-widest text-[#C99A4B] uppercase">
                What&apos;s Coming
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-[#064B38]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Upcoming Events
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-2 text-sm text-[#65472D] max-w-md"
            >
              Mark your calendar for these upcoming celebrations of Bengali
              culture, arts, and community.
            </motion.p>
          </div>

          <a href="#" className="shrink-0">
            <Button
              variant="outline"
              className="h-10 px-6 rounded-full border-[#064B38] text-[#064B38] hover:bg-[#064B38] hover:text-[#F7F1E3] text-sm font-semibold transition-all"
            >
              View All Events
              <ArrowRight className="size-4 ml-1" />
            </Button>
          </a>
        </div>

        {/* Events grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {upcomingEvents.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
