'use client';
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';
import CountryStateSelect from '@/components/profile/CountryStateSelect';
import LoginModal from '@/components/auth/LoginModal';
import { useFormik } from 'formik';
import ForgetPasswordModal from '@/components/auth/ForgetPasswordModal';

type Option = {
  label: string;
  value: string;
  [key: string]: unknown;
};

const Page = () => {
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const [forgetPasswordModalOpen, setForgetPasswordModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      jobTitle: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: null as Option | null,
      state: null as Option | null,
      termsAccepted: false,
    },
    onSubmit: (values) => {
      console.log('Register values:', values);
      formik.resetForm();
      // You can reset the form or handle modal close here if needed
    },
  });

  return (
    <div className="surface-box">
      <div className="container mx-auto py-9 flex flex-col items-center gap-6 max-w-[604px]">

        <div className="text-center">
          <h4>إنشاء حساب جديد</h4>
          <p className="mt-2">انضم إلى مجتمع مقدار</p>
        </div>
        <form className="space-y-6 w-full" onSubmit={formik.handleSubmit}>
          <div>
            <label className="text-xl text-cstm-gray block mb-3">الاسم كامل</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
              placeholder="محمد عبدالله الحمادي"
            />
          </div>
          <div>
            <label className="text-xl text-cstm-gray block mb-3">المسمى الوظيفي</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              onChange={formik.handleChange}
              value={formik.values.jobTitle}
              className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
              placeholder="مصمم منتجات"
            />
          </div>
          <div>
            <label className="text-xl text-cstm-gray block mb-3">البريد الالكتروني</label>
            <input
              type="email"
              id="register-email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
              placeholder="example@email.com"
            />
          </div>
          <div className="relative">
            <label className="text-xl text-cstm-gray block mb-2">كلمة المرور</label>
            <input
              type={show.password ? "text" : "password"}
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
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
          </div>
          <div className="relative">
            <label className="text-xl text-cstm-gray block mb-2">تأكيد كلمة المرور</label>
            <input
              type={show.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
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
          </div>
          <CountryStateSelect
            country={formik.values.country}
            state={formik.values.state}
            onCountryChange={(value) => formik.setValues({ ...formik.values, country: value, state: null })}
            onStateChange={(value) => formik.setFieldValue('state', value)}
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formik.values.termsAccepted}
              onChange={formik.handleChange}
              className="me-2 accent-primary cursor-pointer w-[20] h-[20] border-0.5 border-[#5501DD66] rounded-[5px] focus:ring-2 focus:ring-primary/50"
            />
            <label htmlFor="rememberMe" className="text-cstm-gray select-none cursor-pointer">
              أوافق على الشروط والأحكام
            </label>
          </div>
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-primary whitespace-nowrap">أو</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <button className="p-4 border-[0.5px] border-[#9CA3AF] rounded-[15px] flex items-center justify-center gap-2 w-full bg-white hover:bg-black/10" type="button">
            <svg width="27" height="27" viewBox="0 0 48 48">
              <g>
                <path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.8 0 5.4 1 7.4 2.7l6.2-6.2C34.1 5.1 29.3 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/>
                <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c2.8 0 5.4 1 7.4 2.7l6.2-6.2C34.1 5.1 29.3 3 24 3 16.1 3 9.1 7.6 6.3 14.7z"/>
                <path fill="#FBBC05" d="M24 43c5.2 0 10-1.7 13.7-4.7l-6.3-5.2C29.4 35.7 26.8 37 24 37c-5.6 0-10.3-3.8-12-9H6.3C9.1 40.4 16.1 45 24 45z"/>
                <path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-0.7 2-2.1 3.7-3.9 4.8l6.3 5.2C41.9 36.2 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"/>
              </g>
            </svg>
            <span className="text-cstm-gray">إنشاء حساب باستخدام Google</span>
          </button>
          <button type="submit" className="primary-button !py-4 mx-auto w-full !rounded-[15px]">انشاء حساب</button>
        </form>
        <div className="text-center">
          <p className="text-cstm-gray">هل لديك حساب بالفعل؟ 
            <button type="button" className="text-primary hover:underline"
              onClick={() => {
                setLoginModalOpen(true);
              }}>
              <span className="ms-2">تسجيل الدخول</span>
            </button>
          </p>
        </div>
      </div>
      <ForgetPasswordModal
        open={forgetPasswordModalOpen}
        onOpenChange={setForgetPasswordModalOpen}
        loginModalOnOpenChange={setLoginModalOpen}
      />
      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        forgetPasswordModalOnOpenChange={setForgetPasswordModalOpen}
      />
    </div>
  )
}

export default Page;