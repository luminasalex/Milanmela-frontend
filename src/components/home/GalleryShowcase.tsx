"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryItems = [
  {
    caption: "Baishakhi Procession",
    aspect: "aspect-[4/5]",
    objectPos: "object-top",
    colSpan: "",
  },
  {
    caption: "Evening Cultural Performance",
    aspect: "aspect-[16/9]",
    objectPos: "object-center",
    colSpan: "md:col-span-2",
  },
  {
    caption: "Traditional Folk Dance",
    aspect: "aspect-square",
    objectPos: "object-center",
    colSpan: "",
  },
  {
    caption: "Nakshi Kantha Workshop",
    aspect: "aspect-square",
    objectPos: "object-bottom",
    colSpan: "",
  },
  {
    caption: "Community Gathering",
    aspect: "aspect-[3/4]",
    objectPos: "object-center",
    colSpan: "",
  },
  {
    caption: "Heritage Craft Exhibition",
    aspect: "aspect-[16/9]",
    objectPos: "object-top",
    colSpan: "md:col-span-2",
  },
];

export default function GalleryShowcase() {
  return (
    <section
      id="gallery"
      className="relative w-full bg-[#F7F1E3] py-20 lg:py-28 overflow-hidden"
    >
      {/* Left strip accent */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#C99A4B] to-transparent" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-alpana bg-repeat" style={{ backgroundSize: "80px 80px" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#C99A4B]" />
              <span className="text-xs font-bold tracking-widest text-[#C99A4B] uppercase">
                Visual Stories
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-[#064B38]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Gallery Showcase
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-2 text-sm text-[#65472D] max-w-md"
            >
              A curated visual journey through the vibrant celebrations and
              cultural moments of Milanmela.
            </motion.p>
          </div>

          <a href="#" className="shrink-0">
            <Button
              variant="outline"
              className="h-10 px-6 rounded-full border-[#064B38] text-[#064B38] hover:bg-[#064B38] hover:text-[#F7F1E3] text-sm font-semibold transition-all"
            >
              Explore Gallery
              <ArrowRight className="size-4 ml-1" />
            </Button>
          </a>
        </div>

        {/* Masonry-inspired grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.caption}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl border border-[#C99A4B]/20 shadow-md hover:shadow-xl transition-all duration-400 ${item.colSpan}`}
            >
              <div className={`relative w-full ${item.aspect}`}>
                <Image
                  src="/Milanmela.png"
                  alt={item.caption}
                  fill
                  className={`object-cover ${item.objectPos} transition-transform duration-500 group-hover:scale-[1.08]`}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#064B38]/80 via-[#064B38]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-[#F7F1E3] text-sm font-semibold">{item.caption}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="h-px w-8 bg-[#C99A4B]" />
                    <span className="text-[#C99A4B] text-[10px] uppercase tracking-widest font-bold">
                      Milanmela
                    </span>
                  </div>
                </div>

                {/* Corner golden dot */}
                <div className="absolute top-3 right-3 size-2 rounded-full bg-[#C99A4B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom ornamental divider */}
        <div className="flex items-center justify-center gap-4 mt-14">
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-[#C99A4B]/40" />
          <span className="text-[#C99A4B] text-lg">✦</span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-[#C99A4B]/40" />
        </div>
      </div>
    </section>
  );
}
