'use server';

import { getAuthToken } from '@/lib/session';
import { CategoryApiResponse, ProductApiResponse } from '@/lib/definitions';
import { API_URL } from '@/lib/constants';


export async function getCategories(): Promise<CategoryApiResponse | undefined> {
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
    const result = JSON.parse(text);
    return result;
  }
  return;
}

export async function getProducts(params?: { sortBy?: string; sortType?: string; category?: string; name?: string; }): Promise<ProductApiResponse | undefined> {
  const token = await getAuthToken();
  if (!token) return;

  const query = new URLSearchParams();
  if (params?.sortBy) query.set('sortBy', params.sortBy);
  if (params?.sortType) query.set('sortType', params.sortType);
  if (params?.category) query.set('category', params.category);
  if (params?.name && params.name.length >= 3) {
    query.set("name", params.name);
  }
  const res = await fetch(`${API_URL}/api/products?${query.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  const text = await res.text();
  if (res.ok) {
    const result = JSON.parse(text);
    return result;
  }
  return;
}