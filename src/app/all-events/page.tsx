import Link from "next/link";
import { PlusCircle, Calendar, Sparkles } from "lucide-react";
import EventCard from "@/components/home/EventCard";
import { Button } from "@/components/ui/button";

interface EventItem {
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
    isCompleted?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
    Festival: "bg-[#C83D2B]/90 text-white",
    Cultural: "bg-[#064B38]/90 text-white",
    Heritage: "bg-[#C99A4B] text-[#064B38]",
    Music: "bg-[#064B38]/90 text-white",
    Community: "bg-[#C83D2B]/90 text-white",
    Other: "bg-[#064B38]/10 text-[#064B38]",
};

function formatDate(raw?: string): string {
    if (!raw) return "Date TBD";
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function formatTime12(hhmm?: string): string {
    if (!hhmm || !hhmm.includes(":")) return hhmm || "";
    const [h, m] = hhmm.split(":");
    const hour = parseInt(h, 10);
    if (isNaN(hour)) return hhmm;
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
}

function formatTimeRange(start?: string, end?: string, fallback?: string): string {
    if (fallback && fallback.trim()) return fallback;
    const s = formatTime12(start);
    const e = formatTime12(end);
    if (s && e) return `${s} – ${e}`;
    return s || e || "Time TBD";
}

function isCompletedEvent(date?: string, endTime?: string, isCompletedFlag?: boolean): boolean {
    if (typeof isCompletedFlag === "boolean") return isCompletedFlag;
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

// ami code korlam but Ai code change kore deca 

async function getEvents(): Promise<EventItem[]> {
    try {
        const res = await fetch("http://localhost:5000/all-events", {
            cache: "no-store",
        });
        if (!res.ok) {
            console.error("Failed to fetch events:", res.status);
            return [];
        }
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching all events:", error);
        return [];
    }
}

export default async function AllEventsPage() {
    const events = await getEvents();

    return (
        <div className="min-h-screen bg-[#F7F1E3] relative overflow-hidden py-12 lg:py-20">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C99A4B] via-[#064B38] to-[#C83D2B]" />

            {/* Background motif texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #064B38 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-12 bg-[#C99A4B]" />
                            <span className="text-[#C99A4B]">✦</span>
                            <span className="text-xs font-bold tracking-widest text-[#C99A4B] uppercase">
                                Milanmela Archive &amp; Schedule
                            </span>
                        </div>

                        <h1
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064B38]"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            All Cultural Events
                        </h1>

                        <p className="mt-3 text-sm sm:text-base text-[#65472D] max-w-xl">
                            Explore our comprehensive calendar of Bengali festivals, heritage
                            fairs, classical arts, and community celebrations.
                        </p>
                    </div>

                    <Link href="/create-event">
                        <Button className="h-11 px-6 rounded-full bg-[#064B38] hover:bg-[#064B38]/90 text-[#F7F1E3] text-xs sm:text-sm font-semibold shadow-md transition-all">
                            <PlusCircle className="size-4 mr-2" />
                            Create New Event
                        </Button>
                    </Link>
                </div>

                {/* Events Grid */}
                {events.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#C99A4B]/25 p-12 text-center max-w-lg mx-auto shadow-xl">
                        <div className="w-16 h-16 rounded-full bg-[#064B38]/10 text-[#064B38] flex items-center justify-center mx-auto mb-5">
                            <Calendar className="size-8" />
                        </div>
                        <h2
                            className="text-2xl font-bold text-[#064B38] mb-2"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            No Events Found Yet
                        </h2>
                        <p className="text-sm text-[#65472D] mb-6">
                            Be the first to create and publish a cultural gathering for our community!
                        </p>
                        <Link href="/create-event">
                            <Button className="rounded-full bg-[#064B38] text-[#F7F1E3] hover:bg-[#064B38]/85 px-6">
                                <Sparkles className="size-4 mr-2" />
                                Create First Event
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#C99A4B]/20">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#064B38]">
                                Showing {events.length} {events.length === 1 ? "Event" : "Events"}
                            </span>
                            <span className="text-[11px] text-[#65472D]/70 font-medium">
                                Live from MongoDB
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                            {events.map((event) => {
                                const category = event.category || "Festival";
                                const isCompleted = isCompletedEvent(
                                    event.date,
                                    event.endTime,
                                    event.isCompleted
                                );
                                const displayImage = event.imageUrl || event.image || "/Milanmela.png";

                                return (
                                    <div key={event._id} className="h-full">
                                        <EventCard
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
                                            isCompleted={isCompleted}
                                            image={displayImage}
                                            imageUrl={displayImage}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
