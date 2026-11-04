"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  UserRoundPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import {
  getJoinedEventIds,
  invalidateJoinedEventIds,
} from "@/lib/joined-events";
import { toast } from "react-toastify";

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
  const [isJoined, setIsJoined] = useState<boolean | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const displaySrc = failedSrc === rawSrc || !rawSrc ? "/Milanmela.png" : rawSrc;
  const isExternal =
    typeof displaySrc === "string" &&
    (displaySrc.startsWith("http://") ||
      displaySrc.startsWith("https://") ||
      displaySrc.startsWith("//"));

  useEffect(() => {
    if (!eventId || !email || isCompleted) return;

    let cancelled = false;
    getJoinedEventIds(email)
      .then((eventIds) => {
        if (!cancelled) setIsJoined(eventIds.has(eventId));
      })
      .catch((error: unknown) => {
        console.error("Could not check event membership:", error);
        if (!cancelled) {
          setIsJoined(false);
          toast.error("Could not check your joined events. Please try again.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [email, eventId, isCompleted]);

  async function handleJoin() {
    if (!eventId || !email || isJoining || isJoined !== false) return;

    setIsJoining(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${encodeURIComponent(eventId)}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(
          result?.message || `Could not join event (${response.status}).`,
        );
      }

      invalidateJoinedEventIds(email);
      setIsJoined(true);
      toast.success("You joined this event!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not join this event.";
      toast.error(message);
    } finally {
      setIsJoining(false);
    }
  }

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
        <div className="pt-1 space-y-2">
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

          {eventId &&
            (isCompleted ? (
              <Button
                type="button"
                disabled
                className="w-full h-9 rounded-full bg-[#65472D]/10 text-[#65472D] text-xs font-semibold"
              >
                Event Ended
              </Button>
            ) : isPending ? (
              <Button
                type="button"
                disabled
                className="w-full h-9 rounded-full bg-[#064B38]/10 text-[#064B38] text-xs font-semibold"
              >
                Checking account...
              </Button>
            ) : !email ? (
              <Link href="/sing-in" className="block w-full">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-9 rounded-full border-[#C99A4B] text-[#064B38] text-xs font-semibold hover:bg-[#C99A4B]/15"
                >
                  Sign in to Join
                  <UserRoundPlus className="size-3.5 ml-1" />
                </Button>
              </Link>
            ) : (
              <Button
                type="button"
                onClick={handleJoin}
                disabled={isJoining || isJoined !== false}
                variant={isJoined ? "outline" : "default"}
                className={`w-full h-9 rounded-full text-xs font-semibold ${
                  isJoined
                    ? "border-[#064B38]/30 text-[#064B38]"
                    : "bg-[#C83D2B] text-white hover:bg-[#C83D2B]/90"
                }`}
              >
                {isJoining
                  ? "Joining..."
                  : isJoined
                    ? "Joined"
                    : isJoined === null
                      ? "Checking..."
                      : "Join Event"}
                {isJoined ? (
                  <Check className="size-3.5 ml-1" />
                ) : (
                  <UserRoundPlus className="size-3.5 ml-1" />
                )}
              </Button>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
