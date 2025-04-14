"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
 const slides = [
   {
     image: "/images/image1.svg",
     title: "منصة مشاريع التخرج اليمنية",
     description:
       "اكتشف جميع مشاريع التخرج في جامعات الجمهورية اليمنية في مكانٍ واحد. تصفح حسب الجامعة، التخصص، أو السنة.",
     buttonText: "تصفح المشاريع",
     buttonLink: "/projects",
   },
   {
     image: "/images/blog.svg",
     title: "بوابتك للتواصل الأكاديمي",
     description:
       "استعرض معلومات الجامعات، الكليات، والأقسام، وتواصل مع المشرفين والطلاب بسهولة واحترافية.",
     buttonText: "عرض الجامعات",
     buttonLink: "/universities",
   },
   {
     image: "/images/testimonial.svg",
     title: "استكشف التخصصات الأكاديمية",
     description:
       "استعرض المشاريع المصنفة حسب الأقسام والتخصصات، وسهّل على نفسك البحث الأكاديمي أو اختيار فكرة مشروعك القادم.",
     buttonText: "عرض التخصصات",
     buttonLink: "/categories", // أو /departments إذا تحب
   },
 ];


  return (
    <div className="relative h-[80vh] min-h-[600px] max-h-[800px]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-green-500",
          el: ".swiper-pagination",
          bulletClass: "swiper-pagination-bullet !mb-8",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full [&_.swiper-slide]:!z-0 [&_.swiper-slide-active]:!z-10"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Image background */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  dir="rtl"
                  className="text-right text-white max-w-5xl px-6 md:px-8"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fadeIn">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-xl lg:text-2xl mb-8 animate-fadeIn animation-delay-200 max-w-3xl mx-auto leading-relaxed text-gray-200">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.buttonLink}
                    className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 animate-fadeIn animation-delay-400 text-lg"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
