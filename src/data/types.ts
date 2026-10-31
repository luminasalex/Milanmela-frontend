export type EventCategory =
  | "Cultural"
  | "Festival"
  | "Music"
  | "Community"
  | "Theatre"
  | "Fair";

export interface EventRecord {
  id: string;
  slug: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  city: string;
  description: string;
  category: EventCategory | "Sports";
  cover: string;
  attendees?: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  category: GalleryCategory["id"];
  categoryLabel: string;
  event: string;
  date: string;
  src: string;
  /** Tailwind aspect-ratio class chosen intentionally for the masonry rhythm */
  aspect:
    | "aspect-[3/4]"
    | "aspect-[4/3]"
    | "aspect-square"
    | "aspect-[16/10]"
    | "aspect-[3/5]";
}
