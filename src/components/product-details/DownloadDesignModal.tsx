'use client';

import { useState } from "react";
// import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DesignFile } from '@/lib/definitions';
// import { incrementDownloadCount } from "@/actions/products";

const FORMATS = [
  { label: "STL", value: "stl" },
  { label: "OBJ", value: "obj" },
  { label: "FBX", value: "fbx" },
  { label: "STEP", value: "step" },
];

type DownloadDesignModalProps = {
  productId: number;
  design_file_stl: DesignFile[];
  design_file_obj: DesignFile[];
  design_file_fbx: DesignFile[];
  design_file_step: DesignFile[];
};

const DownloadDesignModal = ({
  productId,
  design_file_stl,
  design_file_obj,
  design_file_fbx,
  design_file_step,
}: DownloadDesignModalProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  // const router = useRouter();

  const filesMap: Record<string, DesignFile[]> = {
    stl: design_file_stl,
    obj: design_file_obj,
    fbx: design_file_fbx,
    step: design_file_step,
  };

  const handleDownload = async () => {
    if (!selected) return;

    // try {
    //   await incrementDownloadCount(productId);
    //   router.refresh();
    // } catch (error) {
    //   console.error('Failed to increment download count:', error);
    // }

    const files = filesMap[selected];
    if (!files?.length) return;

    const file = files[0];
    const a = document.createElement('a');
    a.href = file.download_link;
    a.download = file.original_name;
    a.target = '_blank';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
    }, 100);
  };
  return (
    <Dialog>
      <DialogTrigger className="secondary-button">تحميل ملف التصميم</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">تحميل ملف التصميم</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          <label className="block mb-2 font-semibold">الصيغ المدعومة:</label>
          <div className="flex gap-8 flex-wrap mt-6">
            {FORMATS.map((format) => {
              const isAvailable = filesMap[format.value]?.length > 0;
              return (
                <label key={format.value} className="flex items-center gap-2 opacity-100 cursor-pointer">
                  <input
                    type="radio"
                    name="file-format"
                    value={format.value}
                    checked={selected === format.value}
                    onChange={() => setSelected(format.value)}
                    className="accent-primary w-5 h-5"
                    disabled={!isAvailable}
                  />
                  <span className={isAvailable ? '' : 'text-gray-400 line-through'}>
                    {format.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        <button
          className="primary-button w-fit mx-auto mt-4"
          onClick={handleDownload}
          disabled={!selected}
        >
          تحميل الملف
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDesignModal;