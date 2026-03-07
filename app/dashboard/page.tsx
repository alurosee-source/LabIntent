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
  if (score >= 85) return "Peak";
  if (score >= 65) return "Good";
  if (score >= 45) return "Average";
  return "Low";
}

function formatDate(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleDateString("en-GB", {
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
    SELECT id, nickname, score, sleep_hours, cancellation_answer, created_at
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
          <span className="text-gray-400 text-sm">Coach Dashboard</span>
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
            Team
          </div>
          <h1 className="text-3xl font-bold">{session.teamName}</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {rows.length === 0
              ? "No results yet. Players must enter the team name before taking the test."
              : `${rows.length} ${rows.length === 1 ? "result" : "results"}`}
          </p>
        </div>

        {rows.length === 0 ? (
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-12 text-center">
            <p className="text-gray-400 mb-2">No data yet</p>
            <p className="text-sm text-gray-600">
              Tell your players to enter{" "}
              <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">
                {session.teamName}
              </span>{" "}
              as the team name before starting the test
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-900/80">
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Player</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Date</th>
                    <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Score</th>
                    <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Sleep</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">If match cancelled...</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-900/40 transition-colors">
                      <td className="px-4 py-4 font-medium">
                        {row.nickname || "Anonymous"}
                      </td>
                      <td className="px-4 py-4 text-gray-500 font-mono text-xs">
                        {formatDate(row.created_at)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className={`font-bold font-mono text-base ${scoreColor(row.score)}`}>
                          {row.score}
                        </span>
                        <span className={`ml-2 text-xs ${scoreColor(row.score)}`}>
                          {scoreLabel(row.score)}
                        </span>
                      </td>
                      <td className={`px-4 py-4 text-right font-mono ${row.sleep_hours <= 5 ? "text-yellow-500" : "text-gray-400"}`}>
                        {row.sleep_hours}h
                      </td>
                      <td className="px-4 py-4 text-gray-300 italic max-w-sm">
                        {row.cancellation_answer
                          ? `"${row.cancellation_answer}"`
                          : <span className="text-gray-700 not-italic">—</span>}
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
