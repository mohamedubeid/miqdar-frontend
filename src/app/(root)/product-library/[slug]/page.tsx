import EmblaCarousel from '@/components/design-analysis/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = {
  dragFree: false,
  // direction: 'rtl',
  loop: false
}

const IMAGES = ["/placeholders/pro1.png", "/placeholders/pro2.jpg", "/placeholders/pro3.jpg", "/placeholders/pro1.png", "/placeholders/pro2.jpg"]


const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = await params
  console.log('slug: ', slug)
  return (
    <div className="bg-[#F9FAFB] px-2 py-19">
      <div className="container mx-auto p-6 bg-white rounded-[16px]">

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h3>طاولة قهوة خشبية</h3>
            <p className="text-cstm-gray">Wooden Coffee Table</p>
          </div>
          <button className="secondary-button">تحميل ملف التصميم</button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-8">

          <div className="flex-1">
            <EmblaCarousel options={OPTIONS} images={IMAGES} />
          </div>

          <div className="flex-1">
            test
          </div>

        </div>
      </div>
    </div>
  )
}

export default Page;