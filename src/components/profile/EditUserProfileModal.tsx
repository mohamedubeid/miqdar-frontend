'use client';

import { useRef } from "react";
import { useFormik } from "formik";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CountryStateSelect from "@/components/profile/CountryStateSelect";

type Option = {
  label: string;
  value: string;
  [key: string]: unknown;
};
const EditUserProfileModal = () => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      jobTitle: '',
      country: null as Option | null,
      state: null as Option | null,
    },
    onSubmit: (values) => {
      console.log("Submitted values:", values);
      formik.resetForm();
      closeButtonRef.current?.click();
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    closeButtonRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger ref={closeButtonRef} className="primary-button !h-fit w-fit">
        <Pencil size={16} />
        <span> تعديل الملف الشخصي</span>
      </DialogTrigger>

      <DialogContent className="max-w-[706px] sm:max-w-[706px] w-full rounded-[38px] p-11 max-h-[calc(100vh-2rem)]">
        <DialogHeader>
          <DialogTitle className="text-center">تعديل الملف الشخصي</DialogTitle>
          <DialogDescription className="text-center text-cstm-gray">
            يمكنك تعديل معلوماتك الشخصية هنا. تأكد من تحديث التفاصيل الخاصة بك بانتظام.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="text-xl text-cstm-gray block mb-3">الاسم</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="bg-white block w-full py-4 px-8 text-black border border-0.5 border-[#5501DD66] rounded-[15px]"
              placeholder="محمد عبدالله"
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

          <CountryStateSelect
            country={formik.values.country}
            state={formik.values.state}
            onCountryChange={(value) => formik.setValues({ ...formik.values, country: value, state: null })}
            onStateChange={(value) => formik.setFieldValue('state', value)}
          />

          <div className="flex gap-6 mt-8">
            <button type="submit" className="primary-button mx-auto flex-2">
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
      </DialogContent>
    </Dialog>
  );
};

export default EditUserProfileModal;
