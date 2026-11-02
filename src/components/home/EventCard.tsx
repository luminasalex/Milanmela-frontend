"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface EventCardProps {
  id?: string;
  _id?: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  categoryColor?: string;
  isCompleted?: boolean;
  image?: string;
  imageUrl?: string;
}

export default function EventCard({
  id,
  _id,
  title,
  date,
  time,
  location,
  category,
  description,
  categoryColor = "bg-[#064B38]/10 text-[#064B38]",
  isCompleted = false,
  image,
  imageUrl,
}: EventCardProps) {
  const eventId = id || _id;
  const rawSrc = (image || imageUrl || "").trim();
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const displaySrc = failedSrc === rawSrc || !rawSrc ? "/Milanmela.png" : rawSrc;
  const isExternal =
    typeof displaySrc === "string" &&
    (displaySrc.startsWith("http://") ||
      displaySrc.startsWith("https://") ||
      displaySrc.startsWith("//"));

  return (
    <Card className="group flex flex-col h-full overflow-hidden border border-[#C99A4B]/25 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 rounded-2xl p-0">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-[#064B38]/10">
        <Image
          src={displaySrc}
          alt={title || "Event Image"}
          fill
          unoptimized={isExternal}
          onError={() => setFailedSrc(rawSrc)}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#064B38]/70 via-transparent to-transparent pointer-events-none" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${categoryColor} backdrop-blur-sm`}
          >
            {category}
          </span>
        </div>

        {/* Completed badge */}
        {isCompleted && (
          <div className="absolute top-3 right-3">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#C99A4B] text-[#064B38]">
              Completed
            </span>
          </div>
        )}

        {/* Date overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[#F7F1E3]">
          <CalendarDays className="size-3.5" />
          <span className="text-xs font-medium">{date}</span>
        </div>
      </div>

      {/* Content */}
      <CardContent className="flex flex-col gap-3 p-5 flex-1">
        {/* Title */}
        <h3
          className="font-bold text-lg leading-snug text-[#064B38] group-hover:text-[#C83D2B] transition-colors"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h3>

        {/* Meta */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-[#65472D]">
            <Clock className="size-3.5 text-[#C99A4B]" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#65472D]">
            <MapPin className="size-3.5 text-[#C83D2B]" />
            <span>{location}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#C99A4B]/20" />

        {/* Description */}
        <p className="text-xs text-[#65472D] leading-relaxed flex-1 line-clamp-3">
          {description}
        </p>

        {/* CTA */}
        <div className="pt-1">
          {eventId ? (
            <Link href={`/events/${eventId}`} className="block w-full">
              <Button
                variant="outline"
                className="w-full h-9 rounded-full border-[#064B38] text-[#064B38] text-xs font-semibold hover:bg-[#064B38] hover:text-[#F7F1E3] transition-all cursor-pointer"
              >
                {isCompleted ? "View Highlights" : "View Details"}
                <ArrowRight className="size-3.5 ml-1" />
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              className="w-full h-9 rounded-full border-[#064B38] text-[#064B38] text-xs font-semibold hover:bg-[#064B38] hover:text-[#F7F1E3] transition-all"
            >
              {isCompleted ? "View Highlights" : "View Details"}
              <ArrowRight className="size-3.5 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

