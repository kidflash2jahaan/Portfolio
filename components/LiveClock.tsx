"use client";

import { useEffect, useState } from "react";

/** Pacific local time, ticking every second. Pure passive animation. */
export default function LiveClock() {
  const [time, setTime] = useState<string>("--:--:--");
  const [day, setDay] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const t = d.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "America/Los_Angeles",
      });
      const dy = d.toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: "America/Los_Angeles",
      });
      setTime(t);
      setDay(dy.toUpperCase());
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint flex flex-col items-end gap-1">
      <span>
        Local · <span className="text-ink tabular-nums">{time}</span>
      </span>
      <span>{day} · PT</span>
    </div>
  );
}
