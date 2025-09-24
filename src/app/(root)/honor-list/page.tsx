import React from "react";
import ExpertProfileCard from "@/components/profile/ExpertProfileCard";
import Link from 'next/link';

const page = () => {
  // Sample expert data
  const experts = [
    {
      name: "محمد علي القاسم",
      expertise: "خبير في صناعة النسيج والأقمشة مع تخصص في المعايير الدولية للمقاسات",
      contribution: "ساهم في إدراج معايير المقاسات المصرية للأقمشة والمنسوجات التقليدية وطور أدلة القياس الدقيق",
      rating: 4,
      profileImage: "/placeholders/pro1.png",
      countryFlag: "/placeholders/cat1.jpg"
    },
    {
      name: "فاطمة أحمد السعيد",
      expertise: "خبيرة في تصميم الأزياء التقليدية مع خبرة واسعة في المقاسات النسائية",
      contribution: "طورت نظام مقاسات شامل للملابس النسائية التقليدية وشاركت في وضع المعايير المحلية",
      rating: 5,
      profileImage: "/placeholders/pro2.jpg",
      countryFlag: "/placeholders/cat2.jpg"
    },
    {
      name: "عبدالرحمن محمد العتيبي",
      expertise: "خبير في صناعة الأحذية والجلود مع تخصص في المقاسات الرجالية",
      contribution: "ساهم في تطوير معايير مقاسات الأحذية التقليدية والحديثة مع التركيز على الراحة والجودة",
      rating: 4,
      profileImage: "/placeholders/pro3.jpg",
      countryFlag: "/placeholders/cat3.jpg"
    },
    {
      name: "فاطمة أحمد السعيد",
      expertise: "خبيرة في تصميم الأزياء التقليدية مع خبرة واسعة في المقاسات النسائية",
      contribution: "طورت نظام مقاسات شامل للملابس النسائية التقليدية وشاركت في وضع المعايير المحلية",
      rating: 5,
      profileImage: "/placeholders/pro2.jpg",
      countryFlag: "/placeholders/cat2.jpg"
    },
    {
      name: "عبدالرحمن محمد العتيبي",
      expertise: "خبير في صناعة الأحذية والجلود مع تخصص في المقاسات الرجالية",
      contribution: "ساهم في تطوير معايير مقاسات الأحذية التقليدية والحديثة مع التركيز على الراحة والجودة",
      rating: 4,
      profileImage: "/placeholders/pro3.jpg",
      countryFlag: "/placeholders/cat3.jpg"
    },
    {
      name: "فاطمة أحمد السعيد",
      expertise: "خبيرة في تصميم الأزياء التقليدية مع خبرة واسعة في المقاسات النسائية",
      contribution: "طورت نظام مقاسات شامل للملابس النسائية التقليدية وشاركت في وضع المعايير المحلية",
      rating: 5,
      profileImage: "/placeholders/pro2.jpg",
      countryFlag: "/placeholders/cat2.jpg"
    },
    {
      name: "عبدالرحمن محمد العتيبي",
      expertise: "خبير في صناعة الأحذية والجلود مع تخصص في المقاسات الرجالية",
      contribution: "ساهم في تطوير معايير مقاسات الأحذية التقليدية والحديثة مع التركيز على الراحة والجودة",
      rating: 4,
      profileImage: "/placeholders/pro3.jpg",
      countryFlag: "/placeholders/cat3.jpg"
    }
  ];
  return (
    <>
    <section id="honor-list-intro">
      <div
      className="flex flex-col items-center justify-center text-center h-screen"
      style={{
        backgroundImage: `
          linear-gradient(178.45deg, rgba(139, 69, 199, 0.5) 1.32%, rgba(91, 33, 182, 0.5) 98.68%),
            url('/images/honor-list-bg.jpg')
          `,
      }}
      >
      <h1 className="font-bold mb-4 text-white">القائمة الشرفية</h1>
      <p className="text-2xl text-cstm-gray max-w-2xl mb-8 text-white">
        نكرّم هنا الخبراء الذين كان لهم دور كبير في تطوير منصة مقدار، وساهموا
        بخبرتهم في إدخال المقاسات المحلية للمنتجات في دولهم{" "}
      </p>
      </div>
    </section>

    <section id="honot-list" className="pt-20">
      <h3 className="text-center mb-6">خبراؤنا المكرمون</h3>
      <p className="text-center">تعرف على الخبراء الذين ساهموا في بناء وتطوير منصة مقدار بخبرتهم ومعرفتهم العميقة</p>
      <div className="my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert, index) => (
          <ExpertProfileCard
            key={index}
            name={expert.name}
            expertise={expert.expertise}
            contribution={expert.contribution}
            rating={expert.rating}
            profileImage={expert.profileImage}
            countryFlag={expert.countryFlag}
          />
        ))}
      </div>
    </section>

    {/* Join Expert Team Section */}
    <section className="py-20">
      <div 
        className="p-12 text-center"
        style={{
          background: 'linear-gradient(90deg, #8B45C7 0%, #5B21B6 100%)'
        }}
      >
        <h2 className="text-4xl font-bold text-white mb-6">
          هل تريد الانضمام إلى فريق الخبراء؟
        </h2>
        <p className="text-xl text-white mb-8 max-w-4xl mx-auto leading-relaxed">
          إذا كان لديك خبرة في المقاسات المحلية أو المعايير التجارية في دولتك، نرحب بانضمامك إلى فريقنا
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold border border-white hover:bg-purple-50 transition-colors duration-300 min-w-[200px]">
            تواصل معنا
          </button>
          <Link href="/about" className="bg-transparent text-white px-8 py-4 rounded-xl font-semibold border border-white hover:bg-white hover:text-purple-600 transition-colors duration-300 min-w-[200px]">
            اعرف المزيد
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default page;
