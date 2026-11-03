import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    Tag,
} from "lucide-react";
import Image from "next/image";

interface EventItem {
    _id: string;
    title: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    category?: string;
    description?: string;
    imageUrl?: string;
    image?: string;
}

// ---------- Helpers (same as AllEventsPage) ----------
function formatDate(raw?: string): string {
    if (!raw) return "Date TBD";
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString("en-US", {
        weekday: "long",
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

function formatTimeRange(start?: string, end?: string): string {
    const s = formatTime12(start);
    const e = formatTime12(end);
    if (s && e) return `${s} – ${e}`;
    return s || e || "Time TBD";
}

const CATEGORY_COLORS: Record<string, string> = {
    Festival: "bg-[#C83D2B] text-white",
    Cultural: "bg-[#064B38] text-white",
    Heritage: "bg-[#C99A4B] text-[#064B38]",
    Music: "bg-[#064B38] text-white",
    Community: "bg-[#C83D2B] text-white",
    Other: "bg-[#064B38]/10 text-[#064B38]",
};

// ---------- Page ----------
const EventDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    let data: EventItem | null = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
            cache: "no-store",
        });

        // Fetch fail korle (event nai / invalid ObjectId / backend down) 404 dekhao
        if (!res.ok) {
            console.error("Failed to fetch event:", res.status);
        } else {
            data = await res.json();
        }
    } catch (error) {
        console.error("Error fetching event:", error);
    }

    if (!data || !data._id) notFound();

    const category = data.category || "Festival";
    const categoryColor =
        CATEGORY_COLORS[category] || "bg-[#064B38]/10 text-[#064B38]";
    const displayImage =
        data.imageUrl || data.image || "/Milanmela.png";

    return (
        <div className="min-h-screen bg-[#F7F1E3] relative overflow-hidden">
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C99A4B] via-[#064B38] to-[#C83D2B]" />

            {/* Subtle dot texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #064B38 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                {/* Back link */}
                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#064B38] hover:text-[#C83D2B] transition-colors mb-6"
                >
                    <ArrowLeft className="size-4" />
                    Back to All Events
                </Link>

                {/* Hero image */}
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-[#C99A4B]/25 bg-[#064B38]/5">
                    <Image
                        src={displayImage}
                        alt={data.title || "Event Image"}
                        fill
                        className="w-full h-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Category badge on image */}
                    <div className="absolute top-4 left-4">
                        <span
                            className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ${categoryColor}`}
                        >
                            <Tag className="size-3" />
                            {category}
                        </span>
                    </div>
                </div>

                {/* Title + meta */}
                <div className="mt-8 sm:mt-10">
                    <h1
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064B38] leading-tight"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {data.title || "Untitled Event"}
                    </h1>

                    <div className="flex items-center gap-3 mt-4">
                        <div className="h-px w-12 bg-[#C99A4B]" />
                        <span className="text-[#C99A4B]">✦</span>
                        <span className="text-xs font-bold tracking-widest text-[#C99A4B] uppercase">
                            Milanmela Event
                        </span>
                    </div>
                </div>

                {/* Info cards: date, time, location */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    <InfoCard
                        icon={<Calendar className="size-5" />}
                        label="Date"
                        value={formatDate(data.date)}
                    />
                    <InfoCard
                        icon={<Clock className="size-5" />}
                        label="Time"
                        value={formatTimeRange(data.startTime, data.endTime)}
                    />
                    <InfoCard
                        icon={<MapPin className="size-5" />}
                        label="Location"
                        value={data.location || "Location TBD"}
                    />
                </div>

                {/* Description */}
                <div className="mt-10 bg-white/70 backdrop-blur-sm rounded-3xl border border-[#C99A4B]/25 p-6 sm:p-8 shadow-lg">
                    <h2
                        className="text-xl sm:text-2xl font-bold text-[#064B38] mb-4"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        About This Event
                    </h2>
                    <p className="text-sm sm:text-base text-[#65472D] leading-relaxed whitespace-pre-line">
                        {data.description || "No description provided for this event."}
                    </p>
                </div>

                {/* CTA footer — Share button removed */}
                <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#064B38] rounded-3xl p-6 sm:p-8 text-[#F7F1E3] shadow-xl">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#C99A4B] mb-1">
                            Join us
                        </p>
                        <p
                            className="text-lg sm:text-xl font-semibold"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            Be part of this celebration
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 rounded-full bg-transparent border border-[#F7F1E3]/30 hover:bg-[#F7F1E3]/10 text-[#F7F1E3] text-sm font-semibold px-5 py-2.5 transition-colors"
                        >
                            More Events
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ---------- Small reusable info card ----------
function InfoCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-[#C99A4B]/25 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#064B38] mb-2">
                <div className="w-9 h-9 rounded-full bg-[#064B38]/10 flex items-center justify-center">
                    {icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C99A4B]">
                    {label}
                </span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-[#064B38] leading-snug">
                {value}
            </p>
        </div>
    );
}

export default EventDetailsPage;