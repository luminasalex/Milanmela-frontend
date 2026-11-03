import Link from "next/link";
import {  Calendar, Sparkles } from "lucide-react";
import EventCard from "@/components/home/EventCard";
import { Button } from "@/components/ui/button";
import {
    CATEGORY_COLORS,
    formatDate,
    formatTimeRange,
    isCompletedEvent,
    sortEventsByDate,
} from "@/lib/events";

export const dynamic = "force-dynamic";

export default async function AllEventsPage() {
    // 1. Backend theke shorasori data fetch kora (Beginner-friendly way)
    let rawEvents = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
            cache: "no-store", // notun event add korle jate sathe sathe update dekha jay
        });
        rawEvents = await res.json();
    } catch (error) {
        console.error("Events fetch korte problem hoyeche:", error);
    }

    // 2. Events gulo date onujayi sort kora
    const events = sortEventsByDate(rawEvents);

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

                    {/* <Link href="/create-event">
                        <Button className="h-11 px-6 rounded-full bg-[#064B38] hover:bg-[#064B38]/90 text-[#F7F1E3] text-xs sm:text-sm font-semibold shadow-md transition-all">
                            <PlusCircle className="size-4 mr-2" />
                            Create New Event
                        </Button>
                    </Link> */}
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
                                            id={event._id}
                                            _id={event._id}
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