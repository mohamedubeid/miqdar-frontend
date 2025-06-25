'use client';

import { useActionState, useEffect, useRef } from "react";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import ProfilePicInput from "@/components/profile/ProfilePicInput";
import { updateUserProfile } from "@/actions/user";
import { toast } from "react-toastify";
import { User } from "@/lib/definitions";
import { useRouter } from 'next/navigation';

interface EditUserProfileModalProps {
  user: User 
}

const EditUserProfileModal = ({ user }: EditUserProfileModalProps) => {
  const router = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [state, formAction, isPending] = useActionState(updateUserProfile, undefined);
  useEffect(() => {
    if(state?.message == 'success') {
      closeButtonRef.current?.click();
      toast.success('تم تعديل الملف الشخصي بنجاح');
      router.refresh();
    }else
    if (state?.message && state?.message !== 'success') {
      toast.error(state.message)
    }
  }, [router, state]);

  const handleCancel = () => {
    closeButtonRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger ref={closeButtonRef} className="primary-button !h-fit w-fit">
        <Pencil size={16} />
        <span> تعديل الملف الشخصي</span>
      </DialogTrigger>
      <DialogContent className="max-w-[706px] sm:max-w-[706px] w-full rounded-[38px] p-11 pe-6 max-h-[calc(100vh-2rem)]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">تعديل الملف الشخصي</DialogTitle>
          <DialogDescription className="text-center text-cstm-gray">
            يمكنك تعديل معلوماتك الشخصية هنا. تأكد من تحديث التفاصيل الخاصة بك بانتظام.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-auto max-h-[calc(100vh-11rem)] pb-6 pe-5">
          <form action={formAction} className="space-y-6">
            <div>
              <label className="text-xl text-cstm-gray block mb-3">الاسم</label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
                placeholder="محمد عبدالله"
                defaultValue={user.name}
              />
            {state?.errors?.name && (
              <p className="text-sm text-[12px] text-red-500">{state.errors?.name?.[0]}</p>
            )}
            </div>

            <div>
              <label className="text-xl text-cstm-gray block mb-3">المسمى الوظيفي</label>
              <input
                type="text"
                id="jobTitle"
                name="job_title"
                className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
                placeholder="مصمم منتجات"
                defaultValue={user.job_title}
              />
            {state?.errors?.job_title && (
              <p className="text-sm text-[12px] text-red-500">{state.errors?.job_title?.[0]}</p>
            )}
            </div>
            <div className="flex gap-6">
              <div>
                <label className="text-xl text-cstm-gray block mb-3">الدولة</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  defaultValue={user.country}
                  className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
                  placeholder="مصمم منتجات"
                />
                {state?.errors?.country && (
                  <p className="text-sm text-[12px] text-red-500">{state.errors?.country?.[0]}</p>
                )}
              </div>
              <div>
                <label className="text-xl text-cstm-gray block mb-3">المدينة</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={user.city}
                  className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
                  placeholder="مصمم منتجات"
                />
                {state?.errors?.city && (
                  <p className="text-sm text-[12px] text-red-500">{state.errors?.city?.[0]}</p>
                )}
              </div>
            </div>
            {/* <ProfilePicInput
              value={formik.values.profilePic}
              onChange={file => formik.setFieldValue("profilePic", file)}
            /> */}

            <div className="flex gap-6 mt-8">
              <button disabled={isPending} type="submit" className={"primary-button mx-auto flex-2" + (isPending ? " opacity-50 cursor-not-allowed" : "")}>
                حفظ التغييرات
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="secondary-button flex-1"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserProfileModal;
