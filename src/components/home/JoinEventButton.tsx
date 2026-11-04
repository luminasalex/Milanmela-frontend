"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { getAuthToken } from "@/lib/api-auth";
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
      const token = await getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${encodeURIComponent(eventId)}/join`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
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
        className="w-full h-9 rounded-full bg-[#064B38]/15 text-[#064B38] text-xs font-semibold"
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
        className="w-full h-9 rounded-full bg-[#064B38]/15 text-[#064B38] text-xs font-semibold"
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
          className="w-full h-9 rounded-full border-[#C99A4B] text-[#064B38] text-xs font-semibold hover:bg-[#C99A4B]/15"
        >
          Sign in to Join
          <UserRoundPlus className="size-3.5 ml-1" />
        </Button>
      </Link>
    );
  }

  if (isJoined) {
    return (
      <Button
        type="button"
        disabled
        className="w-full h-9 rounded-full bg-[#064B38] text-[#F7F1E3] text-xs font-semibold"
      >
        <Check className="size-3.5" />
        Joined
      </Button>
    );
  }

  return (
    <>
      {/* ✅ Primary join button — app accent red */}
      <Button
        type="button"
        onClick={() => setIsConfirmationOpen(true)}
        disabled={isJoining || isJoined !== false}
        className="w-full h-9 rounded-full bg-[#C83D2B] text-white text-xs font-semibold hover:bg-[#C83D2B]/90 shadow-sm hover:shadow-md transition-all"
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
        <AlertDialogContent className="border border-[#C99A4B]/30 bg-[#F7F1E3]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#064B38]">
              Join this event?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#65472D]">
              Confirm to add this event to your Joined Events list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isJoining}
              className="rounded-full border-[#C99A4B] text-[#064B38] hover:bg-[#C99A4B]/15"
            >
              Cancel
            </AlertDialogCancel>
            <Button
              type="button"
              onClick={handleJoin}
              disabled={isJoining}
              className="rounded-full bg-[#C83D2B] text-white hover:bg-[#C83D2B]/90 shadow-sm"
            >
              {isJoining ? "Joining..." : "Confirm Join"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}