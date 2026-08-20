import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { eras } from "@/lib/eras";

export const Route = createFileRoute("/simulator")({
  head: () => ({
    meta: [
      { title: "Era Simulator — Build Your Own Earth | Terra" },
      {
        name: "description",
        content:
          "Pick an era, pull the toggles for oxygen, water, volcanism and life, and watch your own prehistoric environment take shape.",
      },
      { property: "og:title", content: "Era Simulator — Build Your Own Earth | Terra" },
      {
        property: "og:description",
        content: "Toggle oxygen, water, volcanism and life to build a prehistoric environment.",
      },
    ],
  }),
  component: SimulatorPage,
});

type LeverKey = "oxygen" | "water" | "volcanism" | "vegetation";

const levers: { key: LeverKey; label: string; low: string; high: string; hint: string }[] = [
  {
    key: "oxygen",
    label: "Oxygen",
    low: "Anoxic",
    high: "Rich air",
    hint: "Breathable atmosphere and blue skies",
  },
  {
    key: "water",
    label: "Liquid water",
    low: "Desert",
    high: "Ocean world",
    hint: "Oceans, rain and erosion",
  },
  {
    key: "volcanism",
    label: "Volcanism",
    low: "Dormant",
    high: "Fire fountains",
    hint: "Heat, ash and fresh crust",
  },
  {
    key: "vegetation",
    label: "Vegetation",
    low: "Bare rock",
    high: "Jungle",
    hint: "Photosynthesis and food webs",
  },
];

type Env = Record<LeverKey, number> & { warmth: number };

const species: {
  name: string;
  emoji: string;
  cap: number;
  unit: string;
  fit: (e: Env) => number;
}[] = [
  {
    name: "Stromatolite mats",
    emoji: "🦠",
    cap: 900,
    unit: "colonies",
    fit: (e) => (e.water / 100) * (1 - e.oxygen / 220) * (0.5 + e.volcanism / 200),
  },
  {
    name: "Trilobites",
    emoji: "🦐",
    cap: 620,
    unit: "shoals",
    fit: (e) => (e.water / 100) * (e.oxygen / 100) * bell(e.warmth, 60, 40),
  },
  {
    name: "Dragonflies",
    emoji: "🦋",
    cap: 480,
    unit: "swarms",
    fit: (e) => (e.oxygen / 100) ** 1.4 * (e.vegetation / 100) * bell(e.warmth, 65, 35),
  },
  {
    name: "Sauropods",
    emoji: "🦕",
    cap: 240,
    unit: "herds",
    fit: (e) => (e.vegetation / 100) ** 1.2 * (e.water / 100) * bell(e.warmth, 68, 30),
  },
  {
    name: "Woolly mammoths",
    emoji: "🦣",
    cap: 180,
    unit: "herds",
    fit: (e) => (e.vegetation / 100) * bell(e.warmth, 22, 26) * (e.oxygen / 100),
  },
  {
    name: "Early primates",
    emoji: "🐒",
    cap: 320,
    unit: "troops",
    fit: (e) =>
      (e.vegetation / 100) ** 1.3 * (e.oxygen / 100) * bell(e.warmth, 55, 26) * (1 - e.volcanism / 180),
  },
];

function bell(value: number, centre: number, width: number) {
  return Math.max(0, 1 - Math.abs(value - centre) / width);
}

