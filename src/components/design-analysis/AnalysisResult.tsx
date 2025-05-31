import { ArrowDownToLine, ArrowDownUp, ArrowLeftRight, Check, Copy, Info, Palette } from 'lucide-react'
import { useState } from 'react';
import { convertValue } from '@/lib/utils'
import { MEASURE_UNITS } from '@/lib/constants';

const AnalysisResult = () => {
  
  const [measureUnit, setMeasureUnit] = useState('mm');
  const [copied, setCopied] = useState(false);
  const width = convertValue(120, measureUnit);
  const height = convertValue(88, measureUnit);
  const COLORS = ['#4205A5', '#432234', '#F9FAFB', '#D1D5DB', '#9CA3AF'];

  const handleExport = () => {
    const widthStr = width % 1 === 0 ? width : width.toFixed(2);
    const heightStr = height % 1 === 0 ? height : height.toFixed(2);
    const unitLabel = MEASURE_UNITS.find(u => u.value === measureUnit)?.label || measureUnit;
    const colorsList = COLORS.map((c, i) => `  ${i + 1}. ${c}`).join('\n');
    const text = 
      `نتائج التحليل\n` +
      `----------------------\n` +
      `العرض:  ${widthStr} ${unitLabel}\n` +
      `الطول:  ${heightStr} ${unitLabel}\n` +
      `----------------------\n` +
      `الألوان:\n${colorsList}\n`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analysis-result.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyColors = () => { 
    navigator.clipboard.writeText(COLORS.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const downloadColors = () => {
    const colorsText = COLORS.join(', ');
    const blob = new Blob([colorsText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "colors.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <section className="mt-8 bg-white rounded-[16px] p-6 cstm-card-style">
      <div className="flex flex-col md:flex-row gap-y-6 justify-between items-start md:items-center">
        <h4>نتائج التحليل</h4>
        <button type="button" onClick={handleExport} className="flex items-center gap-4 px-16 py-3 rounded-[8px] text-primary bg-white border border-primary hover:bg-primary hover:text-white transition">
          <ArrowDownToLine />
          <span>تصدير</span>
        </button>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h5 className="mt-8">الأبعاد الرئيسية</h5>
          <select
            id="measure_unit"
            value={measureUnit}
            onChange={e => setMeasureUnit(e.target.value)}
            className="min-w-[80px] w-fit bg-white border border-gray-500 text-gray-900 text-m rounded-lg outline-none block p-2.5 disabled:bg-gray-100 disabled:text-gray-400"
          >
          {MEASURE_UNITS.map(unit => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6 flex flex-col md:flex-row items-center gap-8">
          <div className="bg-main-bg rounded-[16px] p-4 w-full">
            <div className="flex items-center gap-4"><ArrowDownUp size={16} className="text-primary" /> <span>العرض</span></div>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold py-2">{ MEASURE_UNITS.find(u => u.value === measureUnit)?.label || measureUnit }</p>
              <p className="text-xl font-bold py-2">{width % 1 === 0 ? width : width.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-main-bg rounded-[16px] p-4 w-full">
            <div className="flex items-center gap-4"><ArrowLeftRight size={16} className="text-primary" /> <span>الطول</span></div>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold py-2">{ MEASURE_UNITS.find(u => u.value === measureUnit)?.label || measureUnit }</p>
              <p className="text-xl font-bold py-2">{height % 1 === 0 ? height : height.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-x-4">
          <Palette />
          <h5>تحليل الألوان</h5>
        </div>
        <div className="mt-6 flex flex-wrap gap-10">
          {COLORS.map((color, idx) => (
            <div
              key={color + idx}
              className={`
                w-[75px] h-[75px] rounded-[16px] transition
                border border-[#0000004D] shadow-lg
                cursor-pointer ring-0 hover:ring-4 hover:ring-primary/40 hover:scale-105 relative
              `}
              style={{ backgroundColor: color }}
              onClick={() => {
                navigator.clipboard.writeText(color);
                setCopiedColor(color);
                setTimeout(() => setCopiedColor(null), 1200);
              }}
            >
              {copiedColor === color && (
                <span
                  className="
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    bg-white/600 text-primary flex items-center gap-1
                    text-xs px-3 py-1 rounded-lg shadow-lg
                    transition-all duration-300
                    opacity-100 scale-100
                    pointer-events-none
                    z-10
                  "
                  style={{ minWidth: 70 }}
                >
                  <Check size={14} className="text-green-600" />
                  <span className="font-bold">تم النسخ!</span>
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center gap-y-4 gap-x-11">
          <button
            className={`flex items-center gap-2 rounded-[10px] py-2 px-8 border text-[#4B5563] hover:bg-cstm-gray hover:text-white hover:border-cstm-gray transition-colors duration-200 ${copied ? "border-green-600" : "border-[#0000004D]"}`}
            onClick={copyColors}
          >
            {copied ? <Check className="text-green-600" /> : <Copy size={16} />}
            {copied ? <span className="text-green-600">تم نسخ الألوان!</span> : <span>نسخ جميع الألوان </span>}
          </button>
          <button onClick={downloadColors} className="flex items-center gap-2 rounded-[10px] py-2 px-8 border border-[#0000004D] text-[#4B5563] hover:bg-cstm-gray hover:text-white hover:border-cstm-gray transition-colors duration-200">
            <ArrowDownToLine size={16} />
            <span>تنزيل لوحة الألوان </span>
          </button>
        </div>
        <div className="mt-6 p-6 bg-primary-50 rounded-[16px] flex items-center gap-4">
          <Info className="text-primary" />
          <div>
            <p className="font-bold">معلومات الدقة</p>
            <p className="text-cstm-gray mt-2">تم تحليل التصميم بدقة عالية. هامش الخطأ المقدر: ±0.5 مم</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnalysisResult