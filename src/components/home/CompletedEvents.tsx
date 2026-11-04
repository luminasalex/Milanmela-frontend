"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EventCard from "./EventCard";
import CategoryFilter from "./CategoryFilter";
import {
  filterEventsByCategory,
  getEventCategories,
} from "@/lib/events";

const completedEvents = [
  {
    title: "Durga Puja Mahotsav 2024",
    date: "October 12, 2024",
    time: "All Day",
    location: "Dhakeswari Temple, Dhaka",
    category: "Festival",
    categoryColor: "bg-[#C83D2B]/90 text-white",
    description:
      "A grand five-day Durga Puja celebration with classical performances, art installations, and community feasts that drew thousands of attendees.",
    isCompleted: true,
  },
  {
    title: "Eid Cultural Mela",
    date: "April 22, 2024",
    time: "3:00 PM – 10:00 PM",
    location: "Hatirjheel Amphitheatre",
    category: "Cultural",
    categoryColor: "bg-[#064B38]/90 text-white",
    description:
      "A vibrant cultural celebration blending traditional Bengali Eid customs with folk music, artisan markets, and community dining.",
    isCompleted: true,
  },
  {
    title: "Poila Boishakh Grand Celebration",
    date: "April 14, 2024",
    time: "8:00 AM – 9:00 PM",
    location: "Ramna Batamul, Dhaka",
    category: "Festival",
    categoryColor: "bg-[#C99A4B] text-[#064B38]",
    description:
      "The beloved Bengali New Year's Day celebration with traditional Mangal Shobhajatra procession, music, and cultural performances.",
    isCompleted: true,
  },
  {
    title: "Lalon Utsav Winter Edition",
    date: "January 18, 2024",
    time: "5:00 PM – 11:00 PM",
    location: "Kushtia Cultural Complex",
    category: "Music",
    categoryColor: "bg-[#064B38]/90 text-white",
    description:
      "An intimate evening of Baul folk music and Lalon's spiritual songs performed by master musicians from across Bangladesh.",
    isCompleted: true,
  },
  {
    title: "Shakrain Kite Festival 2023",
    date: "January 14, 2023",
    time: "10:00 AM – 6:00 PM",
    location: "Old Dhaka Rooftops",
    category: "Heritage",
    categoryColor: "bg-[#C99A4B] text-[#064B38]",
    description:
      "The iconic Shakrain festival celebrated with colourful kites soaring above historic Old Dhaka, accompanied by traditional music.",
    isCompleted: true,
  },
  {
    title: "Bijoya Sammilani 2023",
    date: "October 25, 2023",
    time: "4:00 PM – 9:00 PM",
    location: "Bashundhara Convention City",
    category: "Community",
    categoryColor: "bg-[#C83D2B]/90 text-white",
    description:
      "Post-Durga Puja reunion bringing thousands of families together for traditional Bijoya greetings, sweets, and cultural performances.",
    isCompleted: true,
  },
];

export default function CompletedEvents() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const recentEvents = [...completedEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const categories = getEventCategories(recentEvents);
  const visibleEvents = filterEventsByCategory(recentEvents, selectedCategory);

  return (
    <section
      id="completed-events"
      className="relative w-full bg-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C83D2B] via-[#C99A4B] to-[#064B38]" />

      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-alpana bg-repeat" style={{ backgroundSize: "80px 80px" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C99A4B]" />
            <span className="text-[#C99A4B]">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C99A4B]" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-[#064B38] mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Memories from Past Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-[#65472D] max-w-lg mx-auto"
          >
            A treasured archive of cultural moments — every event a chapter in
            Milanmela&apos;s growing story of community and celebration.
          </motion.p>
        </div>

        <div className="mb-6 flex justify-end">
          <CategoryFilter
            categories={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        {/* Events grid */}
        {visibleEvents.length === 0 ? (
          <p className="rounded-2xl border border-[#C99A4B]/25 bg-white p-8 text-center text-sm text-[#65472D]">
            No past events found in this category.
          </p>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {visibleEvents.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
