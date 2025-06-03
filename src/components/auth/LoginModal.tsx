import { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const LoginModal = ({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger className="secondary-button whitespace-nowrap flex-nowrap !px-3 !py-2">
        <User />
        <span>تسجيل الدخول</span>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[calc(100vw-2rem)] md:max-w-[604px] rounded-[38px] p-11 max-h-[calc(100vh-2rem)] overflow-auto z-1001">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">تسجيل الدخول</DialogTitle>
          <DialogDescription className="text-center text-cstm-gray"> مرحبا بعودتك </DialogDescription>
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-cstm-gray block mb-3">البريد الالكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-white block w-full p-4 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="text-cstm-gray block mb-3">كلمة المرور</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="bg-white block w-full p-4 text-black border border-0.5 border-[#5501DD66] rounded-[15px] pl-12"
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-[55px] left-4 text-gray-400"
              tabIndex={-1}
              onClick={() => setShowPassword((s) => (!s))}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="me-2 accent-primary cursor-pointer w-[20] h-[20] border-0.5 border-[#5501DD66] rounded-[5px] focus:ring-2 focus:ring-primary/50"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-cstm-gray select-none cursor-pointer">
                تذكرني
              </label>
            </div>
            <div className="text-right">
              <a href="#" className="text-primary hover:underline">نسيت كلمة المرور؟</a>
            </div>
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
            <span className="text-cstm-gray">تسجيل الدخول باستخدام Google </span>
          </button>
          <button type="submit" className="primary-button !py-4 mx-auto w-full !rounded-[15px]"> تسجيل دخول </button>
          <p className="text-center text-cstm-gray">
            مستخدم جديد ؟ <a href="#" className="text-primary hover:underline ms-2">إنشاء حساب جديد</a>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal;