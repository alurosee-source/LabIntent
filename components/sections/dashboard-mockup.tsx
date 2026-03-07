export function DashboardMockup() {
  const players = [
    { name: "Player_1", score: 88,  sleep: "8h", answer: "Relieved — I need the break", status: "ready" },
    { name: "Player_2", score: 42,  sleep: "5h", answer: "Nothing. Don't care either way.", status: "warning" },
    { name: "Player_3", score: 71,  sleep: "7h", answer: "A bit disappointed, I was ready", status: "ready" },
    { name: "Player_4", score: 55,  sleep: "6h", answer: "Honestly relieved, been stressed", status: "warning" },
    { name: "Player_5", score: 90,  sleep: "8h", answer: "Gutted — I've been looking forward to it", status: "ready" },
  ];

  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold">
            What the coach sees across the whole team
          </h3>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 overflow-hidden">
          {/* Window chrome */}
          <div className="px-6 py-3 bg-gray-900 border-b border-gray-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs text-gray-500">Team monitor — today</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Player</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Score</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Sleep</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">If match cancelled...</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm font-semibold">{p.name}</td>
                    <td className={`px-6 py-4 text-sm font-bold font-mono ${p.score >= 75 ? "text-green-500" : p.score >= 50 ? "text-yellow-500" : "text-red-500"}`}>
                      {p.score}
                    </td>
                    <td className={`px-6 py-4 text-sm ${parseInt(p.sleep) <= 5 ? "text-yellow-500" : "text-gray-300"}`}>
                      {p.sleep}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 italic max-w-xs">
                      &ldquo;{p.answer}&rdquo;
                    </td>
                    <td className="px-6 py-4">
                      {p.status === "ready" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-semibold">
                          ✅ Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-semibold">
                          ⚠️ Watch
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 border-t border-gray-800">
            <p className="text-xs text-gray-600">
              Example data. Real results appear after players complete the test.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
