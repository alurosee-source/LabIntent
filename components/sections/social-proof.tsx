"use client";

import { useLanguage } from "@/lib/language-context";

export function SocialProof() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t("socialProof.testimonial1Name"),
      rank: t("socialProof.testimonial1Rank"),
      quote: t("socialProof.testimonial1Quote"),
      improvement: t("socialProof.testimonial1Improvement"),
    },
    {
      name: t("socialProof.testimonial2Name"),
      rank: t("socialProof.testimonial2Rank"),
      quote: t("socialProof.testimonial2Quote"),
      improvement: t("socialProof.testimonial2Improvement"),
    },
    {
      name: t("socialProof.testimonial3Name"),
      rank: t("socialProof.testimonial3Rank"),
      quote: t("socialProof.testimonial3Quote"),
      improvement: t("socialProof.testimonial3Improvement"),
    },
  ];

  const stats = [
    { label: t("socialProof.stat1Label"), value: t("socialProof.stat1Value") },
    { label: t("socialProof.stat2Label"), value: t("socialProof.stat2Value") },
    { label: t("socialProof.stat3Label"), value: t("socialProof.stat3Value") },
  ];

  const leaderboard = [
    { name: t("socialProof.player1"), improvement: "+24%", rank: t("socialProof.rank1") },
    { name: t("socialProof.player2"), improvement: "+21%", rank: t("socialProof.rank2") },
    { name: t("socialProof.player3"), improvement: "+19%", rank: t("socialProof.rank3") },
  ];

  return (
    <section className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-4">
            {t("socialProof.badge")}
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-4">
            {t("socialProof.title")}
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-black border border-gray-800"
            >
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-black border border-gray-800 hover:border-red-600/50 transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 fill-red-600 text-red-600"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm mb-4 leading-relaxed">&quot;{testimonial.quote}&quot;</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">
                    {testimonial.rank}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-red-600 font-semibold text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {testimonial.improvement}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini Leaderboard */}
        <div className="max-w-md mx-auto p-6 rounded-lg bg-black border border-gray-800">
          <div className="text-center mb-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              {t("socialProof.leaderboardTitle")}
            </h4>
          </div>

          <div className="space-y-2">
            {leaderboard.map((player, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded bg-gray-900 border border-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center text-sm font-bold text-red-600">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{player.name}</div>
                    <div className="text-xs text-gray-500">
                      {player.rank}
                    </div>
                  </div>
                </div>
                <div className="text-red-600 font-bold">{player.improvement}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
