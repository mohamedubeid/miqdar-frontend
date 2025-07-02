import { NextRequest, NextResponse } from 'next/server';
import { loginWithGoogle } from '@/actions/auth';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=missing_token', req.url));
  }

  try {
    await loginWithGoogle(token);
    return NextResponse.redirect(new URL('/', req.url));
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL('/login?error=google_auth_failed', req.url));
  }
}
