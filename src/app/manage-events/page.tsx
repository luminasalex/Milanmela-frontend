"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Clock,
    MapPin,
    PlusCircle,
    Trash2,
    Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import {
    type EventItem,
    CATEGORY_COLORS,
    formatDate,
    formatTimeRange,
    isCompletedEvent,
} from "@/lib/events";
import { toast } from "react-toastify";

export default function ManageEventsPage() {
    // 1. Logged in user info
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // 2. States
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Delete popup er jonno selected event
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // 3. User er toiri kora events load kora
    useEffect(() => {
        if (isPending) return;

        if (!user?.email) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false);
            return;
        }

        // Backend theke logged in user er events niye ashi
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-events/${user.email}`, {
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((data) => {
                setEvents(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error loading events:", err);
                setLoading(false);
            });
    }, [user?.email, isPending]);

    // 4. Delete function (Popup theke "Yes, Delete" dile run hobe)
    async function handleDelete() {
        if (!selectedEvent?._id) return;

        setIsDeleting(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/events/${selectedEvent._id}`,
                {
                    method: "DELETE",
                }
            );

            if (res.ok) {
                toast.success("Event deleted successfully!");
                // UI theke delete kora event ta soriye fela
                setEvents(events.filter((item) => item._id !== selectedEvent._id));
                setSelectedEvent(null);
            } else {
                toast.error("Failed to delete event. Please try again.");
            }
        } catch (error) {
            console.log("Delete error:", error);
            toast.error("Failed to delete event. Please check backend connection.");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#F7F1E3] relative py-12 px-4 sm:px-6 lg:px-8">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C99A4B] via-[#064B38] to-[#C83D2B]" />

            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-[#C99A4B]">
                            <span className="text-xs">✦</span>
                            <span className="text-xs font-bold uppercase tracking-wider">
                                Organizer Dashboard
                            </span>
                        </div>

                        <h1
                            className="text-3xl sm:text-4xl font-bold text-[#064B38]"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            Manage My Events
                        </h1>

                        {user?.email && (
                            <p className="text-sm text-[#65472D] mt-1">
                                Events created by: <span className="font-semibold text-[#064B38]">{user.email}</span>
                            </p>
                        )}
                    </div>

                    <Link href="/create-event">
                        <Button className="rounded-full bg-[#064B38] hover:bg-[#064B38]/90 text-[#F7F1E3] font-semibold text-xs sm:text-sm">
                            <PlusCircle className="size-4 mr-2" />
                            Create New Event
                        </Button>
                    </Link>
                </div>

                {/* Content States */}
                {loading ? (
                    // Loading State
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((n) => (
                            <div
                                key={n}
                                className="h-80 bg-white/60 border border-[#C99A4B]/20 rounded-2xl animate-pulse"
                            />
                        ))}
                    </div>
                ) : !user ? (
                    // User Logged In na thakle
                    <div className="bg-white rounded-2xl border border-[#C99A4B]/30 p-10 text-center max-w-md mx-auto shadow-md">
                        <h2 className="text-xl font-bold text-[#064B38] mb-2">
                            Please Sign In
                        </h2>
                        <p className="text-xs text-[#65472D] mb-5">
                            You need to be signed in to see and manage your created events.
                        </p>
                        <Link href="/sing-in">
                            <Button className="rounded-full bg-[#064B38] text-[#F7F1E3]">
                                Go to Sign In
                            </Button>
                        </Link>
                    </div>
                ) : events.length === 0 ? (
                    // Event na thakle
                    <div className="bg-white rounded-2xl border border-[#C99A4B]/30 p-10 text-center max-w-md mx-auto shadow-md">
                        <Calendar className="size-10 text-[#C99A4B] mx-auto mb-3" />
                        <h2 className="text-xl font-bold text-[#064B38] mb-2">
                            No Events Created Yet
                        </h2>
                        <p className="text-xs text-[#65472D] mb-5">
                            You haven&apos;t created any events yet. Publish an event to manage it here!
                        </p>
                        <Link href="/create-event">
                            <Button className="rounded-full bg-[#064B38] text-[#F7F1E3]">
                                <PlusCircle className="size-4 mr-2" />
                                Create Event
                            </Button>
                        </Link>
                    </div>
                ) : (
                    // Events List Grid
                    <div>
                        <div className="mb-4 text-xs font-bold uppercase text-[#064B38]">
                            Total Events: {events.length}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event) => {
                                const category = event.category || "Festival";
                                const isCompleted = isCompletedEvent(
                                    event.date,
                                    event.endTime,
                                    event.isCompleted
                                );
                                const displayImage =
                                    event.imageUrl || event.image || "/Milanmela.png";

                                return (
                                    <div
                                        key={event._id}
                                        className="bg-white rounded-2xl border border-[#C99A4B]/30 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            {/* Image */}
                                            <div className="relative h-44 w-full bg-[#064B38]/10 overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={displayImage}
                                                    alt={event.title || "Event Image"}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src =
                                                            "/Milanmela.png";
                                                    }}
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <span
                                                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                                            CATEGORY_COLORS[category] ||
                                                            "bg-[#064B38] text-white"
                                                        }`}
                                                    >
                                                        {category}
                                                    </span>
                                                </div>
                                                <div className="absolute top-3 right-3">
                                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/90 text-[#064B38]">
                                                        {isCompleted ? "Completed" : "Upcoming"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="p-4 space-y-2">
                                                <h3
                                                    className="font-bold text-base text-[#064B38] line-clamp-1"
                                                    style={{ fontFamily: "var(--font-serif)" }}
                                                >
                                                    {event.title || "Untitled Event"}
                                                </h3>

                                                <div className="text-xs text-[#65472D] space-y-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="size-3.5 text-[#C99A4B]" />
                                                        <span>{formatDate(event.date)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="size-3.5 text-[#064B38]" />
                                                        <span>
                                                            {formatTimeRange(
                                                                event.startTime,
                                                                event.endTime,
                                                                event.time
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="size-3.5 text-[#C83D2B]" />
                                                        <span className="truncate">
                                                            {event.location || "Location TBD"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="p-4 pt-0 flex items-center gap-2">
                                            {/* View Details */}
                                            <Link
                                                href={`/events/${event._id}`}
                                                className="flex-1"
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="w-full h-9 rounded-xl border-[#064B38] text-[#064B38] text-xs font-semibold hover:bg-[#064B38] hover:text-[#F7F1E3]"
                                                >
                                                    <Eye className="size-3.5 mr-1" />
                                                    View Details
                                                </Button>
                                            </Link>

                                            {/* Delete Button (Popup open korbe) */}
                                            <Button
                                                variant="outline"
                                                onClick={() => setSelectedEvent(event)}
                                                className="h-9 px-3 rounded-xl border-[#C83D2B]/40 text-[#C83D2B] hover:bg-[#C83D2B] hover:text-white"
                                                title="Delete Event"
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* shadcn Dialog: Delete Confirmation Popup */}
            <Dialog
                open={!!selectedEvent}
                onOpenChange={(open) => {
                    if (!open) setSelectedEvent(null);
                }}
            >
                <DialogContent className="bg-white border border-[#C99A4B]/40 rounded-2xl p-6 sm:max-w-md shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-[#064B38]">
                            Delete Event
                        </DialogTitle>
                        <DialogDescription className="text-sm text-[#65472D] mt-2 leading-relaxed">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-[#C83D2B]">
                                &ldquo;{selectedEvent?.title || "this event"}&rdquo;
                            </span>
                            ? This action cannot be undone and will remove it permanently.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex flex-row justify-end gap-2 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setSelectedEvent(null)}
                            disabled={isDeleting}
                            className="rounded-xl border-[#064B38] text-[#064B38] text-xs"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="rounded-xl bg-[#C83D2B] hover:bg-[#C83D2B]/90 text-white font-semibold text-xs"
                        >
                            {isDeleting ? "Deleting..." : "Yes, Delete Event"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}