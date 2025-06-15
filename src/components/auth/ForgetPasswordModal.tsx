import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ForgetPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loginModalOnOpenChange: (open: boolean) => void;
}


const ForgetPasswordModal = ({ open, onOpenChange, loginModalOnOpenChange }: ForgetPasswordModalProps) => {
  const [email, setEmail] = useState("");


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-[calc(100vw-2rem)] md:max-w-[604px] rounded-[38px] p-11 max-h-[calc(100vh-2rem)] overflow-auto z-1001">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">نسيت كلمة المرور؟</DialogTitle>
          <DialogDescription className="text-center text-cstm-gray">أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور  </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-cstm-gray block mb-3">البريد الالكتروني</label>
            <input
              type="email"
              id="forget-password-email"
              name="email"
              className="bg-white block w-full p-4 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="primary-button !py-4 mx-auto w-full !rounded-[15px]">ارسال رابط التعيين</button>
          <button 
            type="button"
            className="text-center text-cstm-gray w-full hover:underline"
            onClick={() => {
              onOpenChange(false);
              loginModalOnOpenChange(true)
            }}
            >العودة لتسجيل الدخول</button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ForgetPasswordModal;