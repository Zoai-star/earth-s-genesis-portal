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

type ToggleKey = "oxygen" | "water" | "volcanism" | "life";

const toggleMeta: { key: ToggleKey; label: string; hint: string }[] = [
  { key: "oxygen", label: "Oxygen", hint: "Breathable atmosphere and blue skies" },
  { key: "water", label: "Liquid water", hint: "Oceans, rain and erosion" },
  { key: "volcanism", label: "Volcanism", hint: "Heat, ash and fresh crust" },
  { key: "life", label: "Life", hint: "Photosynthesis and food webs" },
];

function SimulatorPage() {
  const [eraId, setEraId] = useState(eras[1]!.id);
  const [state, setState] = useState<Record<ToggleKey, boolean>>({
    oxygen: false,
    water: true,
    volcanism: true,
    life: false,
  });
  const [warmth, setWarmth] = useState(55);

  const era = eras.find((e) => e.id === eraId)!;
  const on = Object.values(state).filter(Boolean).length;

  const verdict = useMemo(() => {
    if (!state.water) return "Sterile rock. Without liquid water, chemistry never gets organised.";
    if (!state.life && state.oxygen)
      return "An oxygen-rich but empty world — chemically unstable and unlikely to last.";
    if (state.life && state.oxygen && warmth > 30 && warmth < 80)
      return "A thriving biosphere. Complex life could plausibly evolve here.";
    if (state.life && !state.oxygen)
      return "Microbial world. Slow, anaerobic, and stuck at single cells for a billion years.";
    if (warmth >= 80) return "Runaway greenhouse. Oceans boil away and the crust bakes.";
    if (warmth <= 30) return "Snowball planet. Ice reaches the equator and reflects the sun back.";
    return "A quiet, habitable-looking world waiting on a spark.";
  }, [state, warmth]);

  const filter = [
    state.oxygen ? "saturate(1.15)" : "saturate(0.6)",
    state.life ? "contrast(1.05)" : "grayscale(0.35)",
    `brightness(${0.55 + warmth / 180})`,
    state.volcanism ? "hue-rotate(-12deg)" : "hue-rotate(6deg)",
  ].join(" ");

  return (
    <main className="pt-20">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="font-display text-xs uppercase tracking-[0.4em] text-accent">Category Two</p>
        <h1 className="mt-4 text-4xl sm:text-6xl">Build your own era</h1>
        <p className="mt-5 max-w-xl text-muted-foreground">
          Choose a period, then pull the levers. Every switch changes the sky, the sea and the odds
          for life.
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
            {!state.water && (
              <div className="absolute inset-0 bg-crust/60 mix-blend-multiply transition-opacity duration-700" />
            )}
            {state.volcanism && (
              <div className="absolute inset-0 bg-gradient-to-t from-ember/40 via-transparent to-transparent" />
            )}
            {state.oxygen && (
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-accent/30 to-transparent" />
            )}
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-between gap-2 bg-background/70 px-4 py-3 backdrop-blur">
              <span className="font-display text-sm uppercase tracking-[0.25em]">{era.name}</span>
              <span className="text-xs text-muted-foreground">
                {on}/4 systems active · {warmth}° warmth index
              </span>
            </div>
          </div>
          <p className="mt-5 rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
            <span className="font-display text-accent">Outcome — </span>
            {verdict}
          </p>
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
            {toggleMeta.map((t) => (
              <button
                key={t.key}
                onClick={() => setState((s) => ({ ...s, [t.key]: !s[t.key] }))}
                aria-pressed={state[t.key]}
                className="flex w-full items-center gap-4 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-accent/60"
              >
                <span
                  className={`relative h-10 w-6 shrink-0 rounded-full border border-border transition-colors ${
                    state[t.key] ? "bg-accent/25" : "bg-secondary"
                  }`}
                >
                  <span
                    className={`absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full transition-all duration-300 ${
                      state[t.key] ? "top-1 bg-accent" : "top-5 bg-muted-foreground"
                    }`}
                  />
                </span>
                <span>
                  <span className="block font-display text-sm">{t.label}</span>
                  <span className="block text-xs text-muted-foreground">{t.hint}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <label
              htmlFor="warmth"
              className="flex items-center justify-between font-display text-sm"
            >
              Warmth index <span className="text-accent">{warmth}</span>
            </label>
            <input
              id="warmth"
              type="range"
              min={0}
              max={100}
              value={warmth}
              onChange={(e) => setWarmth(Number(e.target.value))}
              className="mt-3 w-full accent-[oklch(0.78_0.13_190)]"
            />
            <div className="mt-1 flex justify-between text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Snowball</span>
              <span>Greenhouse</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
