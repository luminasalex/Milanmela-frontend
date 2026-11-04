import Link from "next/link";
import type { Metadata } from "next";
import { Home, Search, Calendar } from "lucide-react";

export const metadata: Metadata = {
    title: "404 — Page Not Found | MilanMela",
    description: "The page you are looking for does not exist.",
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F7F1E3] relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C99A4B] via-[#064B38] to-[#C83D2B]" />

            {/* Decorative background circles */}
            <div className="absolute top-20 left-10 size-64 bg-[#C99A4B]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 size-72 bg-[#064B38]/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-lg w-full text-center">
                {/* Big 404 */}
                <h1
                    className="text-[120px] sm:text-[160px] font-bold leading-none text-[#064B38]/10 select-none"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    404
                </h1>

                {/* Icon */}
                <div className="flex justify-center mb-4 -mt-24 sm:-mt-28">
                    <div className="bg-white rounded-full p-4 shadow-lg border border-[#C99A4B]/30">
                        <Calendar className="size-10 text-[#C83D2B]" />
                    </div>
                </div>

                {/* Label */}
                <div className="flex items-center justify-center gap-2 mb-2 text-[#C99A4B]">
                    <span className="text-xs">✦</span>
                    <span className="text-xs font-bold uppercase tracking-wider">
                        Page Not Found
                    </span>
                    <span className="text-xs">✦</span>
                </div>

                {/* Heading */}
                <h2
                    className="text-3xl sm:text-4xl font-bold text-[#064B38] mb-3"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    Oops! Ei page ta khuje paini
                </h2>

                <p className="text-sm text-[#65472D] mb-8 leading-relaxed max-w-md mx-auto">
                    Apni jei page ta khujchen seta hoyto remove hoye geche, naam
                    change hoyeche, ba kokhono chilo i na. Chinta korben na — niche
                    theke apnar jonno kichu option ache!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="w-full sm:w-auto rounded-full bg-[#064B38] hover:bg-[#064B38]/90 text-[#F7F1E3] font-semibold px-6"
                    >
                        <Home className="size-4 mr-2" />
                        Go Home
                    </Link>

                    <Link
                        href="/events"
                        className="w-full sm:w-auto rounded-full border-[#C99A4B] text-[#064B38] hover:bg-[#C99A4B] hover:text-white font-semibold px-6"
                    >
                        <Search className="size-4 mr-2" />
                        Browse Events
                    </Link>
                </div>


            </div>
        </div>
    );
}