'use server';

import { getAuthToken } from '@/lib/session';
import { AnalyzeDesignApiResponse, AnalyzeDesignData, CategoryApiResponse, Product, ProductApiResponse, ToggleFavoriteState } from '@/lib/definitions';
import { API_URL } from '@/lib/constants';


export async function getCategories(params?: {
  page?: number;
  perPage?: number;
}): Promise<CategoryApiResponse | undefined> {
  const token = await getAuthToken();
  if (!token) throw new Error("Unauthorized");
  const query = new URLSearchParams();
  if (params?.page) query.set("page", params.page.toString());
  if (params?.perPage) query.set("per_page", params.perPage.toString());
  const res = await fetch(`${API_URL}/api/categories?${query.toString()}`, {
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

export async function getProducts(params?: {
  sortBy?: string;
  sortType?: string;
  category?: string;
  name?: string;
  page?: number;
  perPage?: number;
  is_favorite?: boolean;
}): Promise<ProductApiResponse | undefined> {
  const token = await getAuthToken();
  if (!token) throw new Error("Unauthorized");
  const query = new URLSearchParams();
  if (params?.sortBy) query.set("sortBy", params.sortBy);
  if (params?.sortType) query.set("sortType", params.sortType);
  if (params?.category) query.set("category", params.category);
  if (params?.name && params.name.length >= 3) query.set("name", params.name);
  if (params?.page) query.set("page", params.page.toString());
  if (params?.perPage) query.set("perPage", params.perPage.toString());
  if (params?.is_favorite) query.set("is_favorite", params.is_favorite.toString());

  const res = await fetch(`${API_URL}/api/products?${query.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) return;

  return await res.json();
}

export async function toggleFavorite(productId: number, isFavorite: boolean): Promise<ToggleFavoriteState> {
  const token = await getAuthToken();
  if (!token) throw new Error("Unauthorized");
  const res = await fetch(`${API_URL}/api/products/favorite`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ product_id: productId, isFavorite }),
  });
  const text = await res.text();
  if (!res.ok) {
    const error = JSON.parse(text);
    return {
      message: error.message || "حدث خطأ أثناء تحديث المفضلة، يرجى التحقق مرة اخرى من بياناتك",
      errors: error.errors,
    }
  }
  return { message: 'success' };
}

export async function getUserFavoriteProducts(params?: {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortType?: string;
}): Promise<ProductApiResponse | undefined> {
  const token = await getAuthToken();
  if (!token) throw new Error("Unauthorized");
  const query = new URLSearchParams();
  if (params?.page) query.set("page", params.page.toString());
  if (params?.perPage) query.set("perPage", params.perPage.toString());
  if (params?.sortBy) query.set("sortBy", params.sortBy);
  if (params?.sortType) query.set("sortType", params.sortType);
  const res = await fetch(`${API_URL}/api/favorites?${query.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) return;

  return await res.json();
}

export async function getProductById(id: string): Promise<{product: Product} | undefined> {
  const token = await getAuthToken();
  if (!token) throw new Error("Unauthorized");
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (res.ok) {
    const product = await res.json();
    return product;
  }
  return;
}

export async function getDesignFile({productId, format} :{productId: string, format: string}) {
  const res = await fetch(`${API_URL}/api/get-download-link/${productId}/${format}`, {
    cache: "no-store",
  });
  if (res.ok) {
    const designFile = await res.json();
    return designFile;
  }
  return;
}

export async function analyzeDesign(data: AnalyzeDesignData): Promise<AnalyzeDesignApiResponse> {
  const token = await getAuthToken();
  if (!token) throw new Error("Unauthorized");
  const formData = new FormData();
  if (data.file) formData.append('file', data.file);
  formData.append('product_name', data.product_name);
  formData.append('do_generate_image', String(data.do_generate_image));
  formData.append('do_extract_colors', String(data.do_extract_colors));
  formData.append('do_detect_dimensions', String(data.do_detect_dimensions));
  if (data.prompt !== null && data.prompt !== undefined) formData.append('prompt', data.prompt);
  if (data.user_width !== null && data.user_width !== undefined) formData.append('user_width', String(data.user_width));
  if (data.user_height !== null && data.user_height !== undefined) formData.append('user_height', String(data.user_height));
  if (data.target_height_cm !== null && data.target_height_cm !== undefined) formData.append('target_height_cm', String(data.target_height_cm));

  const res = await fetch(`${API_URL}/api/process`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const text = await res.text();
  if (!res.ok) {
    const error = JSON.parse(text);
    return {
      message: error.message || "error",
      error: error.error || "حدث خطأ أثناء تحليل التصميم، يرجى التحقق مرة اخرى من بياناتك",
    }
  }
  const result = JSON.parse(text);
  return { message: 'success', result };
}
