"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Department = {
  id: number;
  name: string;
  college: {
    id: number;
    name: string;
    university: {
      id: number;
      name: string;
    };
  };
};

const chunkArray = (arr: Department[], size: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const Categories = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/departments");
        const result = await response.json();
        setDepartments(result.data);
      } catch (error) {
        console.error("فشل في جلب الأقسام:", error);
      }
    };

    fetchDepartments();
  }, []);

  const colors = [
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600",
    "from-purple-500 to-purple-600",
    "from-pink-500 to-pink-600",
    "from-yellow-500 to-yellow-600",
    "from-red-500 to-red-600",
  ];

  const slides = chunkArray(departments, 9);

  return (
    <section className="py-20 bg-gray-50 relative" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            استعرض الأقسام
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            تصفح جميع الأقسام الأكاديمية التابعة للكليات والجامعات اليمنية بكل
            سهولة
          </p>
        </div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".custom-swiper-next",
              prevEl: ".custom-swiper-prev",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            className="!pb-12"
          >
            {slides.map((group, groupIndex) => (
              <SwiperSlide key={groupIndex}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.map((dept, index) => (
                    <Link
                      href={`/departments/${dept.id}/projects`}
                      key={dept.id}
                      className="block"
                    >
                      <div
                        className={`p-6 rounded-2xl bg-gradient-to-br ${
                          colors[(groupIndex * 9 + index) % colors.length]
                        } text-white hover:scale-[1.02] hover:shadow-xl transition duration-300`}
                      >
                        <div className="text-right">
                          <h3 className="text-2xl font-bold mb-2">
                            {dept.name}
                          </h3>
                          <p className="text-white/90 text-md">
                            <span className="font-semibold">الكلية:</span>{" "}
                            {dept.college.name}
                          </p>
                          <p className="text-white/90 text-md mb-3">
                            <span className="font-semibold">الجامعة:</span>{" "}
                            {dept.college.university.name}
                          </p>
                          <div className="text-sm text-white/80 font-medium">
                            عرض المشاريع ←
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          
          {/* Custom Arrows - with icons */}
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
      </div>
    </section>
  );
};

export default Categories;
