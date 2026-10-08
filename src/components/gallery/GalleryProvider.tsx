"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "motion/react";
import type { Photo } from "@/types";

const Lightbox = dynamic(() => import("./Lightbox").then((m) => m.Lightbox), { ssr: false });

interface GalleryContextValue {
  /** Open the lightbox on `photos[index]`. */
  open: (photos: Photo[], index: number) => void;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("useGallery must be used inside <GalleryProvider>");
  return ctx;
}

interface OpenState {
  photos: Photo[];
  index: number;
}

/** Owns the single lightbox shared by every gallery on the page. */
export function GalleryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OpenState | null>(null);

  const open = useCallback((photos: Photo[], index: number) => setState({ photos, index }), []);
  const close = useCallback(() => setState(null), []);
  const setIndex = useCallback((index: number) => setState((s) => (s ? { ...s, index } : s)), []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <GalleryContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {state && <Lightbox key="lightbox" photos={state.photos} index={state.index} onIndexChange={setIndex} onClose={close} />}
      </AnimatePresence>
    </GalleryContext.Provider>
  );
}
