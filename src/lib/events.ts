export interface EventItem {
  _id: string;
  title: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  time?: string;
  location?: string;
  category?: string;
  description?: string;
  imageUrl?: string;
  image?: string;
  creatorEmail?: string;
  isCompleted?: boolean;
}

export const CATEGORY_COLORS: Record<string, string> = {
  Cleanup: "bg-[#064B38]/90 text-white",
  Plantation: "bg-[#2F855A] text-white",
  Donation: "bg-[#C83D2B]/90 text-white",
  "Food Distribution": "bg-[#C99A4B] text-[#064B38]",
  Education: "bg-[#3B6C9A] text-white",
  Festival: "bg-[#C83D2B]/90 text-white",
  Cultural: "bg-[#064B38]/90 text-white",
  Heritage: "bg-[#C99A4B] text-[#064B38]",
  Music: "bg-[#064B38]/90 text-white",
  Community: "bg-[#C83D2B]/90 text-white",
  Other: "bg-[#064B38]/10 text-[#064B38]",
};

export function getEventCategories(events: Pick<EventItem, "category">[]): string[] {
  const categories = new Set(
    events
      .map((event) => event.category?.trim())
      .filter((category): category is string => Boolean(category)),
  );
  return [...categories].sort((a, b) => a.localeCompare(b));
}

export function filterEventsByCategory<T extends Pick<EventItem, "category">>(
  events: T[],
  category: string,
): T[] {
  if (category === "all") return events;
  return events.filter(
    (event) => event.category?.trim().toLowerCase() === category.toLowerCase(),
  );
}

export function formatDate(raw?: string): string {
  if (!raw) return "Date TBD";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime12(hhmm?: string): string {
  if (!hhmm || !hhmm.includes(":")) return hhmm || "";
  const [h, m] = hhmm.split(":");
  const hour = parseInt(h, 10);
  if (isNaN(hour)) return hhmm;
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export function formatTimeRange(
  start?: string,
  end?: string,
  fallback?: string,
): string {
  if (fallback && fallback.trim()) return fallback;
  const s = formatTime12(start);
  const e = formatTime12(end);
  if (s && e) return `${s} – ${e}`;
  return s || e || "Time TBD";
}

export function isCompletedEvent(
  date?: string,
  endTime?: string,
  isCompletedFlag?: boolean,
): boolean {
  if (isCompletedFlag === true) return true;
  if (!date) return false;
  const eventDate = new Date(date);
  if (isNaN(eventDate.getTime())) return false;

  let endHour = 23;
  let endMinute = 59;
  if (endTime && endTime.includes(":")) {
    const [h, m] = endTime.split(":");
    const hour = parseInt(h, 10);
    const minute = parseInt(m, 10);
    if (!isNaN(hour)) endHour = hour;
    if (!isNaN(minute)) endMinute = minute;
  }
  const endDateTime = new Date(eventDate);
  endDateTime.setHours(endHour, endMinute, 0, 0);
  return endDateTime.getTime() < Date.now();
}

export function isUpcomingEvent(event: Pick<EventItem, "date" | "endTime">): boolean {
  if (!event.date) return false;
  const eventDate = new Date(event.date);
  if (Number.isNaN(eventDate.getTime())) return false;
  return getEventTimestamp(event) >= Date.now();
}

// Helper: event er date + endTime ke timestamp (ms) e convert kore
export function getEventTimestamp(
  event: Pick<EventItem, "date" | "endTime">,
): number {
  if (!event.date) return Number.MAX_SAFE_INTEGER; // date na thakle sobcheye niche

  const d = new Date(event.date);
  if (isNaN(d.getTime())) return Number.MAX_SAFE_INTEGER;

  // endTime thakle set kori, na thakle din shesh (23:59)
  let hour = 23;
  let minute = 59;
  if (event.endTime && event.endTime.includes(":")) {
    const [h, m] = event.endTime.split(":");
    const parsedHour = parseInt(h, 10);
    const parsedMinute = parseInt(m, 10);
    if (!isNaN(parsedHour)) hour = parsedHour;
    if (!isNaN(parsedMinute)) minute = parsedMinute;
  }
  d.setHours(hour, minute, 0, 0);
  return d.getTime();
}

// 🔽 NOTUN FUNCTION: Date onujai sort kore
// Upcoming events age, completed events pore
export function sortEventsByDate(events: EventItem[]): EventItem[] {
  const now = Date.now();

  return [...events].sort((a, b) => {
    // Prottek event er date+time ke number (timestamp) e convert kori
    const aTime = getEventTimestamp(a);
    const bTime = getEventTimestamp(b);

    const aIsPast = aTime < now;
    const bIsPast = bTime < now;

    // Jodi ekta past ar ekta upcoming hoy:
    // upcoming (false) age ashbe, past (true) pore ashbe
    if (aIsPast !== bIsPast) {
      return aIsPast ? 1 : -1;
    }

    // Duita e upcoming hole: je tar date age, she age ashbe (ascending)
    if (!aIsPast && !bIsPast) {
      return aTime - bTime;
    }

    // Duita e past hole: je tar date recent (beshi kacher), she age ashbe (descending)
    return bTime - aTime;
  });
}
