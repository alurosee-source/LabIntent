import { NextRequest, NextResponse } from 'next/server';
import { getDb, initDatabase } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, game, rank, telegram } = body;

    // Validate input
    if (!email || !game || !rank || !telegram) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Initialize database (creates table if it doesn't exist)
    await initDatabase();

    // Insert into database
    const sql = getDb();

    try {
      const result = await sql`
        INSERT INTO beta_signups (email, game, rank, telegram)
        VALUES (${email.toLowerCase()}, ${game}, ${rank}, ${telegram})
        RETURNING id, email, game, rank, telegram, created_at
      `;

      return NextResponse.json(
        {
          success: true,
          message: 'Successfully registered for beta access',
          data: result[0],
        },
        { status: 201 }
      );
    } catch (dbError: any) {
      // Handle duplicate email
      if (dbError.code === '23505' || dbError.message?.includes('duplicate')) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        );
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Beta signup error:', error);
    return NextResponse.json(
      { error: 'Failed to process signup. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve signups
export async function GET() {
  try {
    const sql = getDb();
    const signups = await sql`
      SELECT id, email, game, rank, telegram, created_at
      FROM beta_signups
      ORDER BY created_at DESC
      LIMIT 100
    `;

    return NextResponse.json({
      success: true,
      count: signups.length,
      data: signups,
    });
  } catch (error) {
    console.error('Fetch signups error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch signups' },
      { status: 500 }
    );
  }
}
