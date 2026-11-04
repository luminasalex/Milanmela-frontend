"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import EventCard, { type EventCardProps } from "./EventCard";
import CategoryFilter from "./CategoryFilter";

import {
  type EventItem,
  CATEGORY_COLORS,
  filterEventsByCategory,
  formatDate,
  formatTimeRange,
  getEventCategories,
  isCompletedEvent,
  sortEventsByDate,
} from "@/lib/events";

function toCardProps(event: EventItem): EventCardProps {
  const category = event.category || "Other";
  const displayImage = event.imageUrl || event.image || "/Milanmela.png";

  return {
    id: event._id,
    _id: event._id,
    title: event.title || "Untitled Event",
    date: formatDate(event.date),
    time: formatTimeRange(event.startTime, event.endTime, event.time),
    location: event.location || "Location TBD",
    category,
    categoryColor:
      CATEGORY_COLORS[category] || "bg-[#064B38]/10 text-[#064B38]",
    description:
      event.description || "No description provided for this event.",
    isCompleted: isCompletedEvent(event.date, event.endTime, event.isCompleted),
    image: displayImage,
    imageUrl: displayImage,
  };
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let cancelled = false;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/upcoming?limit=6`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const validData = Array.isArray(data) ? data : [];
        setEvents(sortEventsByDate(validData).map(toCardProps));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = getEventCategories(events);
  const visibleEvents = filterEventsByCategory(events, selectedCategory);

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
        </div>

        {/* Events grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-2xl border border-[#C99A4B]/25 bg-white animate-pulse"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white/80 rounded-3xl border border-[#C99A4B]/25 p-10 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-[#064B38]/10 text-[#064B38] flex items-center justify-center mx-auto mb-4">
              <Calendar className="size-7" />
            </div>
            <p className="text-sm text-[#65472D]">
              No events published yet — check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <CategoryFilter
                categories={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
            {visibleEvents.length === 0 ? (
              <div className="rounded-2xl border border-[#C99A4B]/25 bg-[#F7F1E3]/60 p-8 text-center text-sm text-[#65472D]">
                No upcoming events found in this category.
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
              >
                {visibleEvents.map((event, i) => (
                  <motion.div
                    key={`${event.id || event.title}-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.1 }}
                  >
                    <EventCard {...event} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
