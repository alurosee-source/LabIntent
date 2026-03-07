import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { LogoutButton } from "./logout-button";

function formatDate(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function reactionLabel(avgMs: number | null): { text: string; good: boolean; bad: boolean } {
  if (!avgMs) return { text: "—", good: false, bad: false };
  if (avgMs < 250) return { text: "Fast", good: true, bad: false };
  if (avgMs < 450) return { text: "Average", good: false, bad: false };
  return { text: "Slow", good: false, bad: true };
}

function focusLabel(schulteTime: number | null): { text: string; good: boolean; bad: boolean } {
  if (!schulteTime) return { text: "—", good: false, bad: false };
  if (schulteTime < 35) return { text: "High", good: true, bad: false };
  if (schulteTime < 60) return { text: "Average", good: false, bad: false };
  return { text: "Low", good: false, bad: true };
}

function sleepDisplay(sleepHours: number | null, bedTime: string | null, wakeTime: string | null): { text: string; bad: boolean } {
  if (!sleepHours && !bedTime) return { text: "—", bad: false };
  const hrs = sleepHours ?? 0;
  const times = bedTime && wakeTime ? ` (${bedTime} → ${wakeTime})` : "";
  return { text: `${hrs}h${times}`, bad: hrs < 5 };
}

function emotionLabel(aiState: string | null): { text: string; bad: boolean } {
  if (!aiState) return { text: "—", bad: false };
  if (aiState === "Fatigue") return { text: "Fatigued", bad: true };
  if (aiState === "Anxiety") return { text: "Anxious", bad: true };
  if (aiState === "Mobilizing stress") return { text: "Mobilized", bad: false };
  if (aiState === "No clear signal") return { text: "Neutral", bad: false };
  return { text: aiState, bad: false };
}

function statusBadge(
  avgMs: number | null,
  schulteTime: number | null,
  sleepHours: number | null,
  aiState: string | null
): { label: string; dot: string; border: string } {
  const reaction = reactionLabel(avgMs);
  const focus = focusLabel(schulteTime);
  const sleep = sleepHours ?? 0;
  const emotion = emotionLabel(aiState);

  const badCount = [
    reaction.bad,
    focus.bad,
    sleep > 0 && sleep < 5,
    emotion.bad,
  ].filter(Boolean).length;

  const isSharp =
    !reaction.bad &&
    !focus.bad &&
    sleep >= 6 &&
    !emotion.bad;

  if (isSharp) return { label: "Sharp", dot: "bg-green-500", border: "border-green-800 text-green-400" };
  if (badCount >= 2) return { label: "Bench", dot: "bg-red-500", border: "border-red-800 text-red-400" };
  return { label: "Monitor", dot: "bg-yellow-500", border: "border-yellow-800 text-yellow-400" };
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("dd_session")?.value;

  if (!token) redirect("/login");

  const session = verifyToken(token);
  if (!session) redirect("/login");

  const sql = getDb();
  const rows = await sql`
    SELECT id, nickname, score, avg_reaction_ms, sleep_hours, bed_time, wake_time,
           cancellation_answer, schulte_time, luscher_result, ai_state, created_at
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
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Status</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Reaction</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Focus</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Sleep</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Emotional state</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">If match cancelled...</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {rows.map((row) => {
                    const reaction = reactionLabel(row.avg_reaction_ms);
                    const focus = focusLabel(row.schulte_time);
                    const sleep = sleepDisplay(row.sleep_hours, row.bed_time, row.wake_time);
                    const emotion = emotionLabel(row.ai_state);
                    const status = statusBadge(row.avg_reaction_ms, row.schulte_time, row.sleep_hours, row.ai_state);

                    return (
                      <tr key={row.id} className="hover:bg-gray-900/40 transition-colors">
                        <td className="px-4 py-4 font-medium">
                          {row.nickname || "Anonymous"}
                        </td>
                        <td className="px-4 py-4 text-gray-500 font-mono text-xs">
                          {formatDate(row.created_at)}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-semibold ${status.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={reaction.bad ? "text-red-400" : reaction.good ? "text-green-400" : "text-gray-400"}>
                            {reaction.text}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={focus.bad ? "text-red-400" : focus.good ? "text-green-400" : "text-gray-400"}>
                            {focus.text}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={sleep.bad ? "text-yellow-500" : "text-gray-400"}>
                            {sleep.text}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {emotion.text === "—" ? (
                            <span className="text-gray-700">—</span>
                          ) : (
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                              emotion.bad ? "bg-red-900/50 text-red-400" :
                              emotion.text === "Mobilized" ? "bg-yellow-900/50 text-yellow-400" :
                              "bg-gray-800 text-gray-400"
                            }`}>
                              {emotion.text}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-gray-300 italic max-w-xs">
                          {row.cancellation_answer
                            ? `"${row.cancellation_answer}"`
                            : <span className="text-gray-700 not-italic">—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
