"use client";

import { useLanguage } from "@/lib/language-context";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-2 bg-gray-900 border border-gray-800 rounded-lg p-1">
      <button
        onClick={() => setLanguage("ru")}
        className={`px-4 py-2 rounded text-sm font-semibold transition-all ${
          language === "ru"
            ? "bg-red-600 text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-4 py-2 rounded text-sm font-semibold transition-all ${
          language === "en"
            ? "bg-red-600 text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
