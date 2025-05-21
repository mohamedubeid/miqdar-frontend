import { ArrowLeft, ArrowUpFromLine, Check, Database } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div id="hero-section">
        <section id="hero-section" className="flex flex-col items-center justify-center gap-y-10 h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
          <h1>القياسات الدقيقة للمصممين</h1>
          <p className="text-[18px] text-[#374151] max-w-[541px] text-center">وفر الوقت والجهد في البحث عن قياسات المنتجات. حلل تصاميمك أو استعرض مكتبتنا للقياسات الدقيقة.</p>
          <div className="flex gap-x-4">
            <button className="flex items-center gap-4 px-16 py-3 rounded-[8px] bg-primary text-white border border-primary hover:bg-white hover:text-primary transition">
              <ArrowUpFromLine />
              <span>تحليل التصميم AI</span>
            </button>
            <button className="flex items-center gap-4 px-16 py-3 rounded-[8px] text-primary bg-white border border-primary hover:bg-primary hover:text-white transition">
              <Database />
              <span>استعرض المكتبة</span>
            </button>
          </div>
        </section>
        <section id="features" className="flex flex-col items-center justify-center gap-y-8 py-16">
          <h2 className="text-3xl font-bold">ميزاتنا الرئيسية</h2>
          <p className="text-[#4B5563] max-w-[1042px] text-center">مشروع &quot;مقدار&quot; هو موقع إلكتروني موجه للمصممين الصناعيين ومصممي المنتجات، يوفر لهم حلًا سريعًا وذكيًا للحصول على المقاسات الدقيقة للمنتجات الفيزيائية الشائعة. يهدف الموقع إلى تسريع عملية التصميم وتوفير الوقت الذي يتم ضياعه في البحث عن الأبعاد الدقيقة للمنتجات المرجعية مثل دلة القهوة، الأكواب، الأغطية، والقطع الميكانيكية.</p>
          <div className="mt-25 w-full max-w-[840px] bg-[#5501DD0D] rounded-2xl p-6 flex flex-col items-center gap-y-6">
            <h4 className="font-bold text-xl text-primary">لماذا مقدار؟ </h4>
            <div className="flex items-center gap-x-3">
              <Check size={16} strokeWidth={1.5} className="text-[#3B82F6]" />
              <p className="text-start">توفير أكثر من 70% من وقت البحث عن القياسات</p>
            </div>
            <div className="flex items-center gap-x-3">
              <Check size={16} strokeWidth={1.5} className="text-[#3B82F6]" />
              <p className="text-start">دقة تصل إلى 99.9% في تحليل القياسات</p>
            </div>
            <div className="flex items-center gap-x-3">
              <Check size={16} strokeWidth={1.5} className="text-[#3B82F6]" />
              <p>أكثر من 10,000 منتج في مكتبتنا</p>
            </div>
          </div>
          <div className="container mx-auto my-8">
            <div className="flex items-center gap-14">
              <div className="flex-auto card-style">
                <Image src="/images/analysis.png" alt="analysis" width={606} height={272} className="rounded-t-[16px]"/>
                <div className="flex flex-col gap-6 p-6">
                  <h5>تحليل القياسات بالذكاء الاصطناعي</h5>
                  <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p>حمّل صورة أو نموذج ثلاثي الأبعاد للتحليل الفوري </p>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p>استخراج القياسات الدقيقة باستخدام الذكاء الاصطناعي</p>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p>تنزيل النتائج بتنسيقات متعددة</p>
                  </div>
                  <button className="flex items-center gap-4 px-10 py-3 w-fit rounded-[8px] bg-primary text-white border border-primary hover:bg-white hover:text-primary transition">
                    جرب الآن
                    <ArrowLeft size={16} strokeWidth={1} />
                  </button>
                </div>
              </div>
              <div className="flex-auto card-style">
                <Image src="/images/library.png" alt="library" width={606} height={272} className="rounded-t-[16px]" />
                <div className="flex flex-col gap-6 p-6">
                  <h5>مكتبة المنتجات</h5>
                  <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p>مئات المنتجات الشائعة مع قياسات دقيقة </p>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p>تصفية حسب الفئة والحجم والمواد</p>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p>مقارنة التصاميم مع المنتجات الموجودة</p>
                  </div>
                  <button className="flex items-center gap-4 px-10 py-3 w-fit rounded-[8px] bg-primary text-white border border-primary hover:bg-white hover:text-primary transition">
                    استكشف المكتبة
                    <ArrowLeft size={16} strokeWidth={1} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
