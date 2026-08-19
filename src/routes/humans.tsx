import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import comic1 from "@/assets/comic-1.jpg";
import comic2 from "@/assets/comic-2.jpg";
import comic3 from "@/assets/comic-3.jpg";
import comic4 from "@/assets/comic-4.jpg";

export const Route = createFileRoute("/humans")({
  head: () => ({
    meta: [
      { title: "How Humans Evolved — Comic Strip History | Terra" },
      {
        name: "description",
        content:
          "Seven million years of human evolution told through an animated walking sequence and hand-drawn comic strip panels.",
      },
      { property: "og:title", content: "How Humans Evolved — Comic Strip History | Terra" },
      {
        property: "og:description",
        content: "Human evolution told through animation and comic strip panels.",
      },
    ],
  }),
  component: HumansPage,
});

const stages = [
  { name: "Sahelanthropus", when: "7 Mya", height: 34, lean: 26, brain: 350 },
  { name: "Australopithecus", when: "3.5 Mya", height: 44, lean: 18, brain: 450 },
  { name: "Homo habilis", when: "2.3 Mya", height: 54, lean: 12, brain: 640 },
  { name: "Homo erectus", when: "1.8 Mya", height: 72, lean: 6, brain: 950 },
  { name: "Neanderthal", when: "400 kya", height: 78, lean: 3, brain: 1450 },
  { name: "Homo sapiens", when: "300 kya", height: 84, lean: 0, brain: 1350 },
];

const panels = [
  {
    img: comic1,
    title: "Standing up",
    text: "Forests thin into savanna. Walking on two legs frees the hands — and the hands change everything.",
  },
  {
    img: comic2,
    title: "Catching fire",
    text: "Cooked food means more calories with less chewing. Guts shrink, brains grow, nights get longer.",
  },
  {
    img: comic3,
    title: "Telling stories",
    text: "Ochre on a cave wall. The first time a mind stored an idea outside of itself.",
  },
  {
    img: comic4,
    title: "Planting roots",
    text: "Wheat, barley and goats. Twelve thousand years ago we stopped following food and started growing it.",
  },
];

function HumansPage() {
  const [step, setStep] = useState(stages.length - 1);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState<string[]>([]);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setStep((s) => (s + 1) % stages.length), 1400);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible((v) => [...new Set([...v, e.target.id])]);
        }),
      { threshold: 0.25 },
    );
    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stage = stages[step];

  return (
    <main className="pt-20">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="font-display text-xs uppercase tracking-[0.4em] text-accent">
          Category Three
        </p>
        <h1 className="mt-4 text-4xl sm:text-6xl">Becoming human</h1>
        <p className="mt-5 max-w-xl text-muted-foreground">
          Seven million years of small changes: a straighter spine, a bigger skull, a longer
          childhood — and a species that learned to draw its own history.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-10">
          <div className="flex h-56 items-end justify-between gap-2 border-b border-border pb-4 sm:h-72">
            {stages.map((s, i) => (
              <button
                key={s.name}
                onClick={() => {
                  setPlaying(false);
                  setStep(i);
                }}
                className="group flex flex-1 flex-col items-center justify-end gap-3"
                aria-label={`${s.name}, ${s.when}`}
              >
                <span
                  aria-hidden="true"
                  style={{
                    height: `${s.height}%`,
                    transform: `rotate(${-s.lean}deg)`,
                    opacity: i <= step ? 1 : 0.22,
                  }}
                  className="w-2 origin-bottom rounded-full bg-gradient-to-t from-primary to-accent transition-all duration-700 group-hover:opacity-100 sm:w-3"
                />
                <span
                  className={`text-[0.55rem] uppercase tracking-[0.1em] transition-colors sm:text-[0.65rem] ${
                    i === step ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {s.when}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl">{stage.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {stage.when} · brain volume ≈ {stage.brain} cm³
              </p>
            </div>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="rounded-full border border-accent px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {playing ? "Pause walk" : "Play walk"}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-28">
        <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          The strip: four turning points
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {panels.map((p, i) => (
            <article
              key={p.title}
              id={`panel-${i}`}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              style={{ animationDelay: `${(i % 2) * 120}ms` }}
              className={`overflow-hidden rounded-xl border border-border bg-card ${
                visible.includes(`panel-${i}`) ? "drift-in" : "opacity-0"
              }`}
            >
              <img
                src={p.img}
                alt={`Comic panel: ${p.title}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-56 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-72"
              />
              <div className="p-5">
                <h3 className="font-display text-lg">
                  <span className="text-primary">0{i + 1} · </span>
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
