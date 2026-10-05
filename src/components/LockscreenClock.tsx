"use client";

import { useEffect } from "react";
import { CLOCK_DATE_ID, CLOCK_TIME_ID } from "@/lib/clock";

function format(d: Date): [string, string] {
  const h = d.getHours() % 12 || 12;
  const m = d.getMinutes();
  return [
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    `${h}:${m < 10 ? "0" : ""}${m}`,
  ];
}

/** Keeps the clock current, ticking over on each minute boundary. */
export function LockscreenClock() {
  useEffect(() => {
    const date = document.getElementById(CLOCK_DATE_ID);
    const time = document.getElementById(CLOCK_TIME_ID);
    if (!date || !time) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const now = new Date();
      [date.textContent, time.textContent] = format(now);
      timer = setTimeout(tick, 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds()) + 50);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  return null;
}
