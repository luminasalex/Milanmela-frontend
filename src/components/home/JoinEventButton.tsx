"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";
import {
  getJoinedEventIds,
  invalidateJoinedEventIds,
} from "@/lib/joined-events";
import { toast } from "react-toastify";

interface JoinEventButtonProps {
  eventId: string;
  isCompleted: boolean;
}

export default function JoinEventButton({
  eventId,
  isCompleted,
}: JoinEventButtonProps) {
  const [isJoined, setIsJoined] = useState<boolean | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (!email || isCompleted) return;

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
    if (!email || isJoining || isJoined !== false) return;

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
      setIsConfirmationOpen(false);
      toast.success("You joined this event!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not join this event.";
      toast.error(message);
    } finally {
      setIsJoining(false);
    }
  }

  if (isCompleted) {
    return (
      <Button
        type="button"
        disabled
        className="w-full h-9 rounded-full bg-[#65472D]/10 text-[#65472D] text-xs font-semibold"
      >
        Event Ended
      </Button>
    );
  }

  if (isPending) {
    return (
      <Button
        type="button"
        disabled
        className="w-full h-9 rounded-full bg-zinc-100 text-zinc-500 text-xs font-semibold"
      >
        Checking account...
      </Button>
    );
  }

  if (!email) {
    return (
      <Link href="/sing-in" className="block w-full">
        <Button
          type="button"
          variant="outline"
          className="w-full h-9 rounded-full border-zinc-300 text-zinc-700 text-xs font-semibold hover:bg-zinc-100"
        >
          Sign in to Join
          <UserRoundPlus className="size-3.5 ml-1" />
        </Button>
      </Link>
    );
  }

  if (isJoined) {
    return (
      <Badge
        variant="outline"
        className="h-9 w-full justify-center rounded-full border-zinc-300 bg-zinc-100 text-zinc-600 text-xs font-semibold"
      >
        <Check className="size-3.5" />
        Joined
      </Badge>
    );
  }

  return (
    <>
      {/* ✅ NEW: Ash/zinc primary button */}
      <Button
        type="button"
        onClick={() => setIsConfirmationOpen(true)}
        disabled={isJoining || isJoined !== false}
        className="w-full h-9 rounded-full bg-zinc-700 text-white text-xs font-semibold hover:bg-zinc-800 shadow-sm hover:shadow-md transition-all"
      >
        {isJoined === null ? "Checking..." : "Join Event"}
        <UserRoundPlus className="size-3.5 ml-1" />
      </Button>

      <AlertDialog
        open={isConfirmationOpen}
        onOpenChange={(open) => {
          if (!isJoining) setIsConfirmationOpen(open);
        }}
      >
        <AlertDialogContent className="border border-zinc-200 bg-[#F7F1E3]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-800">
              Join this event?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500">
              Confirm to add this event to your Joined Events list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isJoining}
              className="rounded-full border-zinc-300 text-zinc-700 hover:bg-zinc-100"
            >
              Cancel
            </AlertDialogCancel>
            {/* ✅ NEW: Ash confirm button */}
            <Button
              type="button"
              onClick={handleJoin}
              disabled={isJoining}
              className="rounded-full bg-zinc-700 text-white hover:bg-zinc-800 shadow-sm"
            >
              {isJoining ? "Joining..." : "Confirm Join"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}