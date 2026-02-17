import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("dd_session")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = verifyToken(token);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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
    return NextResponse.json({ results: rows, teamName: session.teamName });
  } catch (error) {
    console.error("Dashboard results error:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
