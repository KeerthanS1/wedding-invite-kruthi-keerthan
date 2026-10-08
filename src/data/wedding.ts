import type { ChapterContent, ChapterKey, WeddingEvent } from "@/types";

export const couple = {
  first: "Kruthi",
  second: "Keerthan",
  names: "Kruthi & Keerthan",
  kn: "ಕೃತಿ · ಕೀರ್ತನ್",
  tagline: "Our Forever Begins Here",
  knGreeting: "ಶುಭ ವಿವಾಹ",
} as const;

export const weddingDate = {
  display: "20 November 2026",
  footer: "20 • 11 • 2026",
  /** Muhurtham, in Asia/Kolkata (IST, fixed +05:30 offset) */
  ceremonyISO: "2026-11-20T09:15:00+05:30",
  timeZone: "Asia/Kolkata",
  ceremonyTimeLabel: "9:15 AM IST",
} as const;

export const story = {
  kn: "ಆಹ್ವಾನ",
  heading: "Two Hearts, One Beautiful Journey",
  text: "With hearts full of love and happiness, we are beginning the most beautiful chapter of our lives, and it would mean the world to us to have you with us. Please join us as we celebrate the start of our forever, and bless us with your love, your presence and your good wishes.",
  knInvite: "ತಮ್ಮೆಲ್ಲರಿಗೂ ಆತ್ಮೀಯ ಸ್ವಾಗತ",
} as const;

export const journey = {
  kn: "ನೆನಪುಗಳು",
  heading: "Four Chapters of Us",
  subtitle: "A pre-wedding story, told in the places that hold our hearts.",
} as const;

export const chapters: Record<ChapterKey, ChapterContent> = {
  traditional: {
    number: "01",
    knNumber: "೦೧",
    title: "Tradition & Grace",
    subtitle: "Rooted in tradition, wrapped in love.",
  },
  street: {
    number: "02",
    knNumber: "೦೨",
    title: "Love in the Little Moments",
    subtitle: "Every street becomes a little more beautiful when we're together.",
  },
  lake: {
    number: "03",
    knNumber: "೦೩",
    title: "Where Love Meets Serenity",
    subtitle: "Two hearts, one horizon.",
  },
  pottery: {
    number: "04",
    knNumber: "೦೪",
    title: "Shaping Our Forever",
    subtitle: "Two hands, one journey, and a lifetime to create together.",
  },
};

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
    description:
      "A joyful celebration filled with laughter, love, and beautiful traditions as we begin our wedding festivities.",
    icon: "sun",
  },
  {
    id: "varapooje",
    title: "Varapooje",
    kn: "ವರಪೂಜೆ",
    date: "19 November 2026",
    isoDate: "2026-11-19",
    time: "3:00 PM",
    description:
      "An auspicious ceremony celebrating the beautiful beginning of our wedding celebrations.",
    icon: "flame",
  },
  {
    id: "reception",
    title: "Reception",
    kn: "ಆರತಕ್ಷತೆ",
    date: "19 November 2026",
    isoDate: "2026-11-19",
    time: "7:00 PM onwards",
    description:
      "Join us for an evening of celebration, happiness, delicious food, and cherished memories.",
    icon: "sparkles",
    highlight: true,
  },
  {
    id: "muhurtham",
    title: "Muhurtham",
    kn: "ಮುಹೂರ್ತ",
    date: "20 November 2026",
    isoDate: "2026-11-20",
    time: "9:15 AM",
    description:
      "The auspicious wedding ceremony where two hearts become one, surrounded by the blessings of our loved ones.",
    icon: "heart",
    highlight: true,
  },
];

export const countdown = {
  kn: "ಶುಭ ಮುಹೂರ್ತಕ್ಕೆ ಇನ್ನು",
  heading: "Counting Down to Forever",
  doneMessage: "The day we've been waiting for is finally here! ❤️",
} as const;

export const venue = {
  kn: "ವಿವಾಹ ಸ್ಥಳ",
  heading: "The Wedding Venue",
  name: "Sri Venkateshwara Kalyana Mantapa",
  address:
    "17, 80 Feet Rd, Mohan Kumar Nagar, Yeswanthpur, Bengaluru, Karnataka 560022",
  mapsUrl: "https://maps.app.goo.gl/Cuc3gUKguhGRVPiW7",
  directionsLabel: "📍 Get Directions",
  knWelcome: "ತಮ್ಮೆಲ್ಲರ ಆಗಮನವನ್ನು ಬಯಸುತ್ತೇವೆ",
} as const;

export const finalQuote = {
  text: "Every love story is beautiful, but ours is our favorite.",
  signoff: "With love,",
  knSignoff: "ಪ್ರೀತಿಯಿಂದ",
} as const;

export const footer = {
  line: "Forever starts here.",
} as const;

export const site = {
  title: "Kruthi & Keerthan | Our Wedding",
  description:
    "Join Kruthi & Keerthan as they begin their forever — a celebration of love, family, tradition and beautiful memories.",
} as const;
