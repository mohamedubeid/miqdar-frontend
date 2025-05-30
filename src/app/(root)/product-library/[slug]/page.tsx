
import EmblaCarousel from '@/components/product-details/EmblaCarousel'
import FavoriteButton from '@/components/product-details/FavoriteButton';
import ShareButton from '@/components/product-details/ShareButton';
import DownloadDesignModal from '@/components/product-details/DownloadDesignModal';
import { EmblaOptionsType } from 'embla-carousel'
import { Check, Ruler } from 'lucide-react'

const OPTIONS: EmblaOptionsType = {
  dragFree: false,
  // direction: 'rtl',
  loop: false
}

const IMAGES = ["/placeholders/pro1.png", "/placeholders/pro2.jpg", "/placeholders/pro3.jpg", "/placeholders/pro1.png", "/placeholders/pro2.jpg"];

  const width = '120';
  const height = '45';
  const length = '55';
  const weight = '45';

  const MATERIALS = ['خشب بلوط صلب مع تشطيب خشبي طبيعي', 'زجاج مقسى شفاف', 'وصلات معدنية من الفولاذ المقاوم للصدأ', 'أقدام قابلة للتعديل مع حماية للأرضية'];

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = await params
  console.log('slug: ', slug);

  return (
    <div className="bg-[#F9FAFB] px-2 py-19">
      <div className="container mx-auto p-6 bg-white rounded-[16px]">

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h3>طاولة قهوة خشبية</h3>
            <p className="text-cstm-gray">Wooden Coffee Table</p>
          </div>
          <DownloadDesignModal />
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-8">

          <div className="flex-1">
            <EmblaCarousel options={OPTIONS} images={IMAGES} />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-y-8">
              <div>
                <h4 className="border-r-4 border-primary ps-4">الوصف</h4>
                <p className="text-cstm-gray mt-4"> تجمع بين الأناقة والوظيفة العملية، مثالية للمساحات المعاصرة. تتميز بقاعدة خشبية بشكل مثلث تدعم سطح زجاجي دائري، مما يخلق مظهرًا عائمًا أنيقًا ويضيف لمسة من الأناقة إلى أي طاولة قهوة عصرية بتصميم أنيق، مصنوعة من خشب البلوط الفاخر مع سطح زجاجي شفاف.</p>
              </div>
              <div>
                <h4 className="border-r-4 border-primary ps-4">التصنيف</h4>
                <div className="flex items-center gap-4 mt-4">
                  <div className="rounded-full bg-[#F3F4F6] px-4 py-2">
                    <p className="text-sm">غرفة المعيشة</p>
                  </div>
                  <div className="rounded-full bg-[#F3F4F6] px-4 py-2">
                    <p className="text-sm">طاولات</p>
                  </div>
                  <div className="rounded-full bg-[#F3F4F6] px-4 py-2">
                    <p className="text-sm">أثاث منزلي</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="border-r-4 border-primary ps-4">المواصفات</h4>
                <div className="flex flex-wrap gap-y-4 mt-4">
                  <div className="flex-1/2">
                    <p><span className="text-cstm-gray">الطول:</span> <span className="font-semibold">{height} سم</span></p>
                  </div>
                  <div className="flex-1/2">
                    <p><span className="text-cstm-gray">الوزن:</span> <span className="font-semibold">{weight} كجم</span></p>
                  </div>
                  <div className="flex-1/2">
                    <p><span className="text-cstm-gray">العرض:</span> <span className="font-semibold">{width} سم</span></p>
                  </div>
                  <div className="flex-1/2">
                    <p><span className="text-cstm-gray">الارتفاع:</span> <span className="font-semibold">{length} سم</span></p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="border-r-4 border-primary ps-4">المواد المستخدمة</h4>
                <div className="flex flex-col gap-y-4 mt-4">
                  {MATERIALS.map((material, idx) => (
                    <div key={idx} className="flex items-center gap-x-2">
                      <div className="rounded-full bg-primary p-0.5">
                        <Check size={12} strokeWidth={4} className="text-white" />
                      </div>
                      <p>{material}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="border-r-4 border-primary ps-4">ملاحظات</h4>
                <div className="flex flex-col gap-y-4 mt-4">
                  <p>تجمع بين الأناقة والوظيفة العملية، مثالية للمساحات المعاصرة. تتميز بقاعدة خشبية بشكل مثلث تدعم سطح زجاجي دائري، مما يخلق مظهرًا عائمًا أنيقًا ويضيف لمسة من الأناقة إلى أي طاولة قهوة عصرية بتصميم أنيق، مصنوعة من خشب البلوط الفاخر مع سطح زجاجي شفاف.</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {/* <button className="primary-button !bg-[#1F2937] hover:!bg-[#1F2937cc] !border-none hover:!text-white">
                  <Pencil size={16} />
                  <span>تعديل القياسات</span>
                </button> */}
                <button className="primary-button">
                  <Ruler size={16} />
                  <span>تحليل التصميم</span>
                </button>
                <ShareButton />
                <FavoriteButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;