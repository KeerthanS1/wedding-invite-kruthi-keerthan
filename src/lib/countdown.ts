export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

/** Time remaining until `targetISO` (an ISO string with an explicit offset, e.g. +05:30 for IST). */
export function getTimeLeft(targetISO: string, now = Date.now()): TimeLeft {
  const diff = Date.parse(targetISO) - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };

  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: false,
  };
}
