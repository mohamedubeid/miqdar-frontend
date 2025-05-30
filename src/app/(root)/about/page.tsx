import { CheckCheck, Headset, Lightbulb, User, UserPlus } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const page = () => {
  return (
    <div>
      <section id="about-header-section" className="h-[87vh] bg-cover bg-center bg-no-repeat"   style={{
        backgroundImage: `
          linear-gradient(270deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(0, 0, 0, 0) 100%),
          url('/images/about-img.jpg')
        `
      }}>
        <div className="container mx-auto px-4 pt-16">
          <div className="max-w-[623px]">
            <h1>عن مقدار</h1>
            <p className="mt-6">نحن نجمع بين الذكاء الاصطناعي والخبرة في التصميم لتوفير قياسات دقيقة تمكّن المصممين من تحقيق الدقة في عملهم. </p>
          </div>
        </div>
      </section>
      <section id="about-us-section" className="max-w-[706px] mx-auto mt-18">
        <h3 className="text-center">نبذة عنا</h3>
        <p className="mt-6 leading-8 text-[18px]">تأسست مقدار في عام 2025 على يد مجموعة من المهندسين والمصممين الذين واجهوا تحديات في الحصول على قياسات دقيقة للمنتجات أثناء عملية التصميم. لاحظنا أن المصممين يقضون وقتًا طويلاً في البحث عن قياسات المنتجات المرجعية، مما يؤدي إلى تأخير المشاريع وزيادة التكاليف. </p>
        <p className="mt-12 leading-8 text-[18px]"> بدأنا بفكرة بسيطة: إنشاء منصة تجمع بين الذكاء الاصطناعي وخبرة التصميم لتوفير قياسات دقيقة وسهلة الوصول. اليوم، أصبحت مقدار منصة رائدة تخدم آلاف المصممين والمهندسين في جميع أنحاء العالم، موفرة لهم الوقت والجهد وتمكينهم من التركيز على الإبداع. </p>
      </section>
      <section className="container mx-auto px-4 mt-18">
        <h3 className="text-center">قيمنا</h3>
        <div className="flex flex-col md:flex-row items-center justify-around gap-y-6 mt-6">
          <div className="flex flex-col items-center justify-center max-w-[240px] w-full gap-y-4 border border-[#F3F4F6] rounded-[16px] p-6">
            <div className="p-6 bg-primary-100 rounded-full">
              <User className="text-primary" />
            </div>
              <h6>التعاون</h6>
              <p>نلتزم بتوفير قياسات دقيقة يمكن الاعتماد عليها في كل مشروع. </p>
          </div>
          <div className="flex flex-col items-center justify-center max-w-[240px] w-full gap-y-4 border border-[#F3F4F6] rounded-[16px] p-6">
            <div className="p-6 bg-primary-100 rounded-full">
              <Lightbulb className="text-primary" />
            </div>
              <h6>الابتكار</h6>
              <p>نلتزم بتوفير قياسات دقيقة يمكن الاعتماد عليها في كل مشروع. </p>
          </div>
          <div className="flex flex-col items-center justify-center max-w-[240px] w-full gap-y-4 border border-[#F3F4F6] rounded-[16px] p-6">
            <div className="p-6 bg-primary-100 rounded-full">
              <CheckCheck className="text-primary" />
            </div>
              <h6>الدقة</h6>
              <p>نلتزم بتوفير قياسات دقيقة يمكن الاعتماد عليها في كل مشروع. </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 mt-18">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex flex-col gap-y-4">
            <h4>رؤيتنا ورسالتنا</h4>
            <div className="p-6 rounded-[16px] bg-primary-50">
              <h5 className="text-primary">رؤيتنا</h5>
              <p className="mt-4 text-secondary">أن نكون المرجع العالمي الأول للقياسات الدقيقة في مجال التصميم، ممكّنين المصممين من تحقيق الدقة والإبداع في أعمالهم. </p>
            </div>
            <div className="p-6 rounded-[16px] bg-primary-50">
              <h5 className="text-primary">رسالتنا</h5>
              <p className="mt-4 text-secondary">توفير حلول قياس ذكية ودقيقة تمكّن المصممين والمهندسين من توفير الوقت والجهد وتحقيق نتائج أفضل في مشاريعهم. </p>
            </div>
          </div>
          <div>
            <Image src="/images/our-vision.jpg" alt="our vision" width={600} height={400} className="rounded-[16px]" />
          </div>
        </div>
      </section>
      <section className="bg-primary-50 py-16 mt-18">
        <div className="w-full max-w-[768px] mx-auto">
          <h3 className="text-center mb-6">انضم إلى مجتمع مقدار</h3>
          <p>كن جزءاً من مجتمع المصممين والمهندسين الذين يستفيدون من حلول القياس الدقيقة لتحسين مشاريعهم وتوفير الوقت والجهد. </p>
          <div className="flex items-center justify-center flex-wrap gap-4 mt-6">
            <button className="primary-button"> <UserPlus size={16} /> <span>انشاء حساب</span> </button>
            <button className="secondary-button"> <Headset size={16} /> <span>تواصل معنا</span> </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page;