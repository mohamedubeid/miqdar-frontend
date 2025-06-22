import { useActionState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { forgotPassword } from "@/actions/auth";
import { toast } from "react-toastify";

interface ForgetPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


const ForgetPasswordModal = ({ open, onOpenChange }: ForgetPasswordModalProps) => {
  const [state, formAction, isPending] = useActionState(forgotPassword, undefined);

  useEffect(() => {
    if(state?.message == 'success') {
      toast.success('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
      onOpenChange(false);
    }else
    if (state?.message && state?.message !== 'success') {
      toast.error(state.message)
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-[calc(100vw-2rem)] md:max-w-[604px] rounded-[38px] p-11 max-h-[calc(100vh-2rem)] overflow-auto z-1001">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">نسيت كلمة المرور؟</DialogTitle>
          <DialogDescription className="text-center text-cstm-gray">أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور  </DialogDescription>
        </DialogHeader>
        <form className="space-y-6" action={formAction}>
          <div>
            <label className="text-cstm-gray block mb-3">البريد الالكتروني</label>
            <input
              type="email"
              id="forget-password-email"
              name="email"
              className="bg-white block w-full p-4 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
              placeholder="example@email.com"
            />
          </div>
          <button disabled={isPending} type="submit" className={`primary-button !py-4 mx-auto w-full !rounded-[15px]${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}>ارسال رابط التعيين</button>
          <button 
            type="button"
            className="text-center text-cstm-gray w-full hover:underline"
            onClick={() => {
              onOpenChange(false);
            }}
            >العودة لتسجيل الدخول</button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ForgetPasswordModal;