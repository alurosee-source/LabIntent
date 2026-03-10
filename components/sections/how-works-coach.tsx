"use client";

import { useLanguage } from "@/lib/language-context";

export function HowWorksCoach() {
  const { t } = useLanguage();

  const steps = [
    { icon: "⏱", text: t("howWorksCoach.step1") },
    { icon: "📈", text: t("howWorksCoach.step2") },
    { icon: "👁", text: t("howWorksCoach.step3") },
  ];

  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-3">
          {t("howWorksCoach.badge")}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold mb-8">{t("howWorksCoach.title")}</h3>
        <div className="space-y-3">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-5 p-5 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-red-600/30 transition-colors"
            >
              <span className="text-2xl flex-shrink-0 w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center">
                {s.icon}
              </span>
              <span className="text-gray-300">→ {s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
