"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import EventCard from "@/components/home/EventCard";
import CategoryFilter from "@/components/home/CategoryFilter";
import { Input } from "@/components/ui/input";
import {
  CATEGORY_COLORS,
  filterEventsByCategory,
  formatDate,
  formatTimeRange,
  getEventCategories,
  isCompletedEvent,
  type EventItem,
} from "@/lib/events";

export default function EventGrid({ events }: { events: EventItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = getEventCategories(events);
  const categoryEvents = filterEventsByCategory(events, selectedCategory);
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const visibleEvents = categoryEvents.filter((event) =>
    event.title.toLocaleLowerCase().includes(normalizedQuery),
  );

  return (
    <div className="space-y-6">
      <div className="relative max-w-xl">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#064B38]/60"
        />
        <Input
          type="search"
          aria-label="Search events by name"
          placeholder="Search events by name..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="h-12 rounded-full border-[#C99A4B]/40 bg-white/80 pl-11 pr-5 text-sm text-[#064B38] placeholder:text-[#65472D]/60 focus-visible:border-[#064B38] focus-visible:ring-[#064B38]/20"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#064B38]">
          Showing {visibleEvents.length}{" "}
          {visibleEvents.length === 1 ? "Event" : "Events"}
        </span>
        <CategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {visibleEvents.length === 0 ? (
        <div className="rounded-2xl border border-[#C99A4B]/25 bg-white/80 p-10 text-center text-sm text-[#65472D]">
          {normalizedQuery
            ? "No events match your search."
            : "No events found in this category."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {visibleEvents.map((event) => {
            const category = event.category || "Other";
            const image = event.imageUrl || event.image || "/Milanmela.png";

            return (
              <div key={event._id} className="h-full">
                <EventCard
                  id={event._id}
                  title={event.title || "Untitled Event"}
                  date={formatDate(event.date)}
                  time={formatTimeRange(event.startTime, event.endTime, event.time)}
                  location={event.location || "Location TBD"}
                  category={category}
                  categoryColor={
                    CATEGORY_COLORS[category] || "bg-[#064B38]/10 text-[#064B38]"
                  }
                  description={
                    event.description || "No description provided for this event."
                  }
                  isCompleted={isCompletedEvent(
                    event.date,
                    event.endTime,
                    event.isCompleted,
                  )}
                  image={image}
                  imageUrl={image}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
