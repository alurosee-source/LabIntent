import { NextRequest, NextResponse } from 'next/server';
import { getDb, initDatabase } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nickname, team_name, avg_reaction_ms, missed_targets, false_clicks, score, sleep_hours, stress, motivation } = body;

    if (
      avg_reaction_ms === undefined ||
      missed_targets === undefined ||
      false_clicks === undefined ||
      score === undefined ||
      sleep_hours === undefined ||
      stress === undefined ||
      motivation === undefined
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await initDatabase();

    const sql = getDb();

    const result = await sql`
      INSERT INTO test_results (nickname, team_name, avg_reaction_ms, missed_targets, false_clicks, score, sleep_hours, stress, motivation)
      VALUES (${nickname || 'Anonymous'}, ${team_name || null}, ${avg_reaction_ms}, ${missed_targets}, ${false_clicks}, ${score}, ${sleep_hours}, ${stress}, ${motivation})
      RETURNING id, created_at
    `;

    return NextResponse.json({ success: true, data: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Save result error:', error);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}
