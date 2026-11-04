"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/** Rockets go up once the top of the section is this far up the screen (0 = top, 1 = bottom). */
const START_AT = 0.7;
const GRAVITY = 320; // px per second squared
const MAX_SPARKS = 1600;
const ROCKET_TAIL = 0.07; // seconds of travel shown as a streak
const SPARK_TAIL = 0.05;
/** Rich colours, because most of the site is pale cream and pastels would vanish against it. */
const COLOURS = ["#e63946", "#ff7b00", "#f2a900", "#d6249f", "#7b2ff7", "#0aa6c2", "#18a558"];

const between = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  colour: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 1 → 0
  fade: number; // life lost per second
  size: number;
  colour: string;
  fall: number; // share of gravity felt
}

/**
 * Rocket firecrackers over the last part of the page (the section this sits in, and the footer
 * below it): they streak up from the bottom of the screen and burst into showers of colour.
 * They only run while that part is on screen, and are never drawn above it. The canvas ignores
 * taps and scrolling, so the site stays fully usable.
 */
export function Fireworks() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const section = canvas?.closest("section");
    if (!canvas || !ctx || !section || reduce) return;

    let width = 0;
    let height = 0;
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth; // excludes the scrollbar, so nothing is stretched
      height = canvas.clientHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const rockets: Rocket[] = [];
    let sparks: Spark[] = [];
    let flashes: { x: number; y: number; life: number; size: number }[] = [];

    const sectionTop = () => section.getBoundingClientRect().top;

    const launch = () => {
      const zone = Math.max(sectionTop(), 0);
      const top = zone + (height - zone) * between(0.1, 0.55);
      rockets.push({
        x: width * between(0.08, 0.92),
        y: height,
        vx: between(-40, 40),
        vy: -Math.sqrt(2 * GRAVITY * (height - top)),
        colour: pick(COLOURS),
      });
    };

    const burst = (x: number, y: number, colour: string) => {
      const phone = width < 640;
      const style = pick(["round", "round", "ring", "willow"]);
      const count = Math.round((phone ? 80 : 130) * between(0.85, 1.15));
      const speed = (phone ? 330 : 480) * between(0.85, 1.2);
      flashes.push({ x, y, life: 1, size: phone ? 45 : 70 });
      const second = pick(COLOURS);
      for (let i = 0; i < count && sparks.length < MAX_SPARKS; i++) {
        const angle = (i / count) * Math.PI * 2 + between(-0.05, 0.05);
        const pace = speed * (style === "ring" ? between(0.92, 1) : Math.sqrt(Math.random()));
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * pace,
          vy: Math.sin(angle) * pace,
          life: 1,
          fade: style === "willow" ? between(0.5, 0.7) : between(0.8, 1.15),
          size: between(1.6, 2.6),
          colour: i % 3 === 0 ? second : colour,
          fall: style === "willow" ? 0.5 : 0.22,
        });
      }
    };

    let nextLaunch = 0;
    let last = 0;
    let frame = 0;
    let running = false;

    const start = () => {
      if (running || sectionTop() >= height * START_AT) return;
      running = true;
      last = nextLaunch = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const tick = (time: number) => {
      const dt = Math.min(time - last, 50) / 1000;
      last = time;

      const top = sectionTop();
      const active = top < height * START_AT;

      if (active && time >= nextLaunch) {
        launch();
        // a few together now and then, for a proper display
        if (Math.random() < 0.3) launch();
        nextLaunch = time + (width < 640 ? between(500, 1000) : between(300, 750));
      }

      ctx.clearRect(0, 0, width, height);

      // nothing is ever drawn above the section
      const zone = Math.max(top, 0);
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, zone, width, height - zone);
      ctx.clip();

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.vy += GRAVITY * dt;
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        ctx.strokeStyle = r.colour;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        // each streak is drawn behind the moving point, in proportion to its speed
        ctx.moveTo(r.x - r.vx * ROCKET_TAIL, r.y - r.vy * ROCKET_TAIL);
        ctx.lineTo(r.x, r.y);
        ctx.stroke();
        ctx.fillStyle = "#fff7e0"; // the bright head of the rocket
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.8, 0, Math.PI * 2);
        ctx.fill();
        if (r.vy >= 0) {
          burst(r.x, r.y, r.colour);
          rockets.splice(i, 1);
        }
      }

      // the flash at the moment a rocket bursts
      flashes = flashes.filter((f) => (f.life -= 5 * dt) > 0);
      for (const f of flashes) {
        const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size);
        glow.addColorStop(0, `rgba(255,247,224,${f.life})`);
        glow.addColorStop(1, "rgba(255,247,224,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(f.x - f.size, f.y - f.size, f.size * 2, f.size * 2);
      }

      const drag = Math.pow(0.12, dt);
      sparks = sparks.filter((s) => (s.life -= s.fade * dt) > 0);
      ctx.lineCap = "round";
      for (const s of sparks) {
        s.vx *= drag;
        s.vy = s.vy * drag + GRAVITY * s.fall * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        ctx.globalAlpha = Math.min(1, s.life * 1.8);
        // white-hot just after the burst, then its own colour
        ctx.strokeStyle = s.life > 0.8 ? "#fff7e0" : s.colour;
        ctx.lineWidth = s.size * 1.6;
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * SPARK_TAIL, s.y - s.vy * SPARK_TAIL);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      }
      ctx.restore();

      // scrolled away: finish what is in the air if it can still be seen, then stop using the battery
      if (!active && (top >= height || (!rockets.length && !sparks.length))) {
        ctx.clearRect(0, 0, width, height);
        rockets.length = 0;
        sparks = [];
        flashes = [];
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", start, { passive: true });
    start();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", start);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[140] size-full" aria-hidden="true" />;
}
