"use client";

import { useLanguage } from "@/lib/language-context";

export function HowItWorks() {
  const { t } = useLanguage();

  const features = [
    {
      title: t("howItWorks.feature1Title"),
      description: t("howItWorks.feature1Desc"),
    },
    {
      title: t("howItWorks.feature2Title"),
      description: t("howItWorks.feature2Desc"),
    },
    {
      title: t("howItWorks.feature3Title"),
      description: t("howItWorks.feature3Desc"),
    },
    {
      title: t("howItWorks.feature4Title"),
      description: t("howItWorks.feature4Desc"),
    },
  ];

  // Static heights to avoid hydration mismatch
  const barHeights = [
    85, 88, 82, 87, 90, 86, 84, 89, 87, 85, 88, 86, 84,  // Rounds 1-13 (good performance)
    80, 65, 55, 45, 40,  // Rounds 14-18 (drop zone)
    42, 38, 45, 43, 40, 44  // Rounds 19-24 (continued decline)
  ];

  return (
    <section className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-4">
            {t("howItWorks.badge")}
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-4">
            {t("howItWorks.title")}
          </h3>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* Visual Graph */}
        <div className="mb-16 p-8 rounded-lg bg-black border border-gray-800">
          <div className="flex items-end justify-between h-64 gap-2">
            {barHeights.map((height, i) => {
              const isDropZone = i >= 13 && i <= 17;

              return (
                <div
                  key={i}
                  className="flex-1 relative group"
                  style={{ height: `${height}%` }}
                >
                  <div
                    className={`
                      w-full h-full rounded-t transition-all
                      ${isDropZone
                        ? "bg-red-600/80 group-hover:bg-red-600"
                        : "bg-green-500/60 group-hover:bg-green-500/80"
                      }
                    `}
                  />
                  {i === 14 && (
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-red-600">
                      {t("howItWorks.dropZone")}
                    </div>
                  )}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-600">
                    {i + 1}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 suppress-hydration">
              {t("howItWorks.graphLabel")}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-lg bg-black border border-gray-800 hover:border-red-600/50 transition-all"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
