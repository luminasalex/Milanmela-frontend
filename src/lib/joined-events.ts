import type { EventItem } from "@/lib/events";
import { getAuthToken } from "@/lib/api-auth";

const joinedEventsCache = new Map<string, Promise<EventItem[]>>();

export function getJoinedEvents(email: string): Promise<EventItem[]> {
  const cached = joinedEventsCache.get(email);
  if (cached) return cached;

  const request = getAuthToken()
    .then((token) =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/joined-events`,
        {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    )
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Could not load joined events (${response.status}).`);
      }

      const events: unknown = await response.json();
      if (!Array.isArray(events)) {
        throw new Error("The server returned an invalid joined-events response.");
      }

      return events.filter(
        (event): event is EventItem =>
          typeof event === "object" &&
          event !== null &&
          typeof event._id === "string" &&
          typeof event.title === "string",
      );
    })
    .catch((error: unknown) => {
      joinedEventsCache.delete(email);
      throw error;
    });

  joinedEventsCache.set(email, request);
  return request;
}

export async function getJoinedEventIds(email: string): Promise<Set<string>> {
  const events = await getJoinedEvents(email);
  return new Set(events.map((event) => event._id));
}

export function invalidateJoinedEventIds(email: string): void {
  joinedEventsCache.delete(email);
}
