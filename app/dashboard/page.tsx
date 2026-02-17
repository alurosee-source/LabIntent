import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { LogoutButton } from "./logout-button";

function scoreColor(score: number): string {
  if (score >= 85) return "text-green-500";
  if (score >= 65) return "text-green-400";
  if (score >= 45) return "text-yellow-500";
  return "text-red-500";
}

function scoreLabel(score: number): string {
  if (score >= 85) return "Топ";
  if (score >= 65) return "Хорошо";
  if (score >= 45) return "Средне";
  return "Слабо";
}

function formatDate(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("dd_session")?.value;

  if (!token) redirect("/login");

  const session = verifyToken(token);
  if (!session) redirect("/login");

  const sql = getDb();
  const rows = await sql`
    SELECT
      id, nickname, team_name, avg_reaction_ms, missed_targets,
      false_clicks, score, sleep_hours, stress, motivation, created_at
    FROM test_results
    WHERE team_name = ${session.teamName}
    ORDER BY created_at DESC
    LIMIT 200
  `;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-600" />
          <span className="font-bold text-sm uppercase tracking-wider">Drop Detector</span>
          <span className="text-gray-600 text-sm">·</span>
          <span className="text-gray-400 text-sm">Дашборд тренера</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{session.email}</span>
          <LogoutButton />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Team info */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-600/40 text-red-600 text-xs font-semibold uppercase tracking-wider mb-3">
            Команда
          </div>
          <h1 className="text-3xl font-bold">{session.teamName}</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {rows.length === 0
              ? "Результатов пока нет. Игроки должны указать название команды перед тестом."
              : `${rows.length} ${rows.length === 1 ? "результат" : rows.length < 5 ? "результата" : "результатов"}`}
          </p>
        </div>

        {rows.length === 0 ? (
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-12 text-center">
            <p className="text-gray-400 mb-2">Данных нет</p>
            <p className="text-sm text-gray-600">
              Скажите игрокам ввести название команды{" "}
              <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">
                {session.teamName}
              </span>{" "}
              перед тестом
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-900/80">
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Игрок</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Дата</th>
                    <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Score</th>
                    <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Реакция</th>
                    <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Пропусков</th>
                    <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Ложных</th>
                    <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Сон</th>
                    <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Стресс</th>
                    <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Мотив.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-900/40 transition-colors">
                      <td className="px-4 py-3 font-medium">
                        {row.nickname || "Anonymous"}
                      </td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                        {formatDate(row.created_at)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-bold font-mono ${scoreColor(row.score)}`}>
                          {row.score}
                        </span>
                        <span className={`ml-2 text-xs ${scoreColor(row.score)}`}>
                          {scoreLabel(row.score)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {row.avg_reaction_ms} мс
                      </td>
                      <td className={`px-4 py-3 text-right font-mono ${row.missed_targets > 0 ? "text-red-500" : "text-gray-400"}`}>
                        {row.missed_targets}
                      </td>
                      <td className={`px-4 py-3 text-right font-mono ${row.false_clicks > 0 ? "text-red-500" : "text-gray-400"}`}>
                        {row.false_clicks}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-400 font-mono">
                        {row.sleep_hours}ч
                      </td>
                      <td className="px-4 py-3 text-right text-gray-400 font-mono">
                        {row.stress}/10
                      </td>
                      <td className="px-4 py-3 text-right text-gray-400 font-mono">
                        {row.motivation}/10
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
