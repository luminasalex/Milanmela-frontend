"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
    CalendarDays,
    Clock,
    MapPin,
    Tag,
    AlignLeft,
    Sparkles,
    CheckCircle2,
    ChevronDown,
    Palette,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/home/EventCard";

const CATEGORIES = [
    { label: "Festival", value: "Festival" },
    { label: "Cultural", value: "Cultural" },
    { label: "Heritage", value: "Heritage" },
    { label: "Music", value: "Music" },
    { label: "Community", value: "Community" },
    { label: "Other", value: "Other" },
];

const CATEGORY_COLORS: Record<string, string> = {
    Festival: "bg-[#C83D2B]/90 text-white",
    Cultural: "bg-[#064B38]/90 text-white",
    Heritage: "bg-[#C99A4B] text-[#064B38]",
    Music: "bg-[#064B38]/90 text-white",
    Community: "bg-[#C83D2B]/90 text-white",
    Other: "bg-[#064B38]/10 text-[#064B38]",
};

interface EventFormData {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    category: string;
    description: string;
}

const initialForm: EventFormData = {
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "Festival",
    description: "",
};

function formatDate(raw: string): string {
    if (!raw) return "";
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function formatTime12(hhmm: string): string {
    if (!hhmm || !hhmm.includes(":")) return "";
    const [h, m] = hhmm.split(":");
    const hour = parseInt(h, 10);
    if (isNaN(hour)) return hhmm;
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
}

function formatTimeRange(start: string, end: string): string {
    const s = formatTime12(start);
    const e = formatTime12(end);
    if (s && e) return `${s} – ${e}`;
    return s || e || "";
}

/**
 * Auto-complete detection based on date + end time.
 * Fully deterministic because inputs are HTML time pickers.
 */
function isEventCompleted(date: string, endTime: string): boolean {
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

export default function CreateEventPage() {
    const [form, setForm] = useState<EventFormData>(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Auto-detect completion based on date + end time
    const autoCompleted = useMemo(
        () => isEventCompleted(form.date, form.endTime),
        [form.date, form.endTime]
    );

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        const target = e.target;
        setForm((prev) => ({ ...prev, [target.name]: target.value }));
    }

    /** Quick preset: fill start & end time with common windows. */
    function applyPreset(start: string, end: string) {
        setForm((prev) => ({ ...prev, startTime: start, endTime: end }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setIsSubmitting(false);
        setSubmitted(true);
    }

    function handleReset() {
        setForm(initialForm);
        setSubmitted(false);
    }

    const previewCardProps = {
        title: form.title || "Baishakhi Mela 2026",
        date: formatDate(form.date) || "April 14, 2026",
        time: formatTimeRange(form.startTime, form.endTime) || "10:00 AM – 8:00 PM",
        location: form.location || "Ramna Park, Dhaka",
        category: form.category || "Festival",
        description:
            form.description ||
            "Celebrate traditional Bengali festivities with vibrant music, folk performances, artisan stalls, and authentic cuisine.",
        categoryColor:
            CATEGORY_COLORS[form.category] || "bg-[#C83D2B]/90 text-white",
        isCompleted: autoCompleted,
    };

    return (
        <div className="min-h-screen bg-[#F7F1E3] relative overflow-hidden py-12 lg:py-20">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C99A4B] via-[#064B38] to-[#C83D2B]" />

            {/* Background subtle texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #064B38 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Navigation back */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#064B38] hover:text-[#C83D2B] transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Home
                    </Link>
                </div>

                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#C99A4B]" />
                        <span className="text-[#C99A4B]">✦</span>
                        <span className="text-xs font-bold tracking-widest text-[#C99A4B] uppercase">
                            Host a Cultural Gathering
                        </span>
                        <span className="text-[#C99A4B]">✦</span>
                        <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#C99A4B]" />
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064B38]"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Create New Event
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-3 text-sm sm:text-base text-[#65472D] max-w-xl mx-auto"
                    >
                        Provide all details matching our event showcase card. Preview updates
                        in real-time as you compose your event.
                    </motion.p>
                </div>

                {submitted ? (
                    /* Submission Success State */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-xl mx-auto bg-white rounded-3xl border border-[#C99A4B]/30 shadow-xl p-8 sm:p-10 text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#064B38]/10 text-[#064B38] flex items-center justify-center mx-auto mb-5">
                            <CheckCircle2 className="size-8" />
                        </div>
                        <h2
                            className="text-2xl sm:text-3xl font-bold text-[#064B38] mb-2"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            Event Successfully Created!
                        </h2>
                        <p className="text-sm text-[#65472D] mb-8">
                            &ldquo;{form.title}&rdquo; has been registered with all card
                            details configured.
                        </p>

                        <div className="max-w-sm mx-auto mb-8 text-left">
                            <EventCard {...previewCardProps} />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                onClick={handleReset}
                                className="rounded-full bg-[#064B38] text-[#F7F1E3] hover:bg-[#064B38]/85 px-6"
                            >
                                Create Another Event
                            </Button>
                            <Link href="/">
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto rounded-full border-[#064B38] text-[#064B38] hover:bg-[#064B38] hover:text-[#F7F1E3] px-6"
                                >
                                    View on Home
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    /* Main Two-Column Layout */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* Form Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-7 bg-white rounded-3xl border border-[#C99A4B]/25 shadow-xl p-6 sm:p-8 md:p-10"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Event Title */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="title"
                                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#064B38]"
                                    >
                                        <Sparkles className="size-3.5 text-[#C99A4B]" />
                                        Event Title <span className="text-[#C83D2B]">*</span>
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        required
                                        value={form.title ?? ""}
                                        onChange={handleChange}
                                        placeholder="e.g. Poila Boishakh Grand Celebration"
                                        className="w-full h-11 px-4 rounded-xl border border-[#C99A4B]/35 bg-[#F7F1E3]/50 text-sm text-[#064B38] placeholder:text-[#65472D]/50 focus:outline-none focus:ring-2 focus:ring-[#064B38]/30 focus:border-[#064B38] transition-all"
                                    />
                                </div>

                                {/* Date */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="date"
                                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#064B38]"
                                    >
                                        <CalendarDays className="size-3.5 text-[#C99A4B]" />
                                        Event Date <span className="text-[#C83D2B]">*</span>
                                    </label>
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        required
                                        value={form.date ?? ""}
                                        onChange={handleChange}
                                        className="w-full h-11 px-4 rounded-xl border border-[#C99A4B]/35 bg-[#F7F1E3]/50 text-sm text-[#064B38] focus:outline-none focus:ring-2 focus:ring-[#064B38]/30 focus:border-[#064B38] transition-all"
                                    />
                                </div>

                                {/* Time Range — two native time pickers */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="startTime"
                                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#064B38]"
                                        >
                                            <Clock className="size-3.5 text-[#C99A4B]" />
                                            Event Time <span className="text-[#C83D2B]">*</span>
                                        </label>
                                        <span className="text-[11px] text-[#65472D]/60">
                                            {formatTimeRange(form.startTime ?? "", form.endTime ?? "") ||
                                                "start – end"}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase tracking-wider text-[#65472D]/70 font-semibold">
                                                Start
                                            </span>
                                            <input
                                                id="startTime"
                                                name="startTime"
                                                type="time"
                                                required
                                                value={form.startTime ?? ""}
                                                onChange={handleChange}
                                                className="w-full h-11 px-3 rounded-xl border border-[#C99A4B]/35 bg-[#F7F1E3]/50 text-sm text-[#064B38] focus:outline-none focus:ring-2 focus:ring-[#064B38]/30 focus:border-[#064B38] transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase tracking-wider text-[#65472D]/70 font-semibold">
                                                End
                                            </span>
                                            <input
                                                id="endTime"
                                                name="endTime"
                                                type="time"
                                                required
                                                value={form.endTime ?? ""}
                                                onChange={handleChange}
                                                className="w-full h-11 px-3 rounded-xl border border-[#C99A4B]/35 bg-[#F7F1E3]/50 text-sm text-[#064B38] focus:outline-none focus:ring-2 focus:ring-[#064B38]/30 focus:border-[#064B38] transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Quick presets */}
                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                        <span className="text-[10px] uppercase tracking-wider text-[#65472D]/60 font-semibold">
                                            Quick set:
                                        </span>
                                        {[
                                            { label: "Morning", start: "09:00", end: "12:00" },
                                            { label: "Afternoon", start: "12:00", end: "16:00" },
                                            { label: "Evening", start: "17:00", end: "21:00" },
                                            { label: "Full Day", start: "09:00", end: "21:00" },
                                        ].map((preset) => (
                                            <button
                                                key={preset.label}
                                                type="button"
                                                onClick={() => applyPreset(preset.start, preset.end)}
                                                className="px-3 h-7 rounded-full text-[11px] font-semibold border border-[#C99A4B]/40 text-[#064B38] bg-[#F7F1E3]/60 hover:bg-[#064B38] hover:text-[#F7F1E3] transition-colors"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Auto-completion notice */}
                                {form.date && form.endTime && (
                                    <div
                                        className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs transition-colors ${autoCompleted
                                                ? "bg-[#064B38]/5 border-[#064B38]/20 text-[#064B38]"
                                                : "bg-[#C99A4B]/5 border-[#C99A4B]/25 text-[#65472D]"
                                            }`}
                                    >
                                        <span
                                            className={`mt-0.5 font-bold ${autoCompleted ? "text-[#064B38]" : "text-[#C99A4B]"
                                                }`}
                                        >
                                            {autoCompleted ? "✓" : "ℹ"}
                                        </span>
                                        <span>
                                            {autoCompleted
                                                ? "This event is in the past — the card will automatically show as Completed with highlights CTA."
                                                : "The card will automatically switch to Completed once the event's end time has passed."}
                                        </span>
                                    </div>
                                )}

                                {/* Location */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="location"
                                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#064B38]"
                                    >
                                        <MapPin className="size-3.5 text-[#C83D2B]" />
                                        Venue / Location <span className="text-[#C83D2B]">*</span>
                                    </label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        required
                                        value={form.location ?? ""}
                                        onChange={handleChange}
                                        placeholder="e.g. Ramna Park, Dhaka"
                                        className="w-full h-11 px-4 rounded-xl border border-[#C99A4B]/35 bg-[#F7F1E3]/50 text-sm text-[#064B38] placeholder:text-[#65472D]/50 focus:outline-none focus:ring-2 focus:ring-[#064B38]/30 focus:border-[#064B38] transition-all"
                                    />
                                </div>

                                {/* Category Selection */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="category"
                                        className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#064B38]"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Tag className="size-3.5 text-[#C99A4B]" />
                                            Category <span className="text-[#C83D2B]">*</span>
                                        </span>
                                        <span className="flex items-center gap-1.5 text-[10px] lowercase text-[#65472D]/70 font-normal">
                                            <Palette className="size-3 text-[#C99A4B]" />
                                            auto styled badge
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="category"
                                            name="category"
                                            required
                                            value={form.category ?? ""}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 pr-10 rounded-xl border border-[#C99A4B]/35 bg-[#F7F1E3]/50 text-sm text-[#064B38] appearance-none focus:outline-none focus:ring-2 focus:ring-[#064B38]/30 focus:border-[#064B38] transition-all"
                                        >
                                            {CATEGORIES.map((cat) => (
                                                <option key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#65472D] pointer-events-none" />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="description"
                                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#064B38]"
                                        >
                                            <AlignLeft className="size-3.5 text-[#C99A4B]" />
                                            Event Description{" "}
                                            <span className="text-[#C83D2B]">*</span>
                                        </label>
                                        <span className="text-[11px] text-[#65472D]/60">
                                            {(form.description ?? "").length} chars
                                        </span>
                                    </div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        required
                                        rows={4}
                                        value={form.description ?? ""}
                                        onChange={handleChange}
                                        placeholder="Provide a rich summary of the celebration, performances, culinary highlights, or artisan showcases..."
                                        className="w-full p-4 rounded-xl border border-[#C99A4B]/35 bg-[#F7F1E3]/50 text-sm text-[#064B38] placeholder:text-[#65472D]/50 focus:outline-none focus:ring-2 focus:ring-[#064B38]/30 focus:border-[#064B38] transition-all resize-y"
                                    />
                                </div>

                                {/* Submit button */}
                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-12 rounded-full bg-[#064B38] hover:bg-[#064B38]/90 text-[#F7F1E3] font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all"
                                    >
                                        {isSubmitting ? "Creating Event..." : "Publish Event"}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>

                        {/* Live Preview Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="lg:col-span-5 lg:sticky lg:top-8"
                        >
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#C99A4B]/25 p-6 shadow-xl">
                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#C99A4B]/20">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-[#064B38]">
                                            Live Card Preview
                                        </span>
                                    </div>
                                    <span className="text-[11px] text-[#65472D]/70 font-medium">
                                        Same as home page card
                                    </span>
                                </div>

                                <div className="mx-auto max-w-sm">
                                    <EventCard {...previewCardProps} />
                                </div>

                                <div className="mt-5 p-3.5 rounded-xl bg-[#F7F1E3]/80 border border-[#C99A4B]/20 text-[11px] text-[#65472D] flex items-start gap-2">
                                    <span className="text-[#C99A4B] font-bold">ℹ</span>
                                    <span>
                                        The preview reflects card image overlay, custom category tag
                                        styling, date stamp, meta icons, and CTA button exact layout.
                                        Completed state is applied automatically based on date &amp;
                                        end time.
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}