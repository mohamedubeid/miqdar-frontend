import 'server-only';
import { cookies } from 'next/headers'

export const COOKIE_NAME = 'auth_token'

export async function setAuthCookie(token: string, rememberMe: boolean = false) {
  const cookieStore =await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
    ...(rememberMe ? { maxAge: 60 * 60 * 24 * 7 } : {}), // 7 days
  })
}

export async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value
}

export async function clearAuthCookie() {
  'use server';
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
