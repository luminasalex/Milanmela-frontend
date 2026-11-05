"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  const language = useLanguage();
  const isBengali = language === "bn";

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#F7F1E3] min-h-[90vh] flex items-center"
    >
      {/* Alpana SVG background pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none bg-alpana bg-repeat"
        style={{ backgroundSize: "96px 96px" }}
      />

      {/* Decorative corner ornament top-left */}
      <div className="absolute top-0 left-0 w-56 h-56 opacity-10 pointer-events-none">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0 0 L120 0 L120 20 Q60 20 20 60 L0 120 Z" fill="#064B38" />
          <path d="M10 10 Q70 10 110 70 L110 10 Z" fill="#C99A4B" opacity="0.6" />
          <circle cx="12" cy="12" r="4" fill="#C83D2B" />
          <circle cx="30" cy="12" r="2" fill="#C99A4B" />
          <circle cx="12" cy="30" r="2" fill="#C99A4B" />
        </svg>
      </div>

      {/* Decorative corner ornament bottom-right */}
      <div className="absolute bottom-0 right-0 w-56 h-56 opacity-10 pointer-events-none rotate-180">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0 0 L120 0 L120 20 Q60 20 20 60 L0 120 Z" fill="#064B38" />
          <path d="M10 10 Q70 10 110 70 L110 10 Z" fill="#C99A4B" opacity="0.6" />
          <circle cx="12" cy="12" r="4" fill="#C83D2B" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Text Content */}
          <div className="flex flex-col items-start gap-6">
            {/* Label pill */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-[#C99A4B]/50 bg-white px-4 py-1.5 shadow-sm"
            >
              <span className="size-2 rounded-full bg-[#C83D2B] animate-pulse" />
              <span className={`text-xs font-semibold tracking-widest text-[#65472D] ${isBengali ? "" : "uppercase"}`}>
                {isBengali ? "কমিউনিটি সেবা প্ল্যাটফর্ম" : "COMMUNITY SERVICE PLATFORM"}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight text-[#064B38]"
              style={{ fontFamily: isBengali ? "var(--font-bengali)" : "var(--font-serif)" }}
            >
              {isBengali ? "একসাথে " : "Bring People Together "}
              <span className="relative inline-block">
                {isBengali ? "গড়ি" : "Through Action"}
                <span
                  className="absolute -bottom-1 left-0 w-full h-1 rounded-full bg-[#C99A4B]"
                />
              </span>{" "}
              <span className="text-[#C83D2B]">{isBengali ? "সুন্দর সমাজ" : "for Community"}</span>
            </motion.h1>

            {/* Bengali subtitle */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-lg text-[#064B38]/70"
              style={{ fontFamily: isBengali ? "var(--font-bengali)" : "inherit" }}
            >
              {isBengali
                ? "একসাথে কাজ করি, সুন্দর সমাজ গড়ি।"
                : "Let’s work together to build a better community."}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="max-w-lg text-base leading-relaxed text-[#65472D]"
            >
              {isBengali
                ? "পরিচ্ছন্নতা, বৃক্ষরোপণ, দান ও শিক্ষামূলক উদ্যোগে অংশ নিন। একটি আয়োজন তৈরি করুন, প্রতিবেশীদের আমন্ত্রণ জানান, আর একসাথে গড়ুন সুন্দর সমাজ।"
                : "Join local cleanups, tree planting, donation drives, and educational initiatives. Create an event, invite your neighbors, and make a difference together."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap gap-3 pt-2"
            >
              <a href="#upcoming-events">
                <Button
                  className="h-12 px-7 rounded-full bg-[#064B38] text-[#F7F1E3] hover:bg-[#064B38]/85 text-sm font-semibold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  {isBengali ? "আয়োজন দেখুন" : "Explore Events"}
                  <ArrowRight className="size-4 ml-1" />
                </Button>
              </a>
              <a href="#about">
                <Button
                  variant="outline"
                  className="h-12 px-7 rounded-full border-[#064B38] text-[#064B38] hover:bg-[#064B38]/5 text-sm font-semibold transition-all hover:-translate-y-0.5"
                >
                  <Play className="size-4 mr-1 fill-[#C83D2B] text-[#C83D2B]" />
                  {isBengali ? "আমাদের গল্প জানুন" : "Discover Our Story"}
                </Button>
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="flex flex-wrap gap-8 pt-4 border-t border-[#C99A4B]/30 mt-2"
            >
              {[
                {
                  value: isBengali ? "স্থানীয়" : "Local",
                  label: isBengali ? "আপনার আশেপাশের আয়োজন" : "Events Near You",
                },
                {
                  value: isBengali ? "সবার জন্য" : "Open",
                  label: isBengali ? "যে কেউ যোগ দিতে পারেন" : "Everyone Can Join",
                },
                {
                  value: isBengali ? "একসাথে" : "Together",
                  label: isBengali ? "আরও শক্তিশালী সমাজ" : "Stronger Communities",
                },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-2xl font-bold text-[#C83D2B]"
                    style={{ fontFamily: isBengali ? "var(--font-bengali)" : "var(--font-serif)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#65472D] font-medium tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            {/* Decorative golden ring */}
            <div className="absolute inset-0 m-auto w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-full border-[2px] border-dashed border-[#C99A4B]/40 animate-[spin_40s_linear_infinite]" />

            {/* Main image container */}
            <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden border-4 border-[#C99A4B]/50 shadow-2xl">
              <Image
                src="/Milanmela.png"
                alt={isBengali ? "মিলনমেলার কমিউনিটি সেবামূলক আয়োজন" : "Milanmela community service events"}
                fill
                className="object-cover object-center"
                priority
              />
              {/* Warm ivory overlay for brand consistency */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#064B38]/20 to-transparent" />
            </div>

            {/* Floating badge — top right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-0 md:right-4 flex items-center gap-2 bg-white rounded-2xl border border-[#C99A4B]/50 px-4 py-3 shadow-lg"
            >
              <span className="text-2xl">🪔</span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#064B38]">{isBengali ? "চলমান আয়োজন" : "Live Events"}</span>
                <span className="text-xs text-[#65472D]">{isBengali ? "এখনই সক্রিয়" : "Active Now"}</span>
              </div>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-4 left-0 md:left-4 flex items-center gap-2 bg-[#064B38] rounded-2xl px-4 py-3 shadow-lg"
            >
              <span className="text-2xl">🎭</span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#F7F1E3]">{isBengali ? "সাংস্কৃতিক ঐতিহ্য" : "Cultural Heritage"}</span>
                <span className="text-xs text-[#C99A4B]">{isBengali ? "২০১৬ সাল থেকে" : "Since 2016"}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill="#FFFFFF" opacity="0.5" />
        </svg>
      </div>
    </section>
  );
}