function SimulatorPage() {
  const [eraId, setEraId] = useState(eras[1]!.id);
  const [env, setEnv] = useState<Env>({
    oxygen: 25,
    water: 70,
    volcanism: 60,
    vegetation: 20,
    warmth: 55,
  });

  const era = eras.find((e) => e.id === eraId)!;
  const set = (key: keyof Env, value: number) => setEnv((s) => ({ ...s, [key]: value }));

  const populations = useMemo(
    () =>
      species.map((s) => {
        const fit = Math.max(0, Math.min(1, s.fit(env)));
        return { ...s, fit, count: Math.round(fit * s.cap) };
      }),
    [env],
  );

  const total = populations.reduce((a, p) => a + p.count, 0);

  const verdict = useMemo(() => {
    if (env.water < 15) return "Sterile rock. Without liquid water, chemistry never gets organised.";
    if (env.warmth >= 85) return "Runaway greenhouse. Oceans boil away and the crust bakes.";
    if (env.warmth <= 15) return "Snowball planet. Ice reaches the equator and reflects the sun back.";
    if (total === 0) return "Chemically interesting, biologically empty. Nothing has taken hold yet.";
    if (env.oxygen < 25)
      return "Microbial world. Slow, anaerobic, and stuck at single cells for a long while.";
    if (total > 900) return "A thriving biosphere — crowded food webs and room for complex life.";
    return "A fragile ecosystem. A handful of species cling on, but the margins are thin.";
  }, [env, total]);

  const filter = [
    `saturate(${0.55 + env.oxygen / 130})`,
    `contrast(${0.95 + env.vegetation / 500})`,
    `brightness(${0.55 + env.warmth / 180})`,
    `hue-rotate(${-env.volcanism / 8 + env.vegetation / 14}deg)`,
    `grayscale(${Math.max(0, 0.45 - env.vegetation / 200)})`,
  ].join(" ");

  return (
    <main className="pt-20">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="font-display text-xs uppercase tracking-[0.4em] text-accent">Category Two</p>
        <h1 className="mt-4 text-4xl sm:text-6xl">Build your own era</h1>
        <p className="mt-5 max-w-xl text-muted-foreground">
          Choose a period, then slide the levers. Every setting changes the sky, the sea — and how
          many animals can survive there.
        </p>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-28 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="relative overflow-hidden rounded-xl border border-border">
            <img
              src={era.image}
              alt={`Simulated ${era.name} environment`}
              loading="lazy"
              width={1536}
              height={864}
              style={{ filter }}
              className="h-[260px] w-full object-cover transition-all duration-700 sm:h-[440px]"
            />
            <div
              className="absolute inset-0 bg-crust/70 mix-blend-multiply transition-opacity duration-700"
              style={{ opacity: Math.max(0, (60 - env.water) / 60) }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ember/60 via-transparent to-transparent transition-opacity duration-700"
              style={{ opacity: env.volcanism / 100 }}
            />
            <div
              className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-accent/40 to-transparent transition-opacity duration-700"
              style={{ opacity: env.oxygen / 100 }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-12 flex items-end justify-around px-6">
              {populations
                .filter((p) => p.count > 0)
                .map((p, i) => (
                  <span
                    key={p.name}
                    aria-hidden="true"
                    className="float-slow select-none transition-all duration-500"
                    style={{
                      fontSize: `${1.2 + p.fit * 1.6}rem`,
                      opacity: 0.35 + p.fit * 0.65,
                      animationDelay: `${i * 0.6}s`,
                    }}
                  >
                    {p.emoji}
                  </span>
                ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-between gap-2 bg-background/70 px-4 py-3 backdrop-blur">
              <span className="font-display text-sm uppercase tracking-[0.25em]">{era.name}</span>
              <span className="text-xs text-muted-foreground">
                {total.toLocaleString()} populations · {env.warmth}° warmth index
              </span>
            </div>
          </div>
          <p className="mt-5 rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
            <span className="font-display text-accent">Outcome — </span>
            {verdict}
          </p>

          <h2 className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Animal census
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {populations.map((p) => (
              <div
                key={p.name}
                className={`rounded-lg border border-border bg-card p-4 transition-opacity duration-500 ${
                  p.count === 0 ? "opacity-45" : "opacity-100"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-display text-sm">
                    <span aria-hidden="true" className="text-lg">
                      {p.emoji}
                    </span>
                    {p.name}
                  </span>
                  <span
                    className={`font-display text-sm tabular-nums ${
                      p.count === 0 ? "text-muted-foreground" : "text-accent"
                    }`}
                  >
                    {p.count === 0 ? "extinct" : `${p.count.toLocaleString()} ${p.unit}`}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                    style={{ width: `${p.fit * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Era</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {eras.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setEraId(e.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors ${
                    e.id === eraId
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Systems</h2>
            {levers.map((l) => (
              <div key={l.key} className="rounded-lg border border-border bg-card p-4">
                <label
                  htmlFor={l.key}
                  className="flex items-center justify-between font-display text-sm"
                >
                  {l.label} <span className="text-accent">{env[l.key]}</span>
                </label>
                <p className="mt-0.5 text-xs text-muted-foreground">{l.hint}</p>
                <input
                  id={l.key}
                  type="range"
                  min={0}
                  max={100}
                  value={env[l.key]}
                  onChange={(e) => set(l.key, Number(e.target.value))}
                  className="mt-3 w-full accent-[oklch(0.78_0.13_190)]"
                />
                <div className="mt-1 flex justify-between text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  <span>{l.low}</span>
                  <span>{l.high}</span>
                </div>
              </div>
            ))}

            <div className="rounded-lg border border-border bg-card p-4">
              <label
                htmlFor="warmth"
                className="flex items-center justify-between font-display text-sm"
              >
                Warmth index <span className="text-accent">{env.warmth}</span>
              </label>
              <p className="mt-0.5 text-xs text-muted-foreground">Global temperature balance</p>
              <input
                id="warmth"
                type="range"
                min={0}
                max={100}
                value={env.warmth}
                onChange={(e) => set("warmth", Number(e.target.value))}
                className="mt-3 w-full accent-[oklch(0.78_0.13_190)]"
              />
              <div className="mt-1 flex justify-between text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                <span>Snowball</span>
                <span>Greenhouse</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

