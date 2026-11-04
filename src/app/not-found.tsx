import Link from "next/link";
import type { Metadata } from "next";
import { Home, Search, ArrowLeft, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "404 — Page Not Found | MilanMela",
    description: "The page you are looking for does not exist.",
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F7F1E3] relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C99A4B] via-[#064B38] to-[#C83D2B]" />

            {/* Decorative blurred circles */}
            <div className="absolute top-10 left-10 size-72 bg-[#C99A4B]/15 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 size-80 bg-[#064B38]/15 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-[#C83D2B]/5 rounded-full blur-3xl" />

            {/* Giant background 404 watermark */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                aria-hidden="true"
            >
                <span
                    className="text-[280px] sm:text-[400px] lg:text-[500px] font-bold leading-none text-[#064B38]/[0.04]"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    404
                </span>
            </div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-xl">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#C99A4B]/30 shadow-2xl shadow-[#064B38]/5 p-8 sm:p-10 text-center">
                    {/* Top icon + label row */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="h-px w-8 bg-[#C99A4B]/40" />
                        <div className="flex items-center gap-1.5 text-[#C99A4B]">
                            <Sparkles className="size-3" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                                Error 404
                            </span>
                            <Sparkles className="size-3" />
                        </div>
                        <div className="h-px w-8 bg-[#C99A4B]/40" />
                    </div>

                    {/* Floating icon */}
                    <div className="relative mx-auto w-fit mb-6">
                        <div className="absolute inset-0 bg-[#C83D2B]/20 rounded-full blur-xl scale-150" />
                        <div className="relative bg-gradient-to-br from-white to-[#F7F1E3] rounded-2xl p-5 shadow-lg border border-[#C99A4B]/40 rotate-3 hover:rotate-0 transition-transform duration-500">
                            <Calendar className="size-12 text-[#C83D2B]" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1
                        className="text-3xl sm:text-4xl font-bold text-[#064B38] mb-3 leading-tight"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Ei page ta khuje paini
                    </h1>

                    {/* Subtext */}
                    <p className="text-sm text-[#65472D] leading-relaxed max-w-md mx-auto mb-8">
                        Apni jei page ta khujchen seta hoyto{" "}
                        <span className="font-semibold text-[#064B38]">
                            remove hoye geche
                        </span>
                        , naam change hoyeche, ba kokhono chilo i na. Chinta korben
                        na — niche theke apnar jonno kichu option ache!
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                        <Button
                            asChild
                            className="w-full sm:w-auto rounded-full bg-[#064B38] hover:bg-[#064B38]/90 text-[#F7F1E3] font-semibold px-6 h-11 shadow-md shadow-[#064B38]/20 hover:shadow-lg hover:shadow-[#064B38]/30 transition-all"
                        >
                            <Link href="/">
                                <Home className="size-4 mr-2" />
                                Go Home
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="w-full sm:w-auto rounded-full border-[#C99A4B] text-[#064B38] hover:bg-[#C99A4B] hover:text-white font-semibold px-6 h-11 transition-all"
                        >
                            <Link href="/events">
                                <Search className="size-4 mr-2" />
                                Browse Events
                            </Link>
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="h-px flex-1 bg-[#C99A4B]/30" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#65472D]/60">
                            or
                        </span>
                        <div className="h-px flex-1 bg-[#C99A4B]/30" />
                    </div>

                    {/* Back link */}
                    <Link
                        href="/events/manage"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#65472D] hover:text-[#064B38] transition-colors group"
                    >
                        <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Dashboard
                    </Link>
                </div>

                {/* Bottom decorative text */}
                <p className="text-center text-[10px] text-[#65472D]/60 mt-6 font-medium uppercase tracking-widest">
                    MilanMela · Event Platform
                </p>
            </div>
        </div>
    );
}