"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Sparkles } from "lucide-react";
import EventCard from "@/components/home/EventCard";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
    CATEGORY_COLORS,
    formatDate,
    formatTimeRange,
    isCompletedEvent,
    sortEventsByDate,
    type EventItem,
} from "@/lib/events";
import { getJoinedEvents } from "@/lib/joined-events";
import { toast } from "react-toastify";

export default function JoinedEventsPage() {
    const { data: session, isPending } = authClient.useSession();
    const email = session?.user?.email;
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loadedForEmail, setLoadedForEmail] = useState<string | null>(null);

    useEffect(() => {
        if (isPending || !email) return;

        let cancelled = false;
        getJoinedEvents(email)
            .then((joinedEvents) => {
                if (!cancelled) {
                    setEvents(sortEventsByDate(joinedEvents));
                    setLoadedForEmail(email);
                }
            })
            .catch((error: unknown) => {
                console.error("Could not load joined events:", error);
                if (!cancelled) {
                    setEvents([]);
                    setLoadedForEmail(email);
                    toast.error("Could not load your joined events. Please try again.");
                }
            });

        return () => {
            cancelled = true;
        };
    }, [email, isPending]);

    const isLoading = isPending || (!!email && loadedForEmail !== email);

    return (
        <main className="min-h-screen bg-[#F7F1E3] relative overflow-hidden py-12 lg:py-20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C99A4B] via-[#064B38] to-[#C83D2B]" />
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{
                    backgroundImage: "radial-gradient(circle, #064B38 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="mb-10 sm:mb-14">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-12 bg-[#C99A4B]" />
                        <span className="text-xs font-bold tracking-widest text-[#C99A4B] uppercase">
                            Your Milanmela Schedule
                        </span>
                    </div>
                    <h1
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064B38]"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        My Joined Events
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-[#65472D] max-w-xl">
                        Keep track of the cultural gatherings you have joined.
                    </p>
                </header>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-96 rounded-2xl border border-[#C99A4B]/25 bg-white animate-pulse"
                            />
                        ))}
                    </div>
                ) : !email ? (
                    <div className="max-w-lg mx-auto rounded-3xl border border-[#C99A4B]/25 bg-white p-10 text-center shadow-lg">
                        <h2 className="text-xl font-bold text-[#064B38] mb-2">
                            Sign in to view your events
                        </h2>
                        <p className="text-sm text-[#65472D] mb-6">
                            Your joined events are saved to your account.
                        </p>
                        <Link href="/sing-in">
                            <Button className="rounded-full bg-[#064B38] text-[#F7F1E3]">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                ) : events.length === 0 ? (
                    <div className="max-w-lg mx-auto rounded-3xl border border-[#C99A4B]/25 bg-white p-10 text-center shadow-lg">
                        <CalendarDays className="size-10 text-[#C99A4B] mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-[#064B38] mb-2">
                            You haven&apos;t joined any events yet
                        </h2>
                        <p className="text-sm text-[#65472D] mb-6">
                            Browse the event schedule and join the gatherings you would like to attend.
                        </p>
                        <Link href="/events">
                            <Button className="rounded-full bg-[#064B38] text-[#F7F1E3]">
                                <Sparkles className="size-4 mr-2" />
                                Browse Events
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <section aria-label="Events you have joined">
                        <p className="mb-6 pb-3 border-b border-[#C99A4B]/20 text-xs font-bold uppercase tracking-wider text-[#064B38]">
                            {events.length} {events.length === 1 ? "Event" : "Events"}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                            {events.map((event) => {
                                const category = event.category || "Festival";
                                const image = event.imageUrl || event.image || "/Milanmela.png";

                                return (
                                    <EventCard
                                        key={event._id}
                                        id={event._id}
                                        title={event.title}
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
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}