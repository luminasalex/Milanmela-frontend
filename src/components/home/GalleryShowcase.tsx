"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryItems = [
  {
    caption: "Baishakhi Procession",
    src: "/gallery/baishakhi-procession.jpg",
    aspect: "aspect-[4/5]",
    objectPos: "object-top",
    colSpan: "",
  },
  {
    caption: "Pitha Puli",
    src: "/gallery/pitha-puli.jpg",
    aspect: "aspect-[16/9]",
    objectPos: "object-center",
    colSpan: "sm:col-span-2 md:col-span-2",
  },
  {
    caption: "Traditional Folk Dance",
    src: "/gallery/traditional-folk-dance.jpg",
    aspect: "aspect-square",
    objectPos: "object-center",
    colSpan: "",
  },
  {
    caption: "Nakshi Kantha Workshop",
    src: "/gallery/nakshi-kantha-workshop.jpg",
    aspect: "aspect-square",
    objectPos: "object-bottom",
    colSpan: "",
  },
  {
    caption: "Community Gathering",
    src: "/gallery/community-gathering.jpg",
    aspect: "aspect-[3/4]",
    objectPos: "object-center",
    colSpan: "",
  },
  {
    caption: "Street Food Carnival",
    src: "/gallery/street-food-carnival.jpg",
    aspect: "aspect-[4/5]",
    objectPos: "object-center",
    colSpan: "",
  },
  {
    caption: "Heritage Craft Exhibition",
    src: "/gallery/heritage-craft-exhibition.jpg",
    aspect: "aspect-[16/9]",
    objectPos: "object-top",
    colSpan: "sm:col-span-2 md:col-span-2",
  },
];

export default function GalleryShowcase() {
  return (
    <section
      id="gallery"
      className="relative w-full bg-[#F7F1E3] py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      {/* Left strip accent — hidden on very small screens */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#C99A4B] to-transparent hidden xs:block" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-alpana bg-repeat"
        style={{ backgroundSize: "80px 80px" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="h-px w-8 sm:w-12 bg-[#C99A4B]" />
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#C99A4B] uppercase">
                Visual Stories
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-bold text-[#064B38] leading-tight"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
              }}
            >
              Gallery Showcase
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-2 text-xs sm:text-sm text-[#65472D] max-w-md leading-relaxed"
            >
              A curated visual journey through the vibrant celebrations and
              cultural moments of Milanmela.
            </motion.p>
          </div>

          <a href="#" className="shrink-0 self-start sm:self-auto">
            <Button
              variant="outline"
              className="h-10 px-5 sm:px-6 rounded-full border-[#064B38] text-[#064B38] hover:bg-[#064B38] hover:text-[#F7F1E3] text-xs sm:text-sm font-semibold transition-all"
            >
              Explore Gallery
              <ArrowRight className="size-4 ml-1" />
            </Button>
          </a>
        </div>

        {/* Masonry-inspired grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 auto-rows-auto">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.caption}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#C99A4B]/20 shadow-md hover:shadow-xl transition-shadow duration-300 ${item.colSpan}`}
            >
              <div className={`relative w-full ${item.aspect}`}>
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className={`object-cover ${item.objectPos} transition-transform duration-500 group-hover:scale-[1.08]`}
                />

                {/* Hover overlay — only on devices that support hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#064B38]/80 via-[#064B38]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden [@media(hover:hover)]:block" />

                {/* Caption — always visible on touch, hover-reveal on desktop */}
                <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 translate-y-0 opacity-100 [@media(hover:hover)]:translate-y-4 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-[#F7F1E3] text-xs sm:text-sm font-semibold drop-shadow-md">
                    {item.caption}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="h-px w-6 sm:w-8 bg-[#C99A4B]" />
                    <span className="text-[#C99A4B] text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">
                      Milanmela
                    </span>
                  </div>
                </div>

                {/* Corner golden dot */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 size-2 rounded-full bg-[#C99A4B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom ornamental divider */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-14">
          <div className="h-px flex-1 max-w-[8rem] sm:max-w-xs bg-gradient-to-r from-transparent to-[#C99A4B]/40" />
          <span className="text-[#C99A4B] text-base sm:text-lg">✦</span>
          <div className="h-px flex-1 max-w-[8rem] sm:max-w-xs bg-gradient-to-l from-transparent to-[#C99A4B]/40" />
        </div>
      </div>
    </section>
  );
}
