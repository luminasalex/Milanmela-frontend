"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";

const highlights = [
  "পরিচ্ছন্নতা, বৃক্ষরোপণ, দান ও শিক্ষামূলক আয়োজন তৈরি করুন",
  "সমাজের পাশে দাঁড়াতে আগ্রহী প্রতিবেশীদের সঙ্গে যুক্ত হোন",
  "আসন্ন আয়োজনে যোগ দিন এবং আপনার অংশগ্রহণের হিসাব রাখুন",
  "নিজের আয়োজন পরিচালনা করুন ও যেকোনো সময় তথ্য হালনাগাদ করুন",
];

export default function AboutSection() {
  const isBengali = useLanguage() === "bn";
  const visibleHighlights = isBengali
    ? highlights
    : [
        "Create local cleanup, plantation, donation, and education events",
        "Connect neighbors who want to support their community",
        "Join upcoming events and keep track of your commitments",
        "Manage your events and update their details at any time",
      ];

  return (
    <section
      id="about"
      className="relative w-full bg-[#F7F1E3] py-20 lg:py-28 overflow-hidden"
    >
      {/* Decorative left strip */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#C99A4B] via-[#064B38] to-[#C83D2B]" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-alpana bg-repeat" style={{ backgroundSize: "80px 80px" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: "easeOut" as const }}
            className="relative flex justify-center lg:justify-start"
          >
            {/* Main image frame */}
            <div className="relative w-full max-w-md aspect-square">
              {/* Decorative golden border frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#C99A4B]/40 rounded-2xl" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#C83D2B]/20 rounded-2xl" />

              {/* Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/about-community.jpg"
                  alt={
                    isBengali
                      ? "কমিউনিটির একটি আয়োজনে প্রতিবেশীদের একসঙ্গে উদ্‌যাপন"
                      : "Neighbors celebrating together at a community event"
                  }
                  fill
                  className="object-cover object-center"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#064B38]/10 to-transparent" />
              </div>

              {/* Floating stats card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-[#064B38] text-[#F7F1E3] rounded-2xl px-6 py-4 shadow-xl"
              >
                <p
                  className="text-3xl font-bold"
                  style={{ fontFamily: isBengali ? "var(--font-bengali)" : "var(--font-serif)" }}
                >
                  {isBengali ? "৮+" : "8+"}
                </p>
                <p className="text-xs text-[#C99A4B] tracking-wide mt-0.5">
                  {isBengali ? "একসাথে সক্রিয় প্রতিবেশী" : "Neighbors in Action"}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: "easeOut" as const, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Section label */}
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#C99A4B]" />
              <span className="text-xs font-bold tracking-widest text-[#C99A4B] uppercase">
                {isBengali ? "মিলনমেলা সম্পর্কে" : "About Milanmela"}
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#064B38] leading-tight"
              style={{ fontFamily: isBengali ? "var(--font-bengali)" : "var(--font-serif)" }}
            >
              {isBengali ? "সাহায্যে এগিয়ে আসা মানুষের" : "A Community Space for"}
              <br />
              <span className="text-[#C83D2B]">
                {isBengali ? "একটি মিলনস্থল" : "People Ready to Help"}
              </span>
            </h2>

            {/* Bengali tagline */}
            <p
              className="text-base text-[#064B38]/70 italic"
              style={{ fontFamily: isBengali ? "var(--font-bengali)" : "inherit" }}
            >
              {isBengali
                ? "একসাথে কাজ করি, সুন্দর সমাজ গড়ি"
                : "Let’s work together to build a better community"}
            </p>

            {/* Body */}
            <p className="text-[#65472D] leading-relaxed text-sm">
              {isBengali
                ? "মিলনমেলা মানুষের ভালো ইচ্ছাকে স্থানীয় উদ্যোগে রূপ দিতে সাহায্য করে। সেবামূলক আয়োজন খুঁজুন, স্বেচ্ছাসেবার সুযোগ নিন, অথবা প্রতিবেশীদের একত্র করে নতুন আয়োজন তৈরি করুন।"
                : "Milanmela helps people turn good intentions into local action. Discover community service events, find opportunities to volunteer, or create an event that brings neighbors together."}
            </p>
            <p className="text-[#65472D] leading-relaxed text-sm">
              {isBengali
                ? "পরিচ্ছন্নতা অভিযান, বৃক্ষরোপণ কিংবা অনুদান সংগ্রহ—প্রতিটি আয়োজনেই সমাজের জন্য অবদান রাখার সুযোগ রয়েছে।"
                : "Whether it is a neighborhood cleanup, a tree-planting day, or a donation drive, every event gives people a simple way to contribute."}
            </p>

            {/* Highlights */}
            <ul className="flex flex-col gap-3">
              {visibleHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#65472D]">
                  <CheckCircle2 className="size-5 mt-0.5 shrink-0 text-[#064B38]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#upcoming-events">
                <Button
                  className="h-11 px-6 rounded-full bg-[#064B38] text-[#F7F1E3] hover:bg-[#064B38]/85 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  {isBengali ? "আরও জানুন" : "Learn More"}
                  <ArrowRight className="size-4 ml-1" />
                </Button>
              </a>
              <div className="h-px flex-1 bg-[#C99A4B]/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
