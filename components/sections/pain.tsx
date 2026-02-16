"use client";

import { useLanguage } from "@/lib/language-context";

export function Pain() {
  const { t } = useLanguage();

  const painPoints = [
    t("pain.point1"),
    t("pain.point2"),
    t("pain.point3"),
    t("pain.point4"),
    t("pain.point5"),
  ];

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-4">
            {t("pain.badge")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-lg bg-gray-900 border border-gray-800 hover:border-red-600/50 transition-all"
            >
              <div className="absolute top-4 right-4 text-6xl font-bold text-red-600/10 group-hover:text-red-600/20 transition-colors">
                {index + 1}
              </div>
              <p className="text-xl md:text-2xl font-bold leading-tight relative z-10">
                {point}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t("pain.conclusion1")}{" "}
            <span className="text-white font-semibold">
              {t("pain.conclusion2")}
            </span>
            <br />
            {t("pain.conclusion3")}
          </p>
        </div>
      </div>
    </section>
  );
}
