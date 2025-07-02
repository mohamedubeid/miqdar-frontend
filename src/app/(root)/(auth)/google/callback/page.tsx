"use server";
import { loginWithGoogle } from '@/actions/auth';
import { setAuthCookie } from '@/lib/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// { searchParams }: {
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }
export default async function Page({ searchParams }: {
  searchParams: Promise<{ token: string }>
}) {
    const { token } = await searchParams;
  if (!token) {
    redirect('/login?error=missing_token');
  }

      // const res = await loginWithGoogle(searchParams.token);
      await setAuthCookie(token);
  // (await cookies()).set('auth_token', searchParams.token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'lax',
  //   path: '/',
  //   maxAge: 60 * 60 * 24 * 7, // 7 days
  // });
    redirect('/');

  // try {
  //   await loginWithGoogle(searchParams.token);
  //   redirect('/');
  // } catch (err) {
  //   console.error(err);
  //   redirect('/login?error=missing_token');
  // }
}