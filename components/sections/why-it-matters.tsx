"use client";

import { useLanguage } from "@/lib/language-context";

export function WhyItMatters() {
  const { t } = useLanguage();

  const reasons = [
    {
      title: t("whyItMatters.stat1Title"),
      stat: t("whyItMatters.stat1"),
      description: t("whyItMatters.stat1Desc"),
    },
    {
      title: t("whyItMatters.stat2Title"),
      stat: t("whyItMatters.stat2"),
      description: t("whyItMatters.stat2Desc"),
    },
    {
      title: t("whyItMatters.stat3Title"),
      stat: t("whyItMatters.stat3"),
      description: t("whyItMatters.stat3Desc"),
    },
    {
      title: t("whyItMatters.stat4Title"),
      stat: t("whyItMatters.stat4"),
      description: t("whyItMatters.stat4Desc"),
    },
  ];

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-4">
            {t("whyItMatters.badge")}
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-4">
            {t("whyItMatters.title")}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="relative overflow-hidden p-8 rounded-lg bg-gray-900 border border-gray-800 hover:border-red-600/50 transition-all group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full -mr-16 -mt-16 group-hover:bg-red-600/10 transition-all"></div>

              <div className="relative z-10">
                <svg className="w-8 h-8 text-red-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>

                <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                  {reason.stat}
                </div>

                <h4 className="text-xl font-bold mb-2">{reason.title}</h4>

                <p className="text-sm text-gray-400">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block p-6 rounded-lg bg-red-600/10 border border-red-600/30">
            <p className="text-lg font-semibold mb-2">
              {t("whyItMatters.callout1")}
            </p>
            <p className="text-xl font-bold mb-2">
              {t("whyItMatters.callout2")}
            </p>
            <p className="text-lg text-red-600 font-semibold">
              {t("whyItMatters.callout3")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
