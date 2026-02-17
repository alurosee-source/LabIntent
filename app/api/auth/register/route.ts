import { NextRequest, NextResponse } from "next/server";
import { getDb, initDatabase } from "@/lib/db";
import { hashPassword, createToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { email, password, team_name } = await request.json();

    if (!email || !password || !team_name) {
      return NextResponse.json(
        { error: "Email, пароль и название команды обязательны" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Пароль минимум 6 символов" },
        { status: 400 }
      );
    }

    await initDatabase();
    const sql = getDb();

    const existing = await sql`
      SELECT id FROM coaches WHERE email = ${email}
    `;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Аккаунт с таким email уже существует" },
        { status: 409 }
      );
    }

    const password_hash = hashPassword(password);
    const rows = await sql`
      INSERT INTO coaches (email, password_hash, team_name)
      VALUES (${email}, ${password_hash}, ${team_name})
      RETURNING id, email, team_name
    `;
    const coach = rows[0];

    const token = createToken({
      id: coach.id,
      email: coach.email,
      teamName: coach.team_name,
    });

    const cookieStore = await cookies();
    cookieStore.set("dd_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
