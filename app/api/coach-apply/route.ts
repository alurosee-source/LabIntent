import { NextRequest, NextResponse } from 'next/server';
import { getDb, initDatabase } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, team_name, contact, team_size } = body;

    if (!name || !team_name || !contact || !team_size) {
      return NextResponse.json({ error: 'Все поля обязательны' }, { status: 400 });
    }

    await initDatabase();

    const sql = getDb();

    const result = await sql`
      INSERT INTO coach_applications (name, team_name, contact, team_size)
      VALUES (${name}, ${team_name}, ${contact}, ${team_size})
      RETURNING id, created_at
    `;

    return NextResponse.json({ success: true, data: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Coach apply error:', error);
    return NextResponse.json({ error: 'Не удалось сохранить заявку' }, { status: 500 });
  }
}
