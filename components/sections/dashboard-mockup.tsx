export function DashboardMockup() {
  const players = [
    { name: "Player_1", reaction: "+2%", stress: "4/10", sleep: "8ч", status: "ready" },
    { name: "Player_2", reaction: "−15%", stress: "8/10", sleep: "5ч", status: "warning" },
    { name: "Player_3", reaction: "−3%", stress: "5/10", sleep: "7ч", status: "ready" },
  ];

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-3">
            Дашборд тренера
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Как выглядит отчёт
          </h3>
          <p className="text-gray-400 text-sm">Пример. Реальные данные появляются после 5 дней тестирования.</p>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-3 bg-gray-900 border-b border-gray-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs text-gray-500">Мониторинг команды — сегодня</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Игрок</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Реакция</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Стресс</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Сон</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Статус</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm font-semibold">{p.name}</td>
                    <td className={`px-6 py-4 text-sm font-semibold ${p.reaction.startsWith("+") ? "text-green-500" : p.reaction.startsWith("−") && parseInt(p.reaction) < -10 ? "text-red-500" : "text-gray-300"}`}>
                      {p.reaction}
                    </td>
                    <td className={`px-6 py-4 text-sm ${parseInt(p.stress) >= 7 ? "text-red-400" : "text-gray-300"}`}>
                      {p.stress}
                    </td>
                    <td className={`px-6 py-4 text-sm ${parseInt(p.sleep) <= 5 ? "text-yellow-500" : "text-gray-300"}`}>
                      {p.sleep}
                    </td>
                    <td className="px-6 py-4">
                      {p.status === "ready" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-semibold">
                          ✅ Готов
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-semibold">
                          ⚠️ Следи
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
              Пример отчёта. Реальные данные появляются после 5 дней тестирования.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
