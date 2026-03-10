"use client";

import { useLanguage } from "@/lib/language-context";

export function HeroCoach() {
  const { t } = useLanguage();

  return (
    <section className="pt-24 pb-12 px-4 bg-black">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-600/40 text-red-600 text-xs font-semibold uppercase tracking-wider mb-8">
          {t("heroCoach.badge")}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
          {t("heroCoach.title")}
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
          {t("heroCoach.subtitle")}
        </p>
      </div>
    </section>
  );
}
