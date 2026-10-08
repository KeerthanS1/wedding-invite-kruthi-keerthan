/** Tiny class-name joiner (keeps us free of extra dependencies). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
