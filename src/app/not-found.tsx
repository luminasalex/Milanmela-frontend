
import Link from "next/link";
import {
  Home,
  Search,
  ArrowLeft,
  CalendarX,
  Compass,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F1E3] flex items-center justify-center px-5 py-16">

      {/* Background Decorations */}
      <div className="absolute -top-32 -left-32 size-96 rounded-full bg-[#C99A4B]/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-[#064B38]/10 blur-3xl" />

      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#C99A4B] via-[#064B38] to-[#C83D2B]" />

      <div className="relative z-10 w-full max-w-2xl text-center">

        {/* Small Label */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C99A4B]/40 bg-white/60 px-4 py-2 mb-8">
          <Sparkles className="size-4 text-[#C99A4B]" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#064B38]">
            Something Went Wrong
          </span>
        </div>

        {/* 404 Number */}
        <div className="relative mb-6">
          <h1
            className="text-[150px] sm:text-[220px] font-black leading-none tracking-tighter text-[#064B38]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center pt-5">
            <div className="flex size-20 sm:size-28 items-center justify-center rounded-3xl rotate-12 bg-[#C83D2B] shadow-xl shadow-[#C83D2B]/20">
              <CalendarX className="size-10 sm:size-14 text-white -rotate-12" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#C83D2B]">
            Page Not Found
          </p>

          <h2
            className="text-3xl sm:text-5xl font-bold text-[#064B38]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Oops! Lost Your Way?
          </h2>

          <p className="mx-auto max-w-md text-sm sm:text-base leading-7 text-[#65472D]">
            Apni je page-ti khujchen seta hoyto remove hoye geche,
            rename hoyeche, othoba link-ti incorrect.
            Chinta korben na, apnake abar sothik jaygay niye jacchi!
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#064B38] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#064B38]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#04392B]"
          >
            <Home className="size-4" />
            Back to Home
          </Link>

          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C99A4B] bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#064B38] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C99A4B] hover:text-white"
          >
            <Search className="size-4" />
            Explore Events
          </Link>

        </div>

        {/* Bottom Link */}
        <div className="mt-12 border-t border-[#C99A4B]/30 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#65472D] transition-colors hover:text-[#064B38]"
          >
            <ArrowLeft className="size-4" />
            Return to Dashboard
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#65472D]/60">
          <Compass className="size-3.5" />
          <span>Don't worry, every great journey has a wrong turn.</span>
        </div>

      </div>
    </main>
  );
}
