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
    ChevronDown,
    Palette,
    ArrowLeft,
    ImageIcon,
    Link2,
    X,
} from "lucide-react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // react-toastify v11 hole ei line lagbe na
import { Button } from "@/components/ui/button";
import EventCard from "@/components/home/EventCard";
import { useSession } from "@/lib/auth-client";

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

const DEFAULT_IMAGE = "/Milanmela.png";

interface EventFormData {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    category: string;
    description: string;
    imageUrl: string;
}

const initialForm: EventFormData = {
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "",
    description: "",
    imageUrl: "",
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

// Ajker date "YYYY-MM-DD" format e return kore (local time)
function getTodayISO(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// Date ta past kina check kore
function isPastDate(dateStr: string): boolean {
    if (!dateStr) return false;
    const selected = new Date(dateStr);
    if (isNaN(selected.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected < today;
}

// Async helper: validate that an image URL actually loads (with 2.5s timeout)
async function validateImageUrl(url: string): Promise<boolean> {
    if (!url) return true;
    return new Promise((resolve) => {
        const img = new window.Image();
        const timer = setTimeout(() => {
            img.onload = null;
            img.onerror = null;
            resolve(false);
        }, 2500);

        img.onload = () => {
            clearTimeout(timer);
            resolve(true);
        };
        img.onerror = () => {
            clearTimeout(timer);
            resolve(false);
        };
        img.src = url;
    });
}

async function saveEvent(data: EventFormData, creatorEmail?: string) {
    const res = await fetch("http://localhost:5000/create-event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...data,
            creatorEmail: creatorEmail || "",
        }),
    });

    if (!res.ok) {
        throw new Error(`Server returned error: ${res.status}`);
    }

    const result = await res.json();
    return result;
}

export default function CreateEventPage() {
    const [form, setForm] = useState<EventFormData>(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { data: session } = useSession();
    const { user } = session || {};

    const autoCompleted = useMemo(
        () => isEventCompleted(form.date, form.endTime),
        [form.date, form.endTime]
    );

    const previewImage = form.imageUrl?.trim() || DEFAULT_IMAGE;

    // past date hole form invalid
    const isFormValid =
        form.title.trim() !== "" &&
        form.date.trim() !== "" &&
        form.startTime.trim() !== "" &&
        form.endTime.trim() !== "" &&
        form.location.trim() !== "" &&
        form.category.trim() !== "" &&
        form.description.trim() !== "" &&
        !isPastDate(form.date);

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        const target = e.target;
        const { name, value } = target;

        setForm((prev) => ({ ...prev, [name]: value }));

        if (name === "imageUrl") {
            setImageError(false);
        }
    }

    function applyPreset(start: string, end: string) {
        setForm((prev) => ({ ...prev, startTime: start, endTime: end }));
    }

    function clearImage() {
        setForm((prev) => ({ ...prev, imageUrl: "" }));
        setImageError(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isFormValid || isSubmitting) return;

        // Past date safety check
        if (isPastDate(form.date)) {
            const msg =
                "You cannot create an event in the past. Please select today or a future date.";
            setSubmitError(msg);
            toast.error(msg);
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Validate image URL before submitting
            if (form.imageUrl.trim()) {
                const imageOk = await validateImageUrl(form.imageUrl.trim());
                if (!imageOk) {
                    setImageError(true);
                    throw new Error("The cover image URL could not be loaded.");
                }
            }

            // Save event to database with logged-in user email
            await saveEvent(form, user?.email);

            toast.success("Event created successfully! 🎉");
            setForm(initialForm); // form reset
            setImageError(false);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Something went wrong.";
            setSubmitError(message);
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const previewCardProps = {
        title: form.title,
        date: formatDate(form.date),
        time: formatTimeRange(form.startTime, form.endTime),
        location: form.location,
        category: form.category,
        description: form.description,
        categoryColor:
            CATEGORY_COLORS[form.category] || "bg-[#064B38]/10 text-[#064B38]",
        isCompleted: autoCompleted,
        image: previewImage,
        imageUrl: previewImage,
    };

    return (
        <div className="min-h-screen bg-[#F7F1E3] relative overflow-hidden py-12 lg:py-20">
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />

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

                {/* Main Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Form Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-7 bg-white rounded-3xl border border-[#C99A4B]/25 shadow-xl p-6 sm:p-8 md:p-10"
                    >
                        <form onSubmit={handleSubmit} noValidate className="space-y-6">
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

                            {/* Cover Image by URL only */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="imageUrl"
                                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#064B38]"
                                    >
                                        <ImageIcon className="size-3.5 text-[#C99A4B]" />
                                        Cover Image URL
                                    </label>
                                    <span className="text-[10px] lowercase text-[#65472D]/60">
                                        paste a public image link
                                    </span>
                                </div>

                                <div className="flex items-stretch gap-3">
                                    {/* Thumbnail preview */}
                                    <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-[#C99A4B]/35 bg-[#F7F1E3]/60">
                                        {previewImage && !imageError ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={previewImage}
                                                alt="Cover preview"
                                                className="w-full h-full object-cover"
                                                onError={() => setImageError(true)}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#C99A4B]">
                                                <ImageIcon className="size-6" />
                                            </div>
                                        )}
                                    </div>

                                    {/* URL input */}
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#C99A4B] pointer-events-none" />
                                            <input
                                                id="imageUrl"
                                                name="imageUrl"
                                                type="url"
                                                value={form.imageUrl ?? ""}
                                                onChange={handleChange}
                                                placeholder="https://example.com/event-image.jpg"
                                                className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#C99A4B]/35 bg-[#F7F1E3]/50 text-sm text-[#064B38] placeholder:text-[#65472D]/50 focus:outline-none focus:ring-2 focus:ring-[#064B38]/30 focus:border-[#064B38] transition-all"
                                            />
                                            {form.imageUrl && (
                                                <button
                                                    type="button"
                                                    onClick={clearImage}
                                                    aria-label="Clear image"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 size-7 rounded-full flex items-center justify-center text-[#65472D]/70 hover:bg-[#C83D2B]/10 hover:text-[#C83D2B] transition-colors"
                                                >
                                                    <X className="size-4" />
                                                </button>
                                            )}
                                        </div>
                                        <p className="mt-1.5 text-[10px] text-[#65472D]/60">
                                            Leave empty to use the default Milanmela image.
                                        </p>
                                    </div>
                                </div>

                                {/* Preset image suggestions */}
                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                    <span className="text-[10px] uppercase tracking-wider text-[#65472D]/60 font-semibold">
                                        Sample:
                                    </span>
                                    {[
                                        { label: "Festival", url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800" },
                                        { label: "Cultural", url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800" },
                                        { label: "Craft Fair", url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800" },
                                    ].map((p) => (
                                        <button
                                            key={p.label}
                                            type="button"
                                            onClick={async () => {
                                                setForm((prev) => ({ ...prev, imageUrl: p.url }));
                                                setImageError(false);
                                                const ok = await validateImageUrl(p.url);
                                                if (!ok) setImageError(true);
                                            }}
                                            className="px-2.5 h-6 rounded-full text-[10px] font-semibold border border-[#C99A4B]/40 text-[#064B38] bg-[#F7F1E3]/60 hover:bg-[#064B38] hover:text-[#F7F1E3] transition-colors"
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>

                                {imageError && (
                                    <p className="text-[11px] text-[#C83D2B] flex items-center gap-1.5">
                                        <span>⚠</span> Couldn&apos;t load this image. Check the URL and try again.
                                    </p>
                                )}
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
                                    min={getTodayISO()}
                                    value={form.date ?? ""}
                                    onChange={handleChange}
                                    className="w-full h-11 px-4 rounded-xl border border-[#C99A4B]/35 bg-[#F7F1E3]/50 text-sm text-[#064B38] focus:outline-none focus:ring-2 focus:ring-[#064B38]/30 focus:border-[#064B38] transition-all"
                                />
                                {form.date && isPastDate(form.date) && (
                                    <p className="text-[11px] text-[#C83D2B] flex items-center gap-1.5">
                                        <span>⚠</span> Past date is not allowed. Please select today or a future date.
                                    </p>
                                )}
                            </div>

                            {/* Time Range */}
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

                            {/* Category */}
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
                                        <option value="" disabled>
                                            Select a category
                                        </option>
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

                            {/* Submit */}
                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !isFormValid}
                                    className="w-full h-12 rounded-full bg-[#064B38] hover:bg-[#064B38]/90 text-[#F7F1E3] font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Creating Event..." : "Publish Event"}
                                </Button>

                                {submitError && (
                                    <p className="mt-2 text-[11px] text-center text-[#C83D2B]">
                                        ⚠ {submitError}
                                    </p>
                                )}

                                {!isFormValid && !submitError && (
                                    <p className="mt-2 text-[11px] text-center text-[#C83D2B]/70">
                                        Please fill all required fields to publish.
                                    </p>
                                )}
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
            </div>
        </div>
    );
}
