'use server';

import { getAuthToken } from '@/lib/session';
import { Category } from '@/lib/definitions';
import { API_URL } from '@/lib/constants';


export async function getCategories(): Promise<Category[] | undefined> {
  const token = await getAuthToken();
  if (!token) return;
  const res = await fetch(`${API_URL}/api/categories`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  const text = await res.text();
  if (res.ok) {
    const categories = JSON.parse(text);
    return categories;
  }
  return;
}