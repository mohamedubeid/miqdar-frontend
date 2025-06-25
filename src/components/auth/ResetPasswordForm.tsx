'use client';

import { useActionState, useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';
import { resetPassword } from '@/actions/auth'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [state, formAction, isPending] = useActionState(resetPassword, undefined);
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (!token || !email) {
      router.replace('/login');
    }
  }, [token, email, router])

  useEffect(() => {
    if(state?.message == 'success') {
      toast.success('تم تعيين كلمة مرور جديدة بنجاح');
      router.replace('/login');
    }else
    if (state?.message && state?.message !== 'success') {
      toast.error(state.message)
    }
  }, [state?.message]);

  return (
    <div className="surface-box">
      <div className="container mx-auto py-9 flex flex-col items-center gap-6 max-w-[604px]">
        <div className="text-center">
          <h4>تعيين كلمة مرور جديدة</h4>
        </div>
        <form className="space-y-6 w-full" action={formAction}>
          <div className="relative">
            <label className="text-xl text-cstm-gray block mb-2">كلمة المرور</label>
            <input
              type={show.password ? "text" : "password"}
              id="password"
              name="password"
              className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px] pl-12"
              placeholder="أدخل كلمة المرور"
            />
            <button
              type="button"
              className="absolute top-[55px] left-4 text-gray-400"
              tabIndex={-1}
              onClick={() => setShow((s) => ({ ...s, password: !s.password }))}
            >
              {show.password ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {state?.errors?.password && (
              <p className="text-sm text-[12px] text-red-500">{state.errors?.password?.[0]}</p>
            )}
          </div>
          <div className="relative">
            <label className="text-xl text-cstm-gray block mb-2">تأكيد كلمة المرور</label>
            <input
              type={show.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="password_confirmation"
              className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px] pl-12"
              placeholder="تأكيد كلمة المرور"
            />
            <button
              type="button"
              className="absolute top-[55px] left-4 text-gray-400"
              tabIndex={-1}
              onClick={() => setShow((s) => ({ ...s, confirmPassword: !s.confirmPassword }))}
            >
              {show.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {state?.errors?.password_confirmation && (
              <p className="text-sm text-[12px] text-red-500">{state.errors?.password_confirmation?.[0]}</p>
            )}
          </div>
          <input type="hidden" name="email" value={email ?? ''} />
          <input type="hidden" name="token" value={token ?? ''} />
          <button disabled={isPending} type="submit" className={`primary-button !py-4 mx-auto w-full !rounded-[15px]${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}>تعيين كلمة المرور</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordForm;