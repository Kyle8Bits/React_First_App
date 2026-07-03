import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "@phosphor-icons/react";
import projectsData from "../data/project.json";
import majorData from "../data/major.json";

type Command = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Projects" | "Links";
  action: () => void;
};

const isEditableTarget = (el: EventTarget | null) => {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
};

// Global search/nav modal — Cmd/Ctrl+K or `/` opens. Recruiters share stuff
// like this, so keep it snappy and coral-branded.
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const commands: Command[] = useMemo(() => {
    const scrollToHash = (hash: string) => {
      if (window.location.pathname !== "/") {
        navigate(`/${hash}`);
      } else {
        document
          .querySelector(hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const sections: Command[] = [
      { id: "top", label: "Go to Home", group: "Navigate", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
      { id: "about", label: "About — Who I Am", group: "Navigate", action: () => scrollToHash("#about") },
      { id: "projects", label: "Major Projects", group: "Navigate", action: () => scrollToHash("#projects") },
      { id: "awards", label: "Awards & Titles", group: "Navigate", action: () => scrollToHash("#awards") },
      { id: "activities", label: "Activities", group: "Navigate", action: () => scrollToHash("#activities") },
    ];

    const projects: Command[] = [
      ...majorData.map((p) => ({
        id: `major-${p.title}`,
        label: p.title,
        hint: p.event,
        group: "Projects" as const,
        action: () => {
          if (p.link) window.open(p.link, "_blank", "noopener,noreferrer");
          else if (p.github) window.open(p.github, "_blank", "noopener,noreferrer");
        },
      })),
      ...projectsData.map((p) => ({
        id: `proj-${p.slug}`,
        label: p.title,
        hint: p.builtFor,
        group: "Projects" as const,
        action: () => navigate(`/project/${p.slug}`),
      })),
    ];

    const links: Command[] = [
      { id: "email", label: "Email — khoamaidang2611@gmail.com", group: "Links", action: () => (window.location.href = "mailto:khoamaidang2611@gmail.com") },
      { id: "github", label: "GitHub — Kyle8Bits", group: "Links", action: () => window.open("https://github.com/Kyle8Bits", "_blank", "noopener,noreferrer") },
      { id: "linkedin", label: "LinkedIn — kylemai261", group: "Links", action: () => window.open("https://www.linkedin.com/in/kylemai261/", "_blank", "noopener,noreferrer") },
    ];

    return [...sections, ...projects, ...links];
  }, [navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint?.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const grouped = useMemo(() => {
    const map = new Map<Command["group"], Command[]>();
    for (const c of filtered) {
      const arr = map.get(c.group) ?? [];
      arr.push(c);
      map.set(c.group, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  // Global keyboard shortcut: Cmd/Ctrl+K or `/` (when not typing).
  // Also listens for a custom event so UI buttons can toggle it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMeta = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const isSlash = e.key === "/" && !isEditableTarget(e.target);
      if (isMeta || isSlash) {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onToggle = () => setOpen((prev) => !prev);
    window.addEventListener("keydown", onKey);
    window.addEventListener("command-palette:toggle", onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("command-palette:toggle", onToggle);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 10);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLButtonElement>(
      `[data-idx="${activeIdx}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx, open]);

  const runCommand = (idx: number) => {
    const cmd = filtered[idx];
    if (!cmd) return;
    setOpen(false);
    // Defer so the modal is gone before scroll/navigate
    setTimeout(() => cmd.action(), 40);
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runCommand(activeIdx);
    }
  };

  if (!open) return null;

  let renderIdx = 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div
        className="relative w-full max-w-xl rounded-2xl border border-primary/20 bg-surface/95 shadow-[0_30px_80px_rgba(0,0,0,0.55)] overflow-hidden"
        onKeyDown={onListKeyDown}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-text/10">
          <MagnifyingGlass size={18} className="text-text/50" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, projects, or links…"
            className="flex-1 bg-transparent outline-none text-text placeholder:text-text/40 text-sm"
          />
          <kbd className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded bg-text/10 text-text/60">
            Esc
          </kbd>
        </div>

        <div
          ref={listRef}
          className="max-h-[50vh] overflow-y-auto py-2"
        >
          {filtered.length === 0 && (
            <div className="px-5 py-8 text-center text-text/50 text-sm">
              No matches for "{query}"
            </div>
          )}
          {grouped.map(([group, items]) => (
            <div key={group} className="mb-1">
              <div className="px-5 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-text/40">
                {group}
              </div>
              {items.map((cmd) => {
                const idx = renderIdx++;
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={cmd.id}
                    data-idx={idx}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => runCommand(idx)}
                    className={`w-full flex items-center justify-between text-left px-5 py-2.5 text-sm transition-colors cursor-pointer ${
                      isActive
                        ? "bg-primary/10 text-text"
                        : "text-text/80 hover:bg-text/5"
                    }`}
                  >
                    <span className="truncate">{cmd.label}</span>
                    {cmd.hint && (
                      <span className="text-xs text-text/40 ml-3 shrink-0">
                        {cmd.hint}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-5 py-2.5 border-t border-text/10 text-[11px] text-text/40">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-text/10">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-text/10">↵</kbd>
              open
            </span>
          </div>
          <span className="text-text/40">Kyle Mai</span>
        </div>
      </div>
    </div>
  );
}
