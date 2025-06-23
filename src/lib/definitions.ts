import { z } from 'zod';

export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'يجب أن يكون الاسم على الأقل حرفين' })
    .trim(),

  job_title: z.string().min(2, { message: 'يجب أن يكون المسمى الوظيفي على الأقل حرفين' }).trim(),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }).trim(),
  country: z.string().min(2, { message: 'الدولة مطلوبة' }).trim(),
  city: z.string().min(2, { message: 'المدينة مطلوبة' }).trim(),
  password: z
    .string()
    .min(8, { message: 'يجب أن تكون على الأقل 8 أحرف' })
    // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    // .regex(/[0-9]/, { message: 'Contain at least one number.' })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: 'Contain at least one special character.',
    // })
    .trim(),
  password_confirmation: z.string().min(8, { message: 'يرجى تأكيد كلمة المرور' }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["password_confirmation"],
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح.' }).trim(),
  password: z.string().min(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل.' }),
  rememberMe: z.union([z.literal('on'), z.boolean()]).optional(),
});

export const EditUserProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'يجب أن يكون الاسم على الأقل حرفين' })
    .trim(),
  job_title: z.string().min(2, { message: 'يجب أن يكون المسمى الوظيفي على الأقل حرفين' }).trim(),
  country: z.string().min(2, { message: 'الدولة مطلوبة' }).trim(),
  city: z.string().min(2, { message: 'المدينة مطلوبة' }).trim(),
});

export const EditUserPasswordSchema = z.object({
  current_password: z
    .string()
    .min(8, { message: 'يجب أن تكون على الأقل 8 أحرف' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'يجب أن تكون على الأقل 8 أحرف' })
    .trim(),
    password_confirmation: z.string().min(8, { message: 'يرجى تأكيد كلمة المرور' }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["password_confirmation"],
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح.' }).trim(),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح.' }).trim(),
  token: z.string().min(1, { message: 'رمز التحقق مطلوب' }).trim(),
  password: z
    .string()
    .min(8, { message: 'يجب أن تكون على الأقل 8 أحرف' })
    .trim(),
  password_confirmation: z.string().min(8, { message: 'يرجى تأكيد كلمة المرور' }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["password_confirmation"],
});

export type RegisterFormState =
| {
    errors?: {
      name?: string[]
      job_title?: string[]
      email?: string[]
      country?: string[]
      city?: string[]
      password?: string[]
      password_confirmation?: string[]
    }
    message?: string
  }
| undefined;

export type LoginFormState =
| {
    errors?: {
      email?: string[]
      password?: string[]
      rememberMe?: string[]
    }
    message?: string
  }
| undefined;

export type EditUserProfileState =
| {
    errors?: {
      name?: string[]
      job_title?: string[]
      country?: string[]
      city?: string[]
    }
    message?: string
  }
| undefined;

export type EditUserPasswordState =
| {
    errors?: {
      current_password?: string[]
      password?: string[]
      password_confirmation?: string[]
    }
    message?: string
  }
| undefined;

export type ForgotPasswordState =
| {
    errors?: {
      email?: string[]
    }
    message?: string
  }
| undefined;

export type ResetPasswordState =
| {
    errors?: {
      password?: string[]
      password_confirmation?: string[]
      email?: string[]
      token?: string[]
    }
    message?: string
  }
| undefined;

export type UserResponse = {
  user: User;
  token: string;
};

export type User = {
  id: number;
  role_id: number;
  name: string;
  email: string;
  avatar: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  job_title: string;
  country: string;
  city: string;
};

export type DesignFile = {
  download_link: string;
  original_name: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  simplified_name: string;
  created_at: string;
  updated_at: string;
  image: string;
};

export interface CategoryApiResponse {
  current_page: number;
  data: Category[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
export interface Product {
  id: number;
  name_ar: string;
  name_en: string;
  description: string;
  width_mm: number | null;
  height_mm: number | null;
  depth_mm: number | null;
  weight_g: number | null;
  main_image: string;
  images: string | null; // stored as JSON string (e.g. '["img1.png", "img2.png"]')
  favorite_count: number | null;
  design_file: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  slug: string;
  category_id: number;
  category_name: string;
  is_favorite: boolean;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface ProductApiResponse {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
