"use client";

import { Check, ChevronDown, ChevronUp, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { localePath, locales, localeNames, type Locale } from "@/i18n/config";

/**
 * Language menu. Each option is a real link to that locale's static page (English at `/`,
 * others at /de/, /fr/, ...), so it works without JS. There is no automatic redirect: the
 * root serves English directly and visitors choose their language here.
 *
 * `placement="up"` opens the menu above the button — used in the footer, where there's no
 * room below.
 */
export default function LangSwitcher({
  current,
  label,
  placement = "down",
}: {
  current: Locale;
  label: string;
  placement?: "up" | "down";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Chevron = placement === "up" ? ChevronUp : ChevronDown;

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        title={label}
        className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-ink bg-white border-2 border-ink rounded-full pl-2.5 pr-2 py-1.5 hover:-translate-y-0.5 transition-transform"
      >
        <Globe className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
        <span className="hidden sm:inline">{localeNames[current]}</span>
        <span className="sm:hidden font-mono text-xs uppercase">{current}</span>
        <Chevron
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="menu"
          className={`absolute right-0 z-30 w-40 rounded-xl border-[3px] border-ink bg-white comic-shadow-sm overflow-hidden py-1 ${
            placement === "up" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {locales.map((locale) => {
            const active = locale === current;
            return (
              <li key={locale} role="none">
                <a
                  role="menuitem"
                  href={localePath(locale)}
                  hrefLang={locale}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium hover:bg-bomb-100 ${
                    active ? "text-ink" : "text-bomb-600"
                  }`}
                >
                  {localeNames[locale]}
                  {active && <Check className="h-4 w-4 text-ember" strokeWidth={3} aria-hidden="true" />}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
