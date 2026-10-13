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
  ceremonyISO: "2026-11-20T09:15:00+05:30",
  timeZone: "Asia/Kolkata",
  ceremonyTimeLabel: "9:15 AM IST",
} as const;

/** The scrolling ribbon under the hero */
export const ribbon = [
  "ಕೃತಿ ❤ ಕೀರ್ತನ್",
  "Kruthi weds Keerthan",
  "ಮದುವೆಗೆ ಬನ್ನಿ",
  "18 – 20 November 2026",
  "Bengaluru",
] as const;

export const invitation = {
  kn: "ಆಹ್ವಾನ",
  heading: "Two Hearts, One Beautiful Journey",
  text: "With hearts full of love and happiness, we are beginning the most beautiful chapter of our lives, and it would mean the world to us to have you with us. Please join us as we celebrate the start of our forever, and bless us with your love, your presence and your good wishes.",
} as const;

export const coupleIntro = {
  kn: "ವಧು · ವರ",
  heading: "Meet the Two of Us",
  bride: {
    knRole: "ವಧು",
    role: "The Bride",
    name: "Kruthi",
    kn: "ಕೃತಿ",
    line: "The one with the late-night lectures on how life should be lived, and usually right.",
  } satisfies Person,
  groom: {
    knRole: "ವರ",
    role: "The Groom",
    name: "Keerthan",
    kn: "ಕೀರ್ತನ್",
    line: "The one who drove three hours through the night because the plan did not have her in it.",
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
    icon: "sun",
    tone: "turmeric",
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
    tone: "plum",
  },
  {
    id: "muhurtham",
    title: "Muhurtham",
    kn: "ಮುಹೂರ್ತ",
    date: "20 November 2026",
    isoDate: "2026-11-20",
    time: "9:15 AM",
    icon: "heart",
    tone: "plum",
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
