'use server';

import { getAuthToken } from '@/lib/session';
import { EditUserProfileState, EditUserProfileSchema, EditUserPasswordState, EditUserPasswordSchema } from '@/lib/definitions';
import { User } from '@/lib/definitions';
import { API_URL } from '@/lib/constants';
// import { redirect } from 'next/navigation';

export async function getUser(): Promise<User | undefined> {
  const token = await getAuthToken();
  if (!token) return
  const res = await fetch(`${API_URL}/api/profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  const text = await res.text();
  if (res.ok) {
    const user: User = JSON.parse(text);
    return user;
  }
  // redirect('/');
  return;
}

export async function updateUserProfile(_state: EditUserProfileState, formData: FormData): Promise<EditUserProfileState> {
  const token = await getAuthToken();
  if (!token) {
    return { message: 'يرجى تسجيل الدخول و المحاولة مرة أخرى' };
  }

  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    values[key] = typeof value === 'string' ? value : '';
  }
  const result = EditUserProfileSchema.safeParse(values);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: 'فشل التحقق من صحة البيانات' };
  }
  const res = await fetch(`${API_URL}/api/profile/update`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values)
  });
  const text = await res.text();
  if (!res.ok) {
    try {
      const error = JSON.parse(text);
      return {
        message: error.message || 'حدث خطأ أثناء تحديث اللف الشخصي, يرجى المحاولة مرة أخرى لاحقا',
        errors: error.errors,
      }
    } catch {
      return { message: 'حدث خطأ، يرجى المحاولة مرة أخرى لاحقا' }
    }
  }
  return { message: 'success' };
}

export async function updateUserPassword(_state: EditUserPasswordState, formData: FormData): Promise<EditUserPasswordState> {
  const token = await getAuthToken(); //check without token
  if (!token) {
    return { message: 'يرجى تسجيل الدخول و المحاولة مرة أخرى' };
  }
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    values[key] = typeof value === 'string' ? value : '';
  }
  const result = EditUserPasswordSchema.safeParse(values);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: 'فشل التحقق من صحة البيانات' };
  }
  const res = await fetch(`${API_URL}/api/profile/update-password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values)
  });
  const text = await res.text();
  if (!res.ok) {
    try {
      const error = JSON.parse(text);
      return {
        message: error.message || 'حدث خطأ أثناء تغيير كلمة المرور, يرجى المحاولة مرة أخرى لاحقا',
        errors: error.errors,
      }
    } catch {
      return { message: 'حدث خطأ، يرجى المحاولة مرة أخرى لاحقا' }
    }
  }
  return { message: 'success' };
}