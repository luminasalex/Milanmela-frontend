import type { EventRecord } from "./types";

export const upcomingEvents: EventRecord[] = [
  {
    id: "u1",
    slug: "nabanna-harvest-festival",
    title: "Nabanna Harvest Festival",
    date: "Dec 12, 2026",
    time: "4:00 PM onwards",
    location: "Rabindra Sarobar Grounds",
    city: "Dhaka",
    description:
      "A grand celebration of the harvest season with folk music, rural craft stalls, and a community feast prepared from the season's first grains.",
    category: "Cultural",
    cover:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop",
    attendees: "5,000+ expected",
  },
  {
    id: "u2",
    slug: "winter-classical-music-night",
    title: "Winter Classical Music Night",
    date: "Dec 20, 2026",
    time: "6:30 PM",
    location: "Shilpakala Academy Auditorium",
    city: "Dhaka",
    description:
      "An intimate evening of ragas and gaan-sgenres, featuring acclaimed classical vocalists and an ensemble of sarod, sitar, and tabla artists.",
    category: "Music",
    cover:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    attendees: "800 seats",
  },
  {
    id: "u3",
    slug: "poush-mela-winter-fair",
    title: "Poush Mela — Winter Fair",
    date: "Jan 9, 2027",
    time: "10:00 AM – 9:00 PM",
    location: "Embankment Grounds",
    city: "Bolpur",
    description:
      "Three days of baul songs, handloom exhibitions, village food courts, and open-air performances under the winter sky.",
    category: "Fair",
    cover:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    attendees: "12,000+ expected",
  },
  {
    id: "u4",
    slug: "alpona-arts-workshop",
    title: "Alpona & Folk Arts Workshop",
    date: "Jan 18, 2027",
    time: "11:00 AM",
    location: "Utsav Community Hub",
    city: "Dhaka",
    description:
      "Hands-on workshop where master artists teach traditional alpona floor painting, nakshi kantha embroidery, and patachitra scroll art.",
    category: "Cultural",
    cover:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop",
    attendees: "120 seats",
  },
  {
    id: "u5",
    slug: "savar-community-theatre-fest",
    title: "Community Theatre Festival",
    date: "Feb 6, 2027",
    time: "5:00 PM daily",
    location: "Chhayanaut Stage",
    city: "Dhaka",
    description:
      "Four evenings of street plays and proscenium productions staged by neighborhood theatre groups — from folk tales to contemporary drama.",
    category: "Theatre",
    cover:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1200&auto=format&fit=crop",
    attendees: "2,400 seats",
  },
  {
    id: "u6",
    slug: "spring-kite-carnival",
    title: "Spring Kite Carnival",
    date: "Feb 21, 2027",
    time: "9:00 AM onwards",
    location: "Northbrook Lawns",
    city: "Chattogram",
    description:
      "A rooftop-and-lawn kite flying festival welcoming spring, with furiwala uf85games, traditional sweet stalls, and a sunset drum circle.",
    category: "Community",
    cover:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
    attendees: "8,000+ expected",
  },
];

export const completedEvents: EventRecord[] = [
  {
    id: "c1",
    slug: "durga-puja-pandal-lighting",
    title: "Durga Puja Pandal Lighting Ceremony",
    date: "Oct 18, 2026",
    location: "Mirpur Community Grounds",
    city: "Dhaka",
    description:
      "Thousands gathered as neighborhood pandals were illuminated; the evening closed with dhak drummers and community prashad.",
    category: "Festival",
    cover:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop",
    attendees: "6,200",
  },
  {
    id: "c2",
    slug: "monsoon-baul-melancholy-evening",
    title: "Monsoon Baul Evening",
    date: "Sep 12, 2026",
    location: "Open Court, Utsav Hub",
    city: "Dhaka",
    description:
      "Rain-soakedroi roofs overhead, streaming oil lamps, and baul mystics singing through the night — an evening many still talk about.",
    category: "Music",
    cover:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop",
    attendees: "900",
  },
  {
    id: "c3",
    slug: "heritage-walk-old-dhaka",
    title: "Heritage Walk — Old Dhaka",
    date: "Sep 27, 2026",
    location: "Armanitola to Ahsan Manzil",
    city: "Dhaka",
    description:
      "A guided promenade through centuries-old lanes, spice markets, and Mughal-era havelis, ending with sharbat in the courtyard.",
    category: "Community",
    cover:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=1200&auto=format&fit=crop",
    attendees: "350",
  },
  {
    id: "c4",
    slug: "youth-folk-dance-showcase",
    title: "Youth Folk Dance Showcase",
    date: "Aug 16, 2026",
    location: "Shilpakala Academy",
    city: "Dhaka",
    description:
      "Forty young dancers presented jhumur, manipuri, and dhali dance forms, trained in a six-week summer residency.",
    category: "Cultural",
    cover:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop",
    attendees: "1,100",
  },
  {
    id: "c5",
    slug: "eid-community-iftar-nolak",
    title: "Grand Community Iftar",
    date: "Aug 4, 2026",
    location: "Lalbagh Field",
    city: "Dhaka",
    description:
      "A ten-thousand-strong iftar served under lantern-lit canopies, prepared by volunteers from eighteen neighboring parishes.",
    category: "Community",
    cover:
      "https://images.unsplash.com/photo-1520789045017-5b5e38dd1254?q=80&w=1200&auto=format&fit=crop",
    attendees: "10,000",
  },
  {
    id: "c6",
    slug: "_onam-boat-shared",
    title: "River Boat Song Festival",
    date: "Aug 23, 2026",
    location: "Buriganga River Ghat",
    city: "Dhaka",
    description:
      "Traditional boat songs echoed across the water as decorated country boats raced, cheered on by crowds on the ghats.",
    category: "Festival",
    cover:
      "https://images.unsplash.com/photo-1478147427282-58a87a120788?q=80&w=1200&auto=format&fit=crop",
    attendees: "4,500",
  },
];
