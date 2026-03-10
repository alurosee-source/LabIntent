"use client";

import { useLanguage } from "@/lib/language-context";

export function ProblemCoach() {
  const { t } = useLanguage();

  const lines = [
    t("problemCoach.line1"),
    t("problemCoach.line2"),
    t("problemCoach.line3"),
  ];

  return (
    <section className="py-16 px-4 bg-gray-900/50">
      <div className="max-w-2xl mx-auto space-y-3">
        {lines.map((line, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded-lg bg-black border border-gray-800"
          >
            <span className="text-red-600 font-bold text-lg flex-shrink-0 mt-0.5">—</span>
            <span className="text-gray-300 text-base leading-relaxed">{line}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
