'use server';

import { redirect } from 'next/navigation';
import { setAuthCookie, clearAuthCookie, getAuthToken } from '@/lib/session';
import { RegisterFormState, LoginFormSchema, RegisterFormSchema, LoginFormState, UserResponse, EditUserProfileState, EditUserProfileSchema } from '@/lib/definitions';
import { User } from '@/lib/definitions';
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!

export async function register(_state: RegisterFormState, formData: FormData): Promise<RegisterFormState> {

  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    values[key] = typeof value === 'string' ? value : '';
  }
  const result = RegisterFormSchema.safeParse(values);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: 'فشل التحقق من صحة البيانات' };
  }
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData
  });
  const text = await res.text();
  if (!res.ok) {
    try {
      const error = JSON.parse(text);
      return {
        message: 'حدث خطأ أثناء التسجيل، يرجى التحقق مرة اخرى من بياناتك',
        errors: error.errors,
      }
    } catch {
      return { message: 'حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى' }
    }
  }
  let data: UserResponse
  try {
    data = JSON.parse(text);
  } catch (err) {
    console.error('Failed to parse JSON:', err)
    return { message: 'Invalid server response' }
  }
  await setAuthCookie(data.token);
  return { message: 'success' };
}

export async function login(_state: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    values[key] = typeof value === 'string' ? value : '';
  }
  const result = LoginFormSchema.safeParse(values);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: 'فشل التحقق من صحة البيانات' };
  }
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData
  });
  const text = await res.text();
  if (!res.ok) {
    try {
      const error = JSON.parse(text);
      return {
        message: 'حدث خطأ أثناء تسجيل الدخول، يرجى التحقق من بياناتك',
        errors: error.errors,
      }
    } catch {
      return { message: 'حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مرة أخرى' }
    }
  }
  let data: UserResponse;
  try {
    data = JSON.parse(text);
  } catch (err) {
    console.error('Failed to parse JSON:', err)
    return { message: 'Invalid server response' }
  }
  const rememberMe = formData.get('rememberMe') === 'true' || formData.get('rememberMe') === 'on';
  await setAuthCookie(data.token, rememberMe);
  return { message: 'success' };
}

export async function logout() {
  const token = await getAuthToken();

  if (token) {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  };
  await clearAuthCookie();
  redirect('/');
}

export async function getUser(): Promise<User | { message: string; errors?: string[] }> {
  const token = await getAuthToken();
  if (!token) {
    return { message: 'يرجى تسجيل الدخول و المحاولة مرة أخرى' };
  }
  const res = await fetch(`${API_URL}/api/profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  const text = await res.text();
  if (!res.ok) {
    try {
      const error = JSON.parse(text);
      return {
        message: 'فشل في جلب بيانات الملف الشخصي',
        errors: error.errors,
      }
    } catch {
      return { message: 'فشل في جلب بيانات الملف الشخصي'}
    }
  }
  const user: User = JSON.parse(text);
  return user;
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