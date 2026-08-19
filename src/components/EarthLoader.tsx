import { useEffect, useState } from "react";

export function EarthLoader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setDone(true), 2200);
    const b = setTimeout(() => setHidden(true), 3000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="star-field absolute inset-0 opacity-70" />
      <div className="earth-orb relative h-40 w-40 sm:h-52 sm:w-52">
        <div className="earth-surface absolute inset-0 rounded-full" />
        <div className="absolute inset-0 rounded-full shadow-orb" />
      </div>
      <p className="mt-10 font-display text-xs uppercase tracking-[0.5em] text-muted-foreground">
        4.54 billion years loading
      </p>
    </div>
  );
}
