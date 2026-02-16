# Database Setup

## Overview
The landing page is now connected to a PostgreSQL database (Neon) to store beta signup submissions.

## Database Schema

### Table: `beta_signups`

| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| game | VARCHAR(50) | NOT NULL |
| rank | VARCHAR(100) | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

## Environment Variables

The database connection string is stored in `.env.local`:

```
DATABASE_URL=postgresql://neondb_owner:npg_pDRYk3UixN7j@ep-ancient-math-agcsnlew-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

**Note:** `.env.local` is gitignored and not committed to version control.

## API Endpoints

### POST /api/beta-signup
Submits a new beta signup request.

**Request Body:**
```json
{
  "email": "player@example.com",
  "game": "cs",
  "rank": "Faceit 10"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Successfully registered for beta access",
  "data": {
    "id": 1,
    "email": "player@example.com",
    "game": "cs",
    "rank": "Faceit 10",
    "created_at": "2026-02-15T17:15:00.000Z"
  }
}
```

**Error Responses:**

- **400 Bad Request:** Missing or invalid fields
- **409 Conflict:** Email already registered
- **500 Internal Server Error:** Server error

### GET /api/beta-signup
Retrieves beta signups (for admin use).

**Success Response (200):**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 1,
      "email": "player@example.com",
      "game": "cs",
      "rank": "Faceit 10",
      "created_at": "2026-02-15T17:15:00.000Z"
    }
  ]
}
```

## Database Commands

### Initialize Database
Creates the `beta_signups` table if it doesn't exist:

```bash
npm run db:init
```

### Query Database Directly
Using the Neon connection string:

```bash
psql 'postgresql://neondb_owner:npg_pDRYk3UixN7j@ep-ancient-math-agcsnlew-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require'
```

Useful queries:

```sql
-- View all signups
SELECT * FROM beta_signups ORDER BY created_at DESC;

-- Count total signups
SELECT COUNT(*) FROM beta_signups;

-- Count signups by game
SELECT game, COUNT(*) FROM beta_signups GROUP BY game;

-- View recent signups
SELECT email, game, rank, created_at
FROM beta_signups
ORDER BY created_at DESC
LIMIT 10;
```

## Form Submission Flow

1. User fills out the form on the landing page
2. Frontend submits POST request to `/api/beta-signup`
3. API validates input data
4. Database table is created if it doesn't exist (auto-init)
5. Data is inserted into PostgreSQL database
6. Success/error response is returned to frontend
7. User sees confirmation or error message

## Error Handling

The form handles the following error cases:

- **Validation errors:** Invalid email format, missing fields
- **Duplicate email:** User-friendly message shown
- **Network errors:** Generic error message with retry option
- **Server errors:** Fallback error message

## Security Features

- ✅ Email validation
- ✅ SQL injection protection (parameterized queries)
- ✅ Environment variables for sensitive data
- ✅ Input sanitization
- ✅ HTTPS required for database connection
- ✅ Unique email constraint

## Deployment Notes

When deploying to production:

1. Set `DATABASE_URL` environment variable in your hosting platform
2. The table will be auto-created on first API request
3. Or manually run: `npm run db:init` after deployment
4. Consider adding rate limiting to the API endpoint
5. Add admin authentication for GET endpoint

## Dependencies

- `@neondatabase/serverless` - Neon Postgres client optimized for serverless
- `dotenv` - Environment variable loading for scripts

## Next Steps

- [ ] Add email notifications for new signups
- [ ] Create admin dashboard to view signups
- [ ] Add export functionality (CSV/JSON)
- [ ] Implement rate limiting
- [ ] Add analytics tracking
- [ ] Set up automated backups
