import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { eras } from "@/lib/eras";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Interactive Timeline of Earth — Terra" },
      {
        name: "description",
        content:
          "Scroll 4.5 billion years of Earth history, from molten Hadean rock to the ice ages, with era-by-era landscape imagery.",
      },
      { property: "og:title", content: "Interactive Timeline of Earth — Terra" },
      {
        property: "og:description",
        content: "Scroll through five eras of Earth history with zooming landscape imagery.",
      },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  const [active, setActive] = useState(eras[0].id);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="pt-20">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="font-display text-xs uppercase tracking-[0.4em] text-accent">Category One</p>
        <h1 className="mt-4 max-w-3xl text-4xl sm:text-6xl">The interactive timeline</h1>
        <p className="mt-5 max-w-xl text-muted-foreground">
          Five moments in 4.54 billion years. Scroll to travel forward — each era pulls its own
          landscape into focus.
        </p>
      </section>

      <div className="mx-auto flex max-w-6xl gap-10 px-5 pb-28">
        <aside className="sticky top-24 hidden h-fit w-40 shrink-0 lg:block">
          <ol className="space-y-4 border-l border-border pl-5">
            {eras.map((era) => (
              <li key={era.id}>
                <a
                  href={`#${era.id}`}
                  className={`block text-xs uppercase tracking-[0.2em] transition-colors ${
                    active === era.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {era.name}
                  <span className="mt-1 block text-[0.6rem] tracking-normal opacity-60">
                    {era.when}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="flex-1 space-y-24">
          {eras.map((era, i) => (
            <article
              key={era.id}
              id={era.id}
              ref={(el) => {
                refs.current[era.id] = el;
              }}
              className="scroll-mt-28"
            >
              <div className="overflow-hidden rounded-xl border border-border">
                <img
                  src={era.image}
                  alt={`${era.name} landscape: ${era.headline}`}
                  loading="lazy"
                  width={1536}
                  height={864}
                  className={`h-[240px] w-full object-cover sm:h-[420px] ${
                    active === era.id ? "ken-burns" : ""
                  }`}
                />
              </div>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-display text-sm text-primary">0{i + 1}</span>
                <h2 className="text-2xl sm:text-4xl">{era.name}</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {era.when}
                </span>
              </div>
              <p className="mt-3 font-display text-lg text-accent">{era.headline}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{era.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {era.facts.map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
