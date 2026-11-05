"use client";

import { motion } from "framer-motion";
import { Users, CalendarDays, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/LanguageProvider";

const features = [
  {
    icon: Users,
    iconBg: "bg-[#064B38]/10",
    iconColor: "text-[#064B38]",
    accentColor: "border-t-[#064B38]",
    title: "সমাজের জন্য উদ্যোগ",
    description:
      "পরিচ্ছন্নতা, বৃক্ষরোপণ, দানসহ নানা কল্যাণমূলক কাজে প্রতিবেশীদের এক করুন।",
    badge: "সম্প্রদায়",
    badgeColor: "bg-[#064B38]/10 text-[#064B38]",
  },
  {
    icon: CalendarDays,
    iconBg: "bg-[#C83D2B]/10",
    iconColor: "text-[#C83D2B]",
    accentColor: "border-t-[#C83D2B]",
    title: "আসন্ন আয়োজন",
    description:
      "আপনার এলাকার আসন্ন স্বেচ্ছাসেবামূলক আয়োজন খুঁজে নিন এবং যোগ দিন।",
    badge: "আয়োজন",
    badgeColor: "bg-[#C83D2B]/10 text-[#C83D2B]",
  },
  {
    icon: ImageIcon,
    iconBg: "bg-[#C99A4B]/15",
    iconColor: "text-[#65472D]",
    accentColor: "border-t-[#C99A4B]",
    title: "স্মৃতি ও প্রদর্শনী",
    description:
      "আগের সেবামূলক আয়োজনের স্মৃতি ভাগ করে নিন, অন্যদেরও অনুপ্রাণিত করুন।",
    badge: "ছবির গ্যালারি",
    badgeColor: "bg-[#C99A4B]/15 text-[#65472D]",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function PlatformFeatures() {
  const isBengali = useLanguage() === "bn";
  const featureCopy = isBengali
    ? [
        {
          title: "সমাজের জন্য উদ্যোগ",
          description:
            "পরিচ্ছন্নতা, বৃক্ষরোপণ, দানসহ নানা কল্যাণমূলক কাজে প্রতিবেশীদের এক করুন।",
          badge: "সম্প্রদায়",
        },
        {
          title: "আসন্ন আয়োজন",
          description:
            "আপনার এলাকার আসন্ন স্বেচ্ছাসেবামূলক আয়োজন খুঁজে নিন এবং যোগ দিন।",
          badge: "আয়োজন",
        },
        {
          title: "স্মৃতি ও প্রদর্শনী",
          description:
            "আগের সেবামূলক আয়োজনের স্মৃতি ভাগ করে নিন, অন্যদেরও অনুপ্রাণিত করুন।",
          badge: "ছবির গ্যালারি",
        },
      ]
    : [
        {
          title: "Community Action",
          description:
            "Bring neighbors together for local cleanups, tree planting, donations, and other helpful projects.",
          badge: "Community",
        },
        {
          title: "Upcoming Events",
          description:
            "Find upcoming volunteer activities near you and join the ones that matter to your community.",
          badge: "Events",
        },
        {
          title: "Memories & Showcases",
          description:
            "Share the impact of past community service events and inspire others to get involved.",
          badge: "Gallery",
        },
      ];

  return (
    <section
      id="platform-features"
      className="relative w-full bg-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-alpana bg-repeat" style={{ backgroundSize: "96px 96px" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C99A4B]" />
            <span className="text-[#C99A4B]">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C99A4B]" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-[#064B38] mb-4"
            style={{ fontFamily: isBengali ? "var(--font-bengali)" : "var(--font-serif)" }}
          >
            {isBengali ? "মানুষকে একত্র করি" : "Bringing People Together"}
            <br />
            <span className="text-[#C83D2B]">
              {isBengali ? "সেবার বন্ধনে" : "Through Service"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl mx-auto text-[#65472D] text-base leading-relaxed"
          >
            {isBengali
              ? "মিলনমেলা স্থানীয় উদ্যোগ আয়োজন, স্বেচ্ছাসেবক খোঁজা এবং সম্মিলিত ভাবনাকে কাজে রূপ দেওয়া সহজ করে।"
              : "Milanmela makes it simple to organize local initiatives, find volunteers, and turn shared ideas into helpful action."}
          </motion.p>
        </div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div key={feat.title} variants={cardVariants}>
                <Card
                  className={`group h-full border-t-4 ${feat.accentColor} border-[#C99A4B]/20 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5`}
                >
                  <CardContent className="p-8 flex flex-col gap-5">
                    {/* Icon */}
                    <div
                      className={`inline-flex size-14 items-center justify-center rounded-2xl ${feat.iconBg} transition-transform group-hover:scale-110`}
                    >
                      <Icon className={`size-7 ${feat.iconColor}`} />
                    </div>

                    {/* Badge */}
                    <span
                      className={`self-start text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${feat.badgeColor}`}
                    >
                      {featureCopy[index].badge}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold text-[#064B38]"
                      style={{ fontFamily: isBengali ? "var(--font-bengali)" : "var(--font-serif)" }}
                    >
                      {featureCopy[index].title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-[#65472D]">
                      {featureCopy[index].description}
                    </p>

                    {/* Golden bottom accent */}
                    <div className="mt-auto pt-4 border-t border-[#C99A4B]/20">
                      <span className="text-xs font-semibold text-[#C99A4B] tracking-wide uppercase group-hover:text-[#064B38] transition-colors">
                        {isBengali ? "আরও জানুন" : "Learn More"} →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
