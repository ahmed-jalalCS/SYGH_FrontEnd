"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

type College = {
  id: number;
  name: string;
};

type University = {
  id: number;
  name: string;
  address: string;
  image: string | null;
  colleges: College[];
};

const chunkArray = (arr: University[], size: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const Universities = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true); // ⬅️ حالة التحميل

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/universities");
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        console.error("فشل في جلب الجامعات:", error);
      } finally {
        setLoading(false); // ⬅️ إيقاف التحميل بعد الجلب
      }
    };

    fetchUniversities();
  }, []);

  const slides = chunkArray(universities, 9); // 3 صفوف × 3 أعمدة

  if (loading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen bg-gray-50"
        dir="rtl"
      >
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50 relative" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            الجامعات اليمنية
          </h2>
          <p className="text-lg text-gray-600">
            استعرض الجامعات اليمنية والكليات التابعة لها
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".custom-swiper-next",
              prevEl: ".custom-swiper-prev",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="!pb-12"
          >
            {slides.map((group, groupIndex) => (
              <SwiperSlide key={groupIndex}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.map((university) => (
                    <Link
                      key={university.id}
                      href={`/universities/${university.id}`}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 block"
                    >
                      {university.image && (
                        <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={university.image}
                            alt={university.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {university.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 whitespace-pre-line">
                        {university.address}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-end mb-2">
                        {university.colleges.map((college) => (
                          <span
                            key={college.id}
                            className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                          >
                            {college.name}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="custom-swiper-prev hidden md:flex absolute -right-24 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
            <div className="w-12 h-12 bg-gray-800 text-white text-2xl flex items-center justify-center rounded-full hover:bg-gray-700 shadow-lg">
              <FiArrowRight />
            </div>
          </div>

          <div className="custom-swiper-next hidden md:flex absolute -left-24 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
            <div className="w-12 h-12 bg-gray-800 text-white text-2xl flex items-center justify-center rounded-full hover:bg-gray-700 shadow-lg">
              <FiArrowLeft />
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/universities"
            className="inline-flex items-center space-x-reverse space-x-2 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 hover:scale-105"
          >
            <span>عرض جميع الجامعات</span>
            <span className="text-xl">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Universities;
