import { createFileRoute, Link } from "@tanstack/react-router";
import heroEarth from "@/assets/hero-earth.jpg";
import { eras } from "@/lib/eras";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Terra — The Origins of Earth" },
      {
        name: "description",
        content:
          "An immersive journey through the origins of Earth: an interactive era timeline, a build-your-own environment simulator, and the story of how humans evolved.",
      },
      { property: "og:title", content: "Terra — The Origins of Earth" },
      {
        property: "og:description",
        content:
          "Explore 4.54 billion years of Earth through an interactive timeline, an era simulator and the human story.",
      },
    ],
  }),
  component: Index,
});

const categories = [
  {
    to: "/timeline",
    kicker: "One",
    title: "Interactive timeline",
    text: "Five eras, five worlds. Scroll through deep time as each landscape breathes into focus.",
  },
  {
    to: "/simulator",
    kicker: "Two",
    title: "Era simulator",
    text: "Pull the toggles for oxygen, water, volcanism and life, and build an environment of your own.",
  },
  {
    to: "/humans",
    kicker: "Three",
    title: "Becoming human",
    text: "An animated walk from Sahelanthropus to sapiens, drawn out in four comic panels.",
  },
] as const;

function Index() {
  return (
    <main>
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <img
          src={heroEarth}
          alt="The young Earth seen from orbit, magma seams glowing through a dark crust"
          width={1920}
          height={1088}
          className="ken-burns absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="star-field absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-32">
          <p className="drift-in font-display text-xs uppercase tracking-[0.5em] text-accent">
            4,540,000,000 years
          </p>
          <h1
            className="drift-in mt-6 max-w-4xl text-5xl leading-[0.95] sm:text-8xl"
            style={{ animationDelay: "120ms" }}
          >
            The origins
            <span className="block text-primary">of Earth</span>
          </h1>
          <p
            className="drift-in mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            A planet made of collided dust, drowned in lava, frozen solid, and eventually curious
            enough to ask where it came from.
          </p>
          <div className="drift-in mt-9 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
            <Link
              to="/timeline"
              className="rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Enter the timeline
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-5 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group rounded-xl border border-border bg-card p-7 transition-colors hover:border-accent"
            >
              <span className="font-display text-xs uppercase tracking-[0.35em] text-accent">
                {c.kicker}
              </span>
              <h2 className="mt-4 text-2xl transition-colors group-hover:text-accent">{c.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              <span className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-primary">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-bg border-y border-border py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Deep time at a glance
          </h2>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
            {eras.map((era) => (
              <Link
                key={era.id}
                to="/timeline"
                hash={era.id}
                className="group relative h-56 w-64 shrink-0 overflow-hidden rounded-xl border border-border"
              >
                <img
                  src={era.image}
                  alt={`${era.name}: ${era.headline}`}
                  loading="lazy"
                  width={1536}
                  height={864}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="font-display text-lg">{era.name}</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {era.when}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-5 py-14 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        Terra · a field guide to a very old planet
      </footer>
    </main>
  );
}
