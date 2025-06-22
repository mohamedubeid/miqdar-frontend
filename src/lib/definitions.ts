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
