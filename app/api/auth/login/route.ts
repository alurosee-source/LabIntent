import { NextRequest, NextResponse } from "next/server";
import { getDb, initDatabase } from "@/lib/db";
import { verifyPassword, createToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email и пароль обязательны" },
        { status: 400 }
      );
    }

    await initDatabase();
    const sql = getDb();

    const rows = await sql`
      SELECT id, email, password_hash, team_name FROM coaches WHERE email = ${email}
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Неверный email или пароль" },
        { status: 401 }
      );
    }

    const coach = rows[0];
    if (!verifyPassword(password, coach.password_hash)) {
      return NextResponse.json(
        { error: "Неверный email или пароль" },
        { status: 401 }
      );
    }

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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
