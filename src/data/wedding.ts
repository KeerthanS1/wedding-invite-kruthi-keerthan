import type { Person, WeddingEvent } from "@/types";

export const couple = {
  first: "Kruthi",
  second: "Keerthan",
  names: "Kruthi & Keerthan",
  kn: "ಕೃತಿ · ಕೀರ್ತನ್",
} as const;

export const weddingDate = {
  display: "20 November 2026",
  iso: "2026-11-20",
  footer: "20 • 11 • 2026",
  /** Muhurtham, in Asia/Kolkata (IST, fixed +05:30 offset) */
  ceremonyISO: "2026-11-20T09:30:00+05:30",
  timeZone: "Asia/Kolkata",
  ceremonyTimeLabel: "9:30 AM IST",
} as const;

export const invitation = {
  kn: "ಆಹ್ವಾನ",
  heading: "The One Where Chai Meets Coffee ♡",
  headingLead: "The One Where",
  headingMain: ["Chai", "Meets", "Coffee"],
  /** Each beat of the story gets a little icon. Wrap words in **double asterisks** to highlight them. */
  story: [
    {
      icon: "👀",
      text: "Some love stories begin with a confession. Ours began with **a glance at a function**, **two secret crushes**, and absolutely no first move.",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      text: "Little did we know, life was saving our story for a plot twist neither of us expected – **an arranged meeting orchestrated by our parents!**",
    },
    {
      icon: "🌧️",
      text: "And suddenly, the familiar face from that first encounter was sitting right in front of us. Between unexpected conversations, playful chaos, and **rain that seemed to follow us everywhere**, our story slowly turned into something straight out of **a Bollywood rom-com**.",
    },
    {
      icon: "☕",
      text: "**One chai lover, one coffee lover**, two different personalities, and a love story that proves opposites can brew something beautiful. A little **Geet and Aditya** chaos, a little **Bunny and Naina** destiny, and a whole lot of us.",
    },
    {
      icon: "💍",
      text: "On **November 20th, 2026**, we're tying the knot – turning an arranged beginning into our very own love story.",
    },
  ],
  blend: "Different brews, one beautiful blend.",
  toast: "Here's to forever, one cup at a time. ☕🫖❤️",
} as const;

export const photographer = {
  label: "Photographs by",
  handle: "@gallery_pictures_by_guna",
  url: "https://www.instagram.com/gallery_pictures_by_guna/",
} as const;

export const coupleIntro = {
  kn: "ವಧು · ವರ",
  heading: "Meet the Two of Us",
  bride: {
    name: "Kruthi",
    kn: "ಕೃತಿ",
    line: "The one with a thousand thoughts, a little drama, and a heart that always knows what it wants.",
  } satisfies Person,
  groom: {
    name: "Keerthan",
    kn: "ಕೀರ್ತನ್",
    line: "The one who plays it cool, plans the unexpected, and somehow always ends up doing things her way.",
  } satisfies Person,
} as const;

export const teaser = {
  kn: "ನಮ್ಮ ಟೀಸರ್",
  heading: "Lights, Camera, Maduve!",
  note: "Turn your sound on 🔊",
} as const;

export const celebrations = {
  kn: "ಕಾರ್ಯಕ್ರಮಗಳು",
  heading: "The Wedding Celebrations",
} as const;

export const events: WeddingEvent[] = [
  {
    id: "haldi",
    title: "Haldi",
    kn: "ಅರಿಶಿನ ಶಾಸ್ತ್ರ",
    date: "18 November 2026",
    isoDate: "2026-11-18",
    place: { en: "At home", kn: "ಮನೆಯಲ್ಲಿ" },
    icon: "sun",
    tone: "honey",
  },
  {
    id: "varapooje",
    title: "Varapooje",
    kn: "ವರಪೂಜೆ",
    date: "19 November 2026",
    isoDate: "2026-11-19",
    time: "3:00 PM",
    icon: "flame",
    tone: "sand",
  },
  {
    id: "reception",
    title: "Reception",
    kn: "ಆರತಕ್ಷತೆ",
    date: "19 November 2026",
    isoDate: "2026-11-19",
    time: "7:00 PM onwards",
    icon: "sparkles",
    tone: "cocoa",
  },
  {
    id: "muhurtham",
    title: "Muhurtham",
    kn: "ಮುಹೂರ್ತ",
    date: "20 November 2026",
    isoDate: "2026-11-20",
    time: "9:30 AM",
    icon: "heart",
    tone: "cocoa",
  },
];

export const venue = {
  kn: "ವಿವಾಹ ಸ್ಥಳ",
  name: "Sri Venkateshwara Kalyana Mantapa",
  address:
    "17, 80 Feet Rd, Mohan Kumar Nagar, Yeswanthpur, Bengaluru, Karnataka 560022",
  mapsUrl: "https://maps.app.goo.gl/Cuc3gUKguhGRVPiW7",
  directionsLabel: "📍 Get Directions",
} as const;

export const finalQuote = {
  text: "Every love story is beautiful, but ours is our favorite.",
} as const;

export const countdown = {
  kn: "ಶುಭ ಮುಹೂರ್ತಕ್ಕೆ ಇನ್ನು",
  heading: "Counting Down to Forever",
  doneMessage: "The day we've been waiting for is finally here! ❤️",
} as const;

export const footer = {
  line: "Forever starts here.",
} as const;

export const site = {
  title: "Kruthi & Keerthan | Our Wedding",
  description:
    "Join Kruthi & Keerthan as they begin their forever — a celebration of love, family, tradition and beautiful memories.",
} as const;
