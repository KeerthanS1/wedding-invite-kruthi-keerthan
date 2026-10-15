import Image from "next/image";
import { cn } from "@/lib/utils";

/** A cutting-chai glass and a coffee cup, with a heart between them. */
export function ChaiCoffee({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-end justify-center gap-3 sm:gap-5", className)} aria-hidden="true">
      <Image src="/images/icons/chai.png" alt="" width={512} height={512} className="size-20 sm:size-24" />
      <svg viewBox="0 0 30 28" className="mb-7 size-6 shrink-0 self-center text-rust sm:size-7" focusable="false">
        <path d="M15 27 C4 19 0 12 4 6 C7 2 13 2 15 7 C17 2 23 2 26 6 C30 12 26 19 15 27Z" fill="currentColor" />
      </svg>
      <Image src="/images/icons/coffee.png" alt="" width={512} height={512} className="size-20 sm:size-24" />
    </div>
  );
}
