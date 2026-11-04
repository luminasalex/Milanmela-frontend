import Link from "next/link";
import {  Calendar, Sparkles } from "lucide-react";
import EventGrid from "@/components/home/EventGrid";
import { Button } from "@/components/ui/button";
import { sortEventsByDate } from "@/lib/events";

export const dynamic = "force-dynamic";

export default async function AllEventsPage() {
    // 1. Backend theke shorasori data fetch kora (Beginner-friendly way)
    let rawEvents = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/upcoming`, {
            cache: "no-store", // notun event add korle jate sathe sathe update dekha jay
        });
        if (!res.ok) {
            throw new Error(`Could not load upcoming events (${res.status}).`);
        }
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
                                Milanmela Upcoming Events
                            </span>
                        </div>

                        <h1
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064B38]"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            Upcoming Community Events
                        </h1>

                        <p className="mt-3 text-sm sm:text-base text-[#65472D] max-w-xl">
                            Find community service events in your area and take part in
                            making a positive difference.
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
                            No Upcoming Events Yet
                        </h2>
                        <p className="text-sm text-[#65472D] mb-6">
                            Be the first to create a community event and bring people together.
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
                        <EventGrid events={events} />
                    </div>
                )}
            </div>
        </div>
    );
}