'use server';

import { ExpertApiResponse } from '@/lib/definitions';
import { API_URL } from '@/lib/constants';

export async function getExperts(): Promise<ExpertApiResponse | undefined> {
  const res = await fetch(`${API_URL}/api/experts`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });
  
  if (!res.ok) return;
  
  const text = await res.text();
  if (text) {
    const result = JSON.parse(text);
    return result;
  }
  return;
}
