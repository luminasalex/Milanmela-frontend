import Link from "next/link";
import { Home, Search, ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                <div className="mb-6">
                    <h1
                        className="text-[120px] sm:text-[160px] font-bold leading-none text-[#064B38]/10 select-none"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        404
                    </h1>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4 -mt-24 sm:-mt-28">
                    <div className="bg-white rounded-full p-4 shadow-lg border border-[#C99A4B]/30">
                        <Calendar className="size-10 text-[#C83D2B]" />
                    </div>
                </div>

                {/* Message */}
                <div className="flex items-center justify-center gap-2 mb-2 text-[#C99A4B]">
                    <span className="text-xs">✦</span>
                    <span className="text-xs font-bold uppercase tracking-wider">
                        Page Not Found
                    </span>
                    <span className="text-xs">✦</span>
                </div>

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
                    <Button
                        asChild
                        className="w-full sm:w-auto rounded-full bg-[#064B38] hover:bg-[#064B38]/90 text-[#F7F1E3] font-semibold px-6"
                    >
                        <Link href="/">
                            <Home className="size-4 mr-2" />
                            Go Home
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="w-full sm:w-auto rounded-full border-[#C99A4B] text-[#064B38] hover:bg-[#C99A4B] hover:text-white font-semibold px-6"
                    >
                        <Link href="/events">
                            <Search className="size-4 mr-2" />
                            Browse Events
                        </Link>
                    </Button>
                </div>

                {/* Back link */}
                <Link
                    href="/events/manage"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#65472D] hover:text-[#064B38] mt-6 transition-colors"
                >
                    <ArrowLeft className="size-3.5" />
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}