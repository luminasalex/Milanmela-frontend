"use client";

import { motion } from "framer-motion";
import { Users, CalendarDays, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    iconBg: "bg-[#064B38]/10",
    iconColor: "text-[#064B38]",
    accentColor: "border-t-[#064B38]",
    title: "Cultural Gatherings",
    description:
      "Experience the warmth of Bengali culture through our meticulously curated gatherings — where traditions, stories, and communities converge.",
    badge: "Community",
    badgeColor: "bg-[#064B38]/10 text-[#064B38]",
  },
  {
    icon: CalendarDays,
    iconBg: "bg-[#C83D2B]/10",
    iconColor: "text-[#C83D2B]",
    accentColor: "border-t-[#C83D2B]",
    title: "Upcoming Events",
    description:
      "Stay ahead of every celebration. Discover curated cultural events, festivals, and performances tailored for the community.",
    badge: "Events",
    badgeColor: "bg-[#C83D2B]/10 text-[#C83D2B]",
  },
  {
    icon: ImageIcon,
    iconBg: "bg-[#C99A4B]/15",
    iconColor: "text-[#65472D]",
    accentColor: "border-t-[#C99A4B]",
    title: "Memories & Showcases",
    description:
      "Relive beautiful moments from past events through our curated gallery — a visual journey through Bengali cultural milestones.",
    badge: "Gallery",
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
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Bringing People Together
            <br />
            <span className="text-[#C83D2B]">Through Culture</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl mx-auto text-[#65472D] text-base leading-relaxed"
          >
            Milanmela is more than a platform — it&apos;s a living celebration of
            Bengali identity, crafted for a community that thrives on togetherness.
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
          {features.map((feat) => {
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
                      {feat.badge}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold text-[#064B38]"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {feat.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-[#65472D]">
                      {feat.description}
                    </p>

                    {/* Golden bottom accent */}
                    <div className="mt-auto pt-4 border-t border-[#C99A4B]/20">
                      <span className="text-xs font-semibold text-[#C99A4B] tracking-wide uppercase group-hover:text-[#064B38] transition-colors">
                        Learn More →
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
