import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useFormik } from 'formik';

interface SetNewPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SetNewPasswordModal = ({ open, onOpenChange }: SetNewPasswordModalProps) => {

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      console.log('set new password values:', values);
      formik.resetForm();
      // You can reset the form or handle modal close here if needed
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-[calc(100vw-2rem)] md:max-w-[604px] rounded-[38px] p-11 max-h-[calc(100vh-2rem)] overflow-auto z-1001">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">تسجيل الدخول</DialogTitle>
          <DialogDescription className="text-center text-cstm-gray"> مرحبا بعودتك </DialogDescription>
        </DialogHeader>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
          <button type="submit" className="primary-button !py-4 mx-auto w-full !rounded-[15px]">تعيين كلمة المرور</button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SetNewPasswordModal;
