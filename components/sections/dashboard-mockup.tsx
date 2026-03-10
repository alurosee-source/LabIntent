"use client";

import { useLanguage } from "@/lib/language-context";

export function DashboardMockup() {
  const { t } = useLanguage();

  const players = [
    {
      name: "s1mple",
      status: { label: t("dashboardMockup.statusSharp"), dot: "bg-green-500", border: "border-green-800 text-green-400" },
      reaction: { text: t("dashboardMockup.labelFast"), color: "text-green-400" },
      focus: { text: t("dashboardMockup.labelHigh"), color: "text-green-400" },
      sleep: { text: "8h (23:00 → 07:00)", color: "text-gray-400" },
      emotion: { text: t("dashboardMockup.labelMobilized"), color: "bg-yellow-900/50 text-yellow-400" },
      answer: t("dashboardMockup.player1Answer"),
    },
    {
      name: "NiKo",
      status: { label: t("dashboardMockup.statusSharp"), dot: "bg-green-500", border: "border-green-800 text-green-400" },
      reaction: { text: t("dashboardMockup.labelFast"), color: "text-green-400" },
      focus: { text: t("dashboardMockup.labelAverage"), color: "text-gray-400" },
      sleep: { text: "7h (00:00 → 07:00)", color: "text-gray-400" },
      emotion: { text: t("dashboardMockup.labelMobilized"), color: "bg-yellow-900/50 text-yellow-400" },
      answer: t("dashboardMockup.player2Answer"),
    },
    {
      name: "electroNic",
      status: { label: t("dashboardMockup.statusMonitor"), dot: "bg-yellow-500", border: "border-yellow-800 text-yellow-400" },
      reaction: { text: t("dashboardMockup.labelAverage"), color: "text-gray-400" },
      focus: { text: t("dashboardMockup.labelAverage"), color: "text-gray-400" },
      sleep: { text: "5h (02:00 → 07:00)", color: "text-yellow-500" },
      emotion: { text: t("dashboardMockup.labelNeutral"), color: "bg-gray-800 text-gray-400" },
      answer: t("dashboardMockup.player3Answer"),
    },
    {
      name: "b1t",
      status: { label: t("dashboardMockup.statusBench"), dot: "bg-red-500", border: "border-red-800 text-red-400" },
      reaction: { text: t("dashboardMockup.labelSlow"), color: "text-red-400" },
      focus: { text: t("dashboardMockup.labelLow"), color: "text-red-400" },
      sleep: { text: "4h (03:00 → 07:00)", color: "text-yellow-500" },
      emotion: { text: t("dashboardMockup.labelFatigued"), color: "bg-red-900/50 text-red-400" },
      answer: t("dashboardMockup.player4Answer"),
    },
    {
      name: "Perfecto",
      status: { label: t("dashboardMockup.statusMonitor"), dot: "bg-yellow-500", border: "border-yellow-800 text-yellow-400" },
      reaction: { text: t("dashboardMockup.labelFast"), color: "text-green-400" },
      focus: { text: t("dashboardMockup.labelHigh"), color: "text-green-400" },
      sleep: { text: "6h (01:00 → 07:00)", color: "text-gray-400" },
      emotion: { text: t("dashboardMockup.labelAnxious"), color: "bg-red-900/50 text-red-400" },
      answer: t("dashboardMockup.player5Answer"),
    },
  ];

  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold">
            {t("dashboardMockup.title")}
          </h3>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 overflow-hidden">
          {/* Window chrome */}
          <div className="px-6 py-3 bg-gray-900 border-b border-gray-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs text-gray-500">{t("dashboardMockup.windowLabel")}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/80">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">{t("dashboardMockup.colPlayer")}</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">{t("dashboardMockup.colStatus")}</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">{t("dashboardMockup.colReaction")}</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">{t("dashboardMockup.colFocus")}</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">{t("dashboardMockup.colSleep")}</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">{t("dashboardMockup.colEmotion")}</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">{t("dashboardMockup.colAnswer")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {players.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-900/40 transition-colors">
                    <td className="px-4 py-4 font-medium">{p.name}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-semibold ${p.status.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status.dot}`} />
                        {p.status.label}
                      </span>
                    </td>
                    <td className={`px-4 py-4 ${p.reaction.color}`}>{p.reaction.text}</td>
                    <td className={`px-4 py-4 ${p.focus.color}`}>{p.focus.text}</td>
                    <td className={`px-4 py-4 ${p.sleep.color}`}>{p.sleep.text}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${p.emotion.color}`}>
                        {p.emotion.text}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-300 italic max-w-xs">
                      &ldquo;{p.answer}&rdquo;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 border-t border-gray-800">
            <p className="text-xs text-gray-600">
              {t("dashboardMockup.footer")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
