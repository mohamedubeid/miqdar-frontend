'use client';
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DesignFile } from '@/lib/definitions';
import { API_URL } from "@/lib/constants";

const FORMATS = [
  { label: "STL", value: "stl" },
  { label: "OBJ", value: "obj" },
  { label: "FBX", value: "fbx" },
  { label: "STEP", value: "step" },
];

type DownloadDesignModalProps = {
  design_file_stl?: string | null;
  design_file_obj?: string | null;
  design_file_fbx?: string | null;
  design_file_step?: string | null;
};

const DownloadDesignModal = ({
  design_file_stl,
  design_file_obj,
  design_file_fbx,
  design_file_step,
}: DownloadDesignModalProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (format: string) => {
    setSelected((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  const getParsedFiles = (data?: string | null): DesignFile[] => {
    try {
      if (!data) return [];
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to parse design file:', err);
      return [];
    }
  };

  const filesMap: Record<string, DesignFile[]> = {
    stl: getParsedFiles(design_file_stl),
    obj: getParsedFiles(design_file_obj),
    fbx: getParsedFiles(design_file_fbx),
    step: getParsedFiles(design_file_step),
  };

  const handleDownload = () => {
    selected.forEach((format) => {
      const files = filesMap[format];
      files.forEach((file) => {
        const a = document.createElement('a');
        a.href = `${API_URL}/storage/${file.download_link}`;
        a.download = file.original_name;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
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
        <a href="https://olivedrab-hyena-876790.hostingersite.com/storage/products/July2025/TJG1kY8jnzhlEGkliyr3.stp" download={true}>tttttttt</a>
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