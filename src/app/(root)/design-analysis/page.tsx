'use client';

import React, { useState, useRef, useEffect } from 'react'
import Image from "next/image";
import { CloudUpload, Images, Palette, Ruler, Trash2, ZoomIn, ZoomOut } from 'lucide-react';
import { toast } from 'react-toastify';
import AnalysisResult from '@/components/design-analysis/AnalysisResult';
import { API_URL, MEASURE_UNITS, MEASURE_UNITS_OPTIONS } from '@/lib/constants';
import { analyzeDesign } from '@/actions/products';
import { convertValue } from '@/lib/utils';
import { AnalyzeDesignResponse } from '@/lib/definitions';

const Page = () => {
  const [generateNewImage, setGenerateNewImage] = useState(false);
  const [colorAnalysis, setColorAnalysis] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [productName, setProductName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [measureUnit, setMeasureUnit] = useState<MEASURE_UNITS>('mm');
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeDesignResponse | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!allowedTypes.includes(file.type)) {
        toast.error('يرجى رفع صورة بصيغة PNG أو JPG أو SVG فقط');
        return;
      }
      if (file.size > 512000) {
        toast.error('يجب ألا يتجاوز حجم الصورة 500KB');
        return;
      }
      setUploadedImage(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!allowedTypes.includes(file.type)) {
        toast.error('يرجى رفع صورة بصيغة PNG أو JPG أو SVG فقط');
        return;
      }

      if (file.size > 512000) {
        toast.error('يجب ألا يتجاوز حجم الصورة 500KB');
        return;
      }

      setUploadedImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedImage) {
      toast.error("يرجى رفع صورة أولاً");
      return;
    }
    if (!productName) {
      toast.error("يرجى إدخال اسم المنتج");
      return;
    }
    if (generateNewImage && (!width || !height)) {
      toast.error("يرجى ادخال الابعاد اذا تم تفعيل توليد منتج بناء على أبعاد مخصصة");
      return;
    }

    setLoading(true);

    try {
      const data = {
        image: uploadedImage,
        productName,
        colorAnalysis,
        generateNewImage,
        width: generateNewImage ? null : width,
        height: generateNewImage ? null : height,
        measureUnit: measureUnit,
      };

      const resultRes = await analyzeDesign({
        file: data.image,
        product_name: data.productName,
        do_generate_image: data.generateNewImage,
        do_extract_colors: data.colorAnalysis,
        do_detect_dimensions: true,
        prompt: data.productName,
        user_width: convertValue(Number(data.width), data.measureUnit, 'px'),
        user_height: convertValue(Number(data.height), data.measureUnit, 'px'),
        target_height_cm: convertValue(Number(data.height), data.measureUnit, 'px'),
      });

      if (!resultRes || resultRes.error) {
        toast.error('حدث خطأ أثناء تحليل التصميم، يرجى التحقق من البيانات المدخلة');
        return;
      }

      if (resultRes.result && resultRes.message === 'success') {
        setAnalysisResult(resultRes.result);
      if (resultRes.result.generated_image_url) {
        setPreviewImageUrl(resultRes.result.generated_image_url);
      }
        toast.success('تم تحليل التصميم بنجاح');
        return;
      }

      toast.error(resultRes?.error || 'حدث خطأ أثناء تحليل التصميم، يرجى التحقق من البيانات المدخلة');
      setAnalysisResult(null);

    } finally {
      setLoading(false);
    }
  };

  const imageRef = useRef<HTMLImageElement>(null);

  const applyZoom = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = `scale(${zoom})`;
      imageRef.current.style.cursor = zoom > 1 ? "zoom-out" : "zoom-in";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (zoom <= 1 || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleClick = () => {
    setZoom(prev => (prev > 1 ? 1 : 1.3));
  };

  useEffect(() => {
    applyZoom();
  }, [zoom]);

  return (
    <div className="surface-box">
      <div className="container mx-auto py-8">
        <div className="bg-yellow-50/50 text-yellow-800 px-6 py-4 rounded-md mb-6 text-center text-lg font-medium">
        دقة الموديل الذكي (AI) في تقدير المقاسات تتراوح حالياً بين 85٪ و 90٪، ونعمل باستمرار على تحسينها وزيادتها.
        </div>
        <h3>تحليل التصميم</h3>
        <p className="text-cstm-gray mt-4">قم بتحميل التصميم الخاص بك للحصول على قياسات دقيقة باستخدام الذكاء الاصطناعي </p>
        <div className="flex items-center justify-end">
          {/* <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 p-4 my-4 rounded">
            <p className="text-sm">
              ملاحظة: نموذج الذكاء الاصطناعي الحالي لا يزال في مرحلة التجريب، وقد لا تكون النتائج دقيقة بنسبة 100٪. نحن نعمل باستمرار على تحسين أدائه، لذا يرجى مراجعة النتائج بعناية.
            </p>
          </div> */}
        {/* <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`primary-button mx-auto md:mx-0 md:mr-auto mt-4 flex items-center gap-2 custom-disabled ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              ></circle>
              <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          )}
          <span>تحليل التصميم</span>
        </button> */}
          <button
            className="primary-button !bg-gray-300 !text-gray-600 !border-gray-300 !cursor-not-allowed hover:!bg-gray-300 hover:!text-gray-600 hover:!border-gray-300"
            disabled
            onClick={handleSubmit}
          >
            <Ruler size={16} />
            <span>تحليل التصميم (مغلق حالياً)</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 mt-8">
          <div className="w-full max-w-[395px]">
            <div>
              <div className="bg-white rounded-[16px] p-6 pb-10 cstm-card-style">
                <h3 className="text-right text-lg font-bold text-gray-800 mb-1">تحميل الملف</h3>
                <p className="text-right text-sm text-gray-500 mb-5">يجب ألا يتجاوز حجم الصورة 500KB</p>
                <div
                  className={`border-2 border-dashed border-[#CBD5E1] rounded-[16px] flex flex-col items-center justify-center text-center space-y-4 h-[282px] transition cursor-pointer ${dragActive ? 'bg-violet-50 border-violet-400' : ''}`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                >
                  <div className="bg-[#3B82F61A] text-primary rounded-full flex items-center justify-center p-5">
                    <CloudUpload size={28} strokeWidth={2.5} />
                  </div>
                  {uploadedImage ? (
                    <div className="text-cstm-gray">
                      <p>تم رفع الملف:</p>
                      <p className="font-bold text-sm break-words whitespace-normal w-[80%] mx-auto">{uploadedImage.name}</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-cstm-gray">اسحب وأفلت الملفات هنا </p>
                      <p className="text-cstm-gray">أو</p>
                      <button
                        disabled={loading}
                        type="button"
                        className="secondary-button hover:!bg-violet-50 !text-violet-700 custom-disabled"
                        onClick={e => {
                          e.stopPropagation();
                          inputRef.current?.click();
                        }}
                      >تصفح</button>
                      <input
                        disabled={loading}
                        id="image_upload"
                        type="file"
                        className="sr-only"
                        accept="image/png, image/jpeg, image/svg+xml"
                        ref={inputRef}
                        onChange={handleChange}
                      />
                    </>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-sm text-[#6B7280]">الملفات المدعومة:</p>
                  <span className="inline-flex gap-2 mt-2">
                    <span className="px-2 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280] text-xs">SVG</span>
                    <span className="px-2 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280] text-xs">JPG</span>
                    <span className="px-2 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280] text-xs">PNG</span>
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-[16px] p-6 pb-10 cstm-card-style mt-4">
                <h3 className="text-right text-lg font-bold text-gray-800 mb-4">خيارات التحليل</h3>
                <div>
                  <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">اسم المنتج</label>
                  <input
                    disabled={loading}
                    type="text"
                    id="product_name"
                    className="bg-main-bg border border-[#E5E7EB] text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 custom-disabled"
                    placeholder="اسم المنتج"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between mt-7">
                  <div className="flex items-center gap-5">
                    <Palette size={16} />
                    <p>تحليل الألوان</p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      disabled={loading}
                      id="color_analysis"
                      type="checkbox"
                      className="sr-only peer custom-disabled"
                      checked={colorAnalysis}
                      onChange={() => setColorAnalysis(v => !v)}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between mt-7">
                  <div className="flex items-center gap-5">
                    <p>توليد منتج بناء على أبعاد مخصصة</p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      disabled={loading}
                      id="auto_dimensions"
                      type="checkbox"
                      checked={generateNewImage}
                      onChange={() => setGenerateNewImage((v) => !v)}
                      className="sr-only peer custom-disabled"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center gap-x-4 mt-3">
                  <div>
                    <input
                      id="width"
                      type="number"
                      placeholder="العرض"
                      disabled={!generateNewImage || loading}
                      value={width}
                      onChange={e => setWidth(e.target.value)}
                      className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-100 disabled:text-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      id="height"
                      type="number"
                      placeholder="الطول"
                      required
                      disabled={!generateNewImage || loading}
                      value={height}
                      onChange={e => setHeight(e.target.value)}
                      className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-100 disabled:text-gray-400"
                    />
                  </div>
                  <div>
                    <select
                      id="measure_unit"
                      value={measureUnit}
                      onChange={e => setMeasureUnit(e.target.value as 'mm' | 'cm' | 'in' | 'px')}
                      disabled={!generateNewImage || loading}
                      className="min-w-[80px] bg-white border border-gray-500 text-gray-900 text-m rounded-lg outline-none block w-full p-2.5 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      {MEASURE_UNITS_OPTIONS.map(unit => (
                        <option key={unit.value} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white rounded-[16px] p-6 cstm-card-style flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-right text-lg font-bold text-gray-800 mb-4">معاينة التصميم</h3>
                <div className="flex items-center gap-2">
                  <button
                    disabled={zoom <= 0.5 || !uploadedImage || loading}
                    type="button"
                    className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition
                      disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                    onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
                    title="تصغير"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <span className="text-sm w-10 text-center">{Math.round(zoom * 100)}%</span>
                  <button
                    disabled={zoom >= 4 || !uploadedImage || loading}
                    type="button"
                    className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition
                      disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                    onClick={() => setZoom(prev => Math.min(prev + 0.1, 4))}
                    title="تكبير"
                  >
                    <ZoomIn size={18} />
                  </button>
                  {uploadedImage && <button className="focus:none outline-none ms-4 custom-disabled" onClick={() => setUploadedImage(null)} disabled={!uploadedImage || loading}>
                    <span className="sr-only">حذف الصورة</span>
                    <Trash2 className="hover:text-red-400" />
                  </button>}
                </div>
              </div>
              {analysisResult?.generated_image_url && (
                <p className="text-sm text-primary text-center mt-2">* تم توليد هذه الصورة بواسطة الذكاء الاصطناعي</p>
              )}
              {uploadedImage ? (
                <div className="bg-main-bg h-full w-full rounded-[16px] flex items-center justify-center overflow-auto">
                  <div
                    className="flex items-center justify-center w-full h-full transition-transform duration-200"
                    style={{ transform: `scale(${zoom})` }}
                  >
                    <Image
                      ref={imageRef}
                      // src={
                      //   analysisResult?.generated_image_url
                      //     ? `data:image/png;base64,${analysisResult.generated_image}`
                      //      ? `${analysisResult.generated_image_url}`
                      //     : URL.createObjectURL(uploadedImage)
                      // }
                      src={previewImageUrl ? API_URL + previewImageUrl : URL.createObjectURL(uploadedImage)}
                      // src={URL.createObjectURL(uploadedImage)}
                      alt="معاينة التصميم"
                      className="p-8 max-h-[727px] rounded-[16px] object-contain transition-transform duration-200"
                      width={747}
                      height={727}
                      onMouseMove={handleMouseMove}
                      onClick={handleClick}
                    />
                  </div>
                </div>
              ) : (
                <div className="min-h-[300px] bg-main-bg rounded-[16px] border border-[#E5E7EB] h-full flex flex-col gap-y-4 items-center justify-center">
                  <div className="p-5 rounded-full bg-[#E5E7EB]">
                    <Images className="text-[#9CA3AF]" size={36} />
                  </div>
                  <p className="text-[#6B7280]">قم بتحميل ملف لعرض المعاينة </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {analysisResult && <AnalysisResult result={analysisResult} />}
      </div>
    </div>
  )
}

export default Page;