'use client';
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FORMATS = [
  { label: "STL", value: "stl" },
  { label: "OBJ", value: "obj" },
  { label: "FBX", value: "fbx" },
  { label: "STEP", value: "step" },
];

const DownloadDesignModal = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (format: string) => {
    setSelected((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format]
    );
  };

  const handleDownload = () => {
    selected.forEach((format) => {
      // Replace the URL below with your actual file URLs for each format
      const url = `/downloads/design-file.${format}`;
      const a = document.createElement("a");
      a.href = url;
      a.download = `design-file.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
            {FORMATS.map((format) => (
              <label key={format.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.includes(format.value)}
                  onChange={() => handleToggle(format.value)}
                  className="accent-primary w-5 h-5 rounded-[4px]"
                />
                <span>{format.label}</span>
              </label>
            ))}
          </div>
        </div>
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