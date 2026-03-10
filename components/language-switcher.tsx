"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        aria-label="Switch language"
      >
        {/* Globe / planet icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 min-w-[80px] rounded-md border border-gray-800 bg-gray-900 shadow-xl overflow-hidden">
          {(["en", "ru"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${
                language === lang
                  ? "bg-red-600/20 text-red-400"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {lang === "en" ? "🇬🇧 EN" : "🇷🇺 RU"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
