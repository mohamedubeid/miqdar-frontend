'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DesignFile } from '@/lib/definitions';
import { incrementDownloadCount } from "@/actions/products";

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
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const handleToggle = (format: string) => {
    setSelected((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  const filesMap: Record<string, DesignFile[]> = {
    stl: design_file_stl,
    obj: design_file_obj,
    fbx: design_file_fbx,
    step: design_file_step,
  };

  const handleDownload = async () => {
    // Increment download count
    try {
      await incrementDownloadCount(productId);
      // Refresh the page to show updated download count
      router.refresh();
    } catch (error) {
      console.error('Failed to increment download count:', error);
      // Continue with download even if increment fails
    }

    // Download files
    selected.forEach((format) => {
      const files = filesMap[format];
      files.forEach((file) => {
        const a = document.createElement('a');
        // All formats now use the download_link directly from the API
        a.href = file.download_link;
        a.download = file.original_name;
        a.target = '_blank';
        document.body.appendChild(a);
        if (a.href) {
          a.click();
        }
        document.body.removeChild(a);
      });
    });
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
                <label key={format.value} className="flex items-center gap-2 opacity-100">
                  <input
                    type="checkbox"
                    checked={selected.includes(format.value)}
                    onChange={() => handleToggle(format.value)}
                    className="accent-primary w-5 h-5 rounded-[4px]"
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
        {/* <a href="https://olivedrab-hyena-876790.hostingersite.com/storage/products/July2025/TJG1kY8jnzhlEGkliyr3.stp" download={true}>tttttttt</a> */}
        <button
          className="primary-button w-fit mx-auto mt-4"
          onClick={handleDownload}
          disabled={selected.length === 0}
        >
          تحميل الملفات المحددة
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDesignModal;