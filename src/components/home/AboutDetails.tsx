"use client";

import { motion } from "framer-motion";
import { Landmark, Network, Sparkles, BookMarked } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const bengaliDetails = [
  {
    icon: Landmark,
    title: "সাংস্কৃতিক ঐতিহ্য",
    value: "৫০০+ বছর",
    description:
      "বাঙালির লোকশিল্প, সংগীত ও গল্প বলার চিরায়ত ঐতিহ্যে আমাদের শিকড়, যা যুগে যুগে পরিচয় গড়েছে।",
    accentColor: "text-[#064B38]",
    iconBg: "bg-[#064B38]/10",
    borderColor: "border-[#064B38]/20",
  },
  {
    icon: Network,
    title: "সম্প্রদায়ের বন্ধন",
    value: "১০,০০০+",
    description:
      "বাঙালি সংস্কৃতিপ্রেমী, শিল্পী ও পরিবারের প্রাণবন্ত এক নেটওয়ার্ক—একই ভালোবাসা ও ঐতিহ্যে যুক্ত।",
    accentColor: "text-[#C83D2B]",
    iconBg: "bg-[#C83D2B]/10",
    borderColor: "border-[#C83D2B]/20",
  },
  {
    icon: Sparkles,
    title: "আয়োজনের অভিজ্ঞতা",
    value: "৫০+ আয়োজন",
    description:
      "ছোট মিলনমেলা থেকে বড় উৎসব—প্রতিটি আয়োজন সাজানো হয় স্মরণীয় অভিজ্ঞতার জন্য।",
    accentColor: "text-[#C99A4B]",
    iconBg: "bg-[#C99A4B]/15",
    borderColor: "border-[#C99A4B]/25",
  },
  {
    icon: BookMarked,
    title: "ভাগ করে নেওয়া স্মৃতি",
    value: "১০০০+ গল্প",
    description:
      "আমাদের ছবির সংগ্রহ প্রতিটি উদ্‌যাপনের সৌন্দর্য ধরে রাখে—প্রজন্মের জন্য সংরক্ষণ করে বাঙালির সম্মিলিত স্মৃতি।",
    accentColor: "text-[#65472D]",
    iconBg: "bg-[#65472D]/10",
    borderColor: "border-[#65472D]/20",
  },
];

const englishDetails = [
  {
    icon: Landmark,
    title: "Cultural Heritage",
    value: "500+ Years",
    description:
      "Rooted in the timeless traditions of Bengali folk art, music, and storytelling that have shaped our identity for centuries.",
    accentColor: "text-[#064B38]",
    iconBg: "bg-[#064B38]/10",
    borderColor: "border-[#064B38]/20",
  },
  {
    icon: Network,
    title: "Community Connections",
    value: "10,000+",
    description:
      "A thriving network of Bengali culture enthusiasts, artists, and families united by shared passion and tradition.",
    accentColor: "text-[#C83D2B]",
    iconBg: "bg-[#C83D2B]/10",
    borderColor: "border-[#C83D2B]/20",
  },
  {
    icon: Sparkles,
    title: "Event Experiences",
    value: "50+ Events",
    description:
      "From intimate gatherings to grand festivals — every Milanmela event is crafted for unforgettable impact.",
    accentColor: "text-[#C99A4B]",
    iconBg: "bg-[#C99A4B]/15",
    borderColor: "border-[#C99A4B]/25",
  },
  {
    icon: BookMarked,
    title: "Shared Memories",
    value: "1000+ Stories",
    description:
      "Our gallery archive captures the beauty of every celebration, preserving collective Bengali memories for generations.",
    accentColor: "text-[#65472D]",
    iconBg: "bg-[#65472D]/10",
    borderColor: "border-[#65472D]/20",
  },
];

export default function AboutDetails() {
  const isBengali = useLanguage() === "bn";
  const details = isBengali ? bengaliDetails : englishDetails;

  return (
    <section
      id="about-details"
      className="relative w-full bg-[#F7F1E3] py-20 lg:py-24 overflow-hidden"
    >
      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-alpana bg-repeat" style={{ backgroundSize: "80px 80px" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C99A4B]" />
            <span className="text-[#C99A4B]">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C99A4B]" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-[#064B38] mb-3"
            style={{ fontFamily: isBengali ? "var(--font-bengali)" : "var(--font-serif)" }}
          >
            {isBengali ? "যে বৈশিষ্ট্যে আমরা " : "What Makes Us "}
            <span className="text-[#C83D2B]">Milanmela</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-[#65472D] max-w-md mx-auto"
          >
            {isBengali
              ? "আমাদের লক্ষ্য ও একসঙ্গে গড়ে তোলা প্রতিটি সাংস্কৃতিক অভিজ্ঞতার চারটি ভিত্তি।"
              : "Four pillars that define our mission and guide every cultural experience we create together."}
          </motion.p>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
          {details.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={`group flex flex-col gap-4 rounded-2xl border ${item.borderColor} bg-white p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div
                  className={`inline-flex size-12 items-center justify-center rounded-xl ${item.iconBg} transition-transform group-hover:scale-110`}
                >
                  <Icon className={`size-6 ${item.accentColor}`} />
                </div>

                {/* Value */}
                <div>
                  <p
                    className={`text-2xl font-bold ${item.accentColor}`}
                    style={{ fontFamily: isBengali ? "var(--font-bengali)" : "var(--font-serif)" }}
                  >
                    {item.value}
                  </p>
                  <h3 className="text-sm font-semibold text-[#064B38] mt-0.5">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-[#65472D] leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom accent */}
                <div className={`mt-auto h-0.5 w-10 rounded-full ${item.iconBg} group-hover:w-full transition-all duration-500`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
