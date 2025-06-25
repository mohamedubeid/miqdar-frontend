'use client';
import { useActionState, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, EyeOff, Info, LockKeyhole } from "lucide-react";
import { updateUserPassword } from "@/actions/user";
import { toast } from "react-toastify";

const ChangePasswordModal = () => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [state, formAction, isPending] = useActionState(updateUserPassword, undefined);
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if(state?.message == 'success') {
      closeButtonRef.current?.click();
      toast.success('تم تغيير كلمة المرور بنجاح');
    }else
    if (state?.message && state?.message !== 'success') {
      toast.error(state.message)
    }
  }, [state]);
  const handleCancel = () => {
    closeButtonRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger ref={closeButtonRef} className="secondary-button !h-fit w-fit">
        <LockKeyhole size={16} />
        <span> تغيير كلمة المرور</span>
      </DialogTrigger>
      <DialogContent className="max-w-[706px] sm:max-w-[706px] w-full rounded-[38px] p-11 py-10">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">تغيير كلمة المرور</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-2 max-h-[calc(100vh-4rem)]  overflow-auto">
          <div className="relative">
            <label className="text-xl text-cstm-gray block mb-2">كلمة المرور الحالية</label>
            <input
              type={show.current ? "text" : "password"}
              id="currentPassword"
              name="current_password"
              className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px] pl-12"
              placeholder="أدخل كلمة المرور الحالية"
            />
            <button
              type="button"
              className="absolute top-[55px] left-4 text-gray-400"
              tabIndex={-1}
              onClick={() => setShow((s) => ({ ...s, current: !s.current }))}
            >
              {show.current ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {state?.errors?.current_password && (
              <p className="text-sm text-[12px] text-red-500">{state.errors?.current_password?.[0]}</p>
            )}
          </div>
          <div className="relative">
            <label className="text-xl text-cstm-gray block mb-2">كلمة المرور الجديدة</label>
            <input
              type={show.new ? "text" : "password"}
              id="newPassword"
              name="password"
              className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px] pl-12"
              placeholder="أدخل كلمة المرور الجديدة"
            />
            <button
              type="button"
              className="absolute top-[55px] left-4 text-gray-400"
              tabIndex={-1}
              onClick={() => setShow((s) => ({ ...s, new: !s.new }))}
            >
              {show.new ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {state?.errors?.password && (
              <p className="text-sm text-[12px] text-red-500">{state.errors?.password?.[0]}</p>
            )}
          </div>
          <div className="relative">
            <label className="text-xl text-cstm-gray block mb-2">تأكيد كلمة المرور الجديدة</label>
            <input
              type={show.confirm ? "text" : "password"}
              id="confirmNewPassword"
              name="password_confirmation"
              className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px] pl-12"
              placeholder="تأكيد كلمة المرور الجديدة"
            />
            <button
              type="button"
              className="absolute top-[55px] left-4 text-gray-400"
              tabIndex={-1}
              onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
            >
              {show.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {state?.errors?.password_confirmation && (
              <p className="text-sm text-[12px] text-red-500">{state.errors?.password_confirmation?.[0]}</p>
            )}
          </div>
          <div className="flex items-center gap-x-3 bg-[#FEF9C35E] px-8 rounded-[15px] mt-3">
            <Info size={96} strokeWidth={1} className="text-[#CA8A04]" />
            <p className="text-[#CA8A04]"> كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، وتتضمن أحرف كبيرة وصغيرة وأرقام ورموز خاصة</p>
          </div>
          <div className="flex gap-6 mt-4">
            <button disabled={isPending} type="submit" className={"primary-button w-full" + (isPending ? " opacity-50 cursor-not-allowed" : "")}>
              حفظ التغييرات
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="secondary-button w-full"
            >
              إلغاء
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordModal;