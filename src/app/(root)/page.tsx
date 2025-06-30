import Image from "next/image";
import { ArrowDownToLine, ArrowLeft, ArrowUpFromLine, Check, CloudUpload, Database, GraduationCap, Info, PencilRuler, PenTool, Printer, Ruler, UserPlus } from "lucide-react";
import Categories from "@/components/home/Categories";
import Link from "next/link";
import { getUser } from "@/actions/user";
import { AOSProvider } from "@/components/home/AOSProvider";

export default async function Home() {
  const user = await getUser();
  return (
    <>
    <AOSProvider />
      <div>
        <section id="hero-section" data-aos="fade-up"  className="relative flex flex-col items-center justify-center gap-y-10 h-screen bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255, 255, 255, 0.765) 0%, rgba(255, 255, 255, 0.68) 50%, rgba(0, 0, 0, 0) 100%),
            url('/images/hero-bg.png')
          `
        }}>
          <h1>القياسات الدقيقة للمصممين</h1>
          <p className="text-[18px] text-[#374151] max-w-[541px] text-center">وفر الوقت والجهد في البحث عن قياسات المنتجات. حلل تصاميمك أو استعرض مكتبتنا للقياسات الدقيقة.</p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link data-aos="fade-left" href="/design-analysis" className="primary-button">
              <ArrowUpFromLine />
              <span>رفع صورة المنتج</span>
            </Link>
            <Link data-aos="fade-right" href="/product-library" className="secondary-button">
              <Database />
              <span>تصفح المكتبة</span>
            </Link>
          </div>
        </section>
        <section id="features" className="flex flex-col items-center justify-center gap-y-8 py-16">
          <h3 data-aos="fade-up">ميزاتنا الرئيسية</h3>
          <p data-aos="fade-up" className="text-cstm-gray max-w-[1042px] text-center p-2">مشروع &quot;مقدار&quot; هو موقع إلكتروني موجه للمصممين الصناعيين ومصممي المنتجات، يوفر لهم حلًا سريعًا وذكيًا للحصول على المقاسات الدقيقة للمنتجات الفيزيائية الشائعة. يهدف الموقع إلى تسريع عملية التصميم وتوفير الوقت الذي يتم ضياعه في البحث عن الأبعاد الدقيقة للمنتجات المرجعية مثل دلة القهوة، الأكواب، الأغطية، والقطع الميكانيكية.</p>
          <div data-aos="fade-up" className="mt-25 w-full max-w-[840px] bg-primary-50 rounded-2xl p-6 flex flex-col items-center gap-y-6">
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
            <div className="flex flex-col md:flex-row items-center gap-14 p-2">
              <div data-aos="fade-up-left" className="flex-auto card-style">
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
                    <Link href="/design-analysis" className="primary-button w-fit">
                      <span> جرب الآن</span>
                      <ArrowLeft size={16} strokeWidth={1} />
                    </Link>
                </div>
              </div>
              <div data-aos="fade-up-right" className="flex-auto card-style">
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
                    <Link href="product-library" className="primary-button w-fit">
                      استكشف المكتبة
                      <ArrowLeft size={16} strokeWidth={1} />
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {user && <Categories />}
        <section data-aos="fade-up" className="py-16 bg-main-bg text-center p-2">
          <h3>كيف يعمل</h3>
          <p className="text-cstm-gray mt-8">خطوات بسيطة تمكنك من الحصول على القياسات الدقيقة بسرعة وسهولة</p>
          <div className="flex gap-6 w-full max-w-[896px] mx-auto mt-18">
            <div className="hidden md:flex">
              <div className="relative flex flex-col items-center h-full">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-0.5 bg-primary-100"></div>
                <div className="relative z-10 grid px-3 py-1 text-white bg-primary rounded-4xl place-items-center">
                  1
                </div>
                <div className="h-1/3"></div>
                <div className="relative z-10 grid px-3 py-1 text-white bg-primary rounded-4xl place-items-center">
                  2
                </div>
                <div className="h-1/3"></div>
                <div className="relative z-10 grid px-3 py-1 text-white bg-primary rounded-4xl place-items-center">
                  3
                </div>
                <div className="h-1/3"></div>
              </div>
            </div>
            <div className="flex-auto w-full">
              <div data-aos="flip-up" className="flex flex-col gap-y-6 text-start bg-white p-6 rounded-[16px]">
                <h4 className="text-primary">تحميل التصميم أو اختيار منتج</h4>
                <p className="text-cstm-gray">قم بتحميل صورة أو نموذج ثلاثي الأبعاد للتصميم الخاص بك، أو اختر منتجاً من مكتبتنا الشاملة</p>
                <div className="flex items-center flex-wrap gap-x-3 text-primary">
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">صور</p>
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">نماذج ثلاثية الأبعاد</p>
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">رسومات</p>
                </div>
              </div>
              <div data-aos="flip-down" className="flex flex-col gap-y-6 text-start bg-white p-6 rounded-[16px] mt-10">
                <h4 className="text-primary">تحليل ذكي للقياسات</h4>
                <p className="text-cstm-gray">يقوم نظامنا المتطور بتحليل التصميم واستخراج جميع القياسات الضرورية بدقة عالية</p>
                <div className="flex items-center flex-wrap gap-x-3 text-primary">
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">نتائج فورية</p>
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">دقة عالية</p>
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">تحليل تلقائي</p>
                </div>
              </div>
              <div data-aos="flip-up" className="flex flex-col gap-y-6 text-start bg-white p-6 rounded-[16px] mt-10">
                <h4 className="text-primary">تصدير وتنزيل النتائج</h4>
                <p className="text-cstm-gray">احصل على تقرير شامل بجميع القياسات بالتنسيق الذي تفضله</p>
                <div className="flex items-center flex-wrap gap-x-3 text-primary">
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">JSON</p>
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">CSV</p>
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">DXF</p>
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">PDF</p>
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">STL</p>
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">OBJ</p>
                  <p className="px-3 py-1 text-sm bg-primary-100 rounded-2xl">BLENDER</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section data-aos="fade-up" className="p-2 pt-4 pb-16 w-full max-w-[896px] mx-auto">
          <div className="flex items-center justify-around">
            <div className="p-6 bg-[#3B82F61A] rounded-full">
              <CloudUpload size={28} className="text-primary"/>
            </div>
            <div className="p-6 bg-[#3B82F61A] rounded-full">
              <Ruler size={28} className="text-primary"/>
            </div>
            <div className="p-6 bg-[#3B82F61A] rounded-full">
              <ArrowDownToLine size={28} className="text-primary"/>
            </div>
          </div>
          <div className="flex items-center w-full mt-4">
            <div className="flex-1 h-0.25 bg-primary-100 mx-2"></div>
            <div className="relative z-10 grid px-4 py-2 text-white bg-primary rounded-full place-items-center">
              1
            </div>
            <div className="flex-2 h-0.25 bg-primary-100 mx-2"></div>
            <div className="relative z-10 grid px-4 py-2 text-white bg-primary rounded-full place-items-center">
              2
            </div>
            <div className="flex-2 h-0.25 bg-primary-100 mx-2"></div>
            <div className="relative z-10 grid px-4 py-2 text-white bg-primary rounded-full place-items-center">
              3
            </div>
            <div className="flex-1 h-0.25 bg-primary-100 mx-2"></div>
          </div>
          <div className="flex items-center justify-around gap-x-4">
            <div data-aos="fade-up-left" className="text-center">
              <h6>حمّل التصميم أو اختر منتج</h6>
              <p className="text-cstm-gray mt-4">حمّل صورة أو نموذج ثلاثي الأبعاد أو اختر من مكتبتنا </p>
            </div>
            <div data-aos="fade-up" className="text-center">
              <h6>تحليل الذكاء الاصطناعي / عرض القياسات</h6>
              <p className="text-cstm-gray mt-4">يقوم نظامنا بتحليل التصميم وعرض القياسات الدقيقة</p>
            </div>
            <div data-aos="fade-up-right" className="text-center">
              <h6>تنزيل النتائج</h6>
              <p className="text-cstm-gray mt-4">احصل على القياسات بتنسيقات متعددة جاهزة للاستخدام</p>
            </div>
          </div>
            <Link href="/design-analysis" className="primary-button mx-auto mt-8 w-min">
              <span>ابدأ الآن</span>
              <ArrowLeft size={16} />
            </Link>
        </section>
        <section data-aos="fade-up" className="bg-main-bg">
          <div className="container mx-auto py-16">
            <h3 className="text-center">فوائد للجميع</h3>
            <p className="text-cstm-gray mt-8 text-center">صمم مقدار لتلبية احتياجات مجموعة متنوعة من المستخدمين في مجال التصميم والإنتاج</p>
            <div className="flex flex-wrap justify-center md:justify-between gap-4 mt-10">
              <div data-aos="flip-left" className="flex flex-col gap-y-4 w-full max-w-[288px] min-h-[345px] bg-white p-6 rounded-[16px] card-style">
                <div className="p-6 bg-primary-100 rounded-full w-fit mb-4">
                  <PenTool size={20} className="text-primary" />
                </div>
                <h5>مصممي المنتجات والصناعيين</h5>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">استخراج القياسات الدقيقة باستخدام الذكاء الاصطناعي</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">ضمان الدقة في تصاميم المنتجات</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">تسريع عملية التصميم وتقليل التكرار</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">اختيار الخامات المناسبة للمنتج</p>
                </div>
              </div>
              <div data-aos="flip-right" className="flex flex-col gap-y-4 w-full max-w-[288px] min-h-[345px] bg-white p-6 rounded-[16px] card-style">
                <div className="p-6 bg-primary-100 rounded-full w-fit mb-4">
                  <PencilRuler size={20} className="text-primary" />
                </div>
                <h5>المهندسين</h5>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">تحليل دقيق للمواصفات الهندسية</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">توافق مع معايير الصناعة</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">تكامل مع أدوات</p>
                </div>
              </div>
              <div data-aos="flip-left" className="flex flex-col gap-y-4 w-full max-w-[288px] min-h-[345px] bg-white p-6 rounded-[16px] card-style">
                <div className="p-6 bg-primary-100 rounded-full w-fit mb-4">
                  <Printer size={20} className="text-primary" />
                </div>
                <h5>هواة الطباعة ثلاثية الأبعاد</h5>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">الحصول على قياسات دقيقة للنماذج الموجودة</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">تصميم قطع متوافقة مع المنتجات</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">تقليل هدر المواد من خلال الحصول على القياسات الصحيحة</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">توفير ملفات جاهزة لطباعة ثلاثية الأبعاد بصيغة Stl, OBJ</p>
                </div>
              </div>
              <div data-aos="flip-right" className="flex flex-col gap-y-4 w-full max-w-[288px] min-h-[345px] bg-white p-6 rounded-[16px] card-style">
                <div className="p-6 bg-primary-100 rounded-full w-fit mb-4">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <h5>الطلاب والحرفيين</h5>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">ختيار الخامات الأنسب للمنتجك</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]"> اختيار المقاسات الدقيقة لمنتجك</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]"> إنتاج نماذج ثلاثية أبعاد ( بلوكات ) من خلال النصوص</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <Check size={16} strokeWidth={1.5} className="text-primary" />
                    <p className="text-sm text-[#374151]">لتسريع من عملية التصميم</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {!user && <section data-aos="fade-up" className="bg-[#3B82F60D]">
          <div className="flex flex-col items-center justify-center gap-y-10 py-16 text-center">
            <h3>جاهز للبدء؟</h3>
            <p className="text-cstm-gray">انضم إلى مجتمع المصممين الذين يوفرون الوقت والجهد باستخدام مقدار للحصول على قياسات دقيقة </p>
            <div className="flex flex-col md:flex-row gap-4">
                <Link href="/register" className="primary-button">
                  <UserPlus />
                  <span>إنشاء حساب مجاني </span>
                </Link>
                <Link href="/about" className="secondary-button">
                  <Info size={20} />
                  <span>معرفة المزيد</span>
                </Link>
            </div>
          </div>
        </section>}
      </div>
    </>
  );
}
