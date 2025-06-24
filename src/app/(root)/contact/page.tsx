"use client";
import { useActionState, useEffect } from 'react'
import { Mail, Phone, Send } from 'lucide-react';
import { contact } from '@/actions/user';
import { toast } from 'react-toastify';

const Page = () => {

  const [state, formAction, isPending] = useActionState(contact, undefined);
  useEffect(() => {
    if (state?.message == 'success') {
      toast.success('تم تسليم رسالتك بنجاح');
    } else
    if (state?.message && state?.message !== 'success') {
      toast.error(state.message)
    }
  }, [state]);

  return (
    <div className="surface-box">
      <div className="pt-8 pb-20 px-4 max-w-[896px] mx-auto">
        <h3 className="text-center">كيف يمكننا مساعدتك؟</h3>
        <p className="text-cstm-gray mt-4 text-center">نحن هنا للإجابة على أسئلتك ومساعدتك في تحقيق أهدافك في التصميم والقياس </p>
        <div className="flex flex-col md:flex-row gap-4 mt-12">
          <div className="w-full bg-white max-w-[440px] cstm-card-style p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Mail strokeWidth={2} className="text-primary" />
            </div>
            <p className="font-bold mt-6">البريد الإلكتروني</p>
            <p className="text-cstm-gray mt-6">يمكنك مراسلتنا عبر البريد الإلكتروني على العنوان التالي:</p>
            <a href="mailto:info@miqdarsa.com" className="text-primary mt-6 block w-fit">info@miqdarsa.com</a>
          </div>
          <div className="w-full bg-white max-w-[440px] cstm-card-style p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Phone strokeWidth={2} className="text-primary" />
            </div>
            <p className="font-bold mt-6">الهاتف</p>
            <p className="text-cstm-gray mt-6">متاح من 9 صباحاً - 6 مساءً:</p>
            <a href="https://wa.me/966553372491" className="text-primary mt-6 block  w-fit" target="_blank" rel="noopener noreferrer">+966 55 337 2491</a>
          </div>
        </div>
        <div className="mt-12 cstm-card-style px-8 py-12 bg-white">
          <h4 className="text-center">أو يمكنك ملء النموذج أدناه وسنعاود الاتصال بك في أقرب وقت ممكن</h4>
          <form className="mt-8" action={formAction}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="text-xl text-cstm-gray block mb-3">الاسم</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-white block w-full p-4 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
                  placeholder="محمد عبدالله"
                />
                {state?.errors?.name && (
                  <p className="text-sm text-[12px] text-red-500">{state.errors?.name?.[0]}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="text-xl text-cstm-gray block mb-3">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className="bg-white block w-full p-4 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
                  placeholder="example@email.com"
                />
                {state?.errors?.email && (
                  <p className="text-sm text-[12px] text-red-500">{state.errors?.email?.[0]}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <label className="text-xl text-cstm-gray block mb-3" htmlFor="message">رسالتك</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="bg-white block w-full p-4 text-black border border-0.5 border-[#5501DD66] rounded-[15px] resize-none"
                placeholder="اكتب رسالتك هنا..."
              />
              {state?.errors?.message && (
                <p className="text-sm text-[12px] text-red-500">{state.errors?.message?.[0]}</p>
              )}
            </div>
            <button disabled={isPending} type="submit" className={`primary-button mt-6 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Send strokeWidth={1} />
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;