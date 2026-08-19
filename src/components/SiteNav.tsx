import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Origins" },
  { to: "/timeline", label: "Timeline" },
  { to: "/simulator", label: "Simulator" },
  { to: "/humans", label: "Humans" },
] as const;

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="font-display text-sm uppercase tracking-[0.35em] text-foreground">
          Terra
        </Link>
        <div className="flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.2em] sm:gap-7 sm:text-xs">
          {links.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-muted-foreground transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
