import { useEffect, useState } from "react";
import Image from "next/image";

type ProfilePicInputProps = {
  value: File | null;
  onChange: (file: File | null) => void;
};

function ProfilePicInput({ value, onChange }: ProfilePicInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      setPreview(URL.createObjectURL(value));
      return () => URL.revokeObjectURL(preview!);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      <label className="block mb-2 text-xl text-cstm-gray">الصورة الشخصية</label>
      {preview && (
        <Image
          src={preview}
          alt="صورة الملف الشخصي"
          className="w-24 h-24 rounded-full object-cover mb-2 border"
          width={96}
          height={96}
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-100 file:text-primary"
      />
    </div>
  );
}

export default ProfilePicInput;