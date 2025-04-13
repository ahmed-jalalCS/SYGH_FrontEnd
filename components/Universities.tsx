// "use client";

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// const Universities = () => {
//   const [activeTab, setActiveTab] = useState('featured');

//   const universities = [
//     {
//       id: 1,
//       name: "Massachusetts Institute of Technology",
//       shortName: "MIT",
//       location: "Cambridge, MA",
//       logo: "/images/universities/mit.png",
//       coverImage: "/images/universities/mit-cover.jpg",
//       projectCount: 234,
//       studentCount: 11523,
//       rating: 4.9,
//       featured: true,
//       slug: "mit",
//       tags: ["Engineering", "Technology", "Research"]
//     },
//     // Add more universities...
//   ];

//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Top Universities
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Connect with leading universities worldwide and explore their innovative research projects
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center mb-12">
//           <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
//             <button
//               onClick={() => setActiveTab('featured')}
//               className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
//                 activeTab === 'featured'
//                   ? 'bg-white shadow-sm text-gray-900'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Featured
//             </button>
//             <button
//               onClick={() => setActiveTab('trending')}
//               className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
//                 activeTab === 'trending'
//                   ? 'bg-white shadow-sm text-gray-900'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Trending
//             </button>
//             <button
//               onClick={() => setActiveTab('new')}
//               className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
//                 activeTab === 'new'
//                   ? 'bg-white shadow-sm text-gray-900'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               New Partners
//             </button>
//           </div>
//         </div>

//         {/* Universities Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {universities.map((university) => (
//             <Link
//               href={`/universities/${university.slug}`}
//               key={university.id}
//               className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
//             >
//               <div className="relative h-48 rounded-t-xl overflow-hidden">
//                 <Image
//                   src={university.coverImage}
//                   alt={university.name}
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute top-4 left-4">
//                   <div className="bg-white rounded-lg p-2 shadow-md">
//                     <Image
//                       src={university.logo}
//                       alt={`${university.name} logo`}
//                       width={40}
//                       height={40}
//                       className="w-10 h-10"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {university.name}
//                 </h3>
//                 <p className="text-gray-500 mb-4">
//                   {university.location}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {university.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex items-center justify-between text-sm">
//                   <div className="flex items-center space-x-4">
//                     <span className="text-gray-500">
//                       {university.projectCount} Projects
//                     </span>
//                     <span className="text-gray-500">
//                       {university.studentCount.toLocaleString()} Students
//                     </span>
//                   </div>
//                   <div className="flex items-center text-yellow-500">
//                     ★ {university.rating}
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* View All Button */}
//         <div className="text-center mt-12">
//           <Link
//             href="/universities"
//             className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 hover:scale-105"
//           >
//             <span>View All Universities</span>
//             <span className="text-xl">→</span>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Universities; 
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Universities = () => {
  const [activeTab, setActiveTab] = useState("featured");

  const universities = [
    {
      id: 1,
      name: "معهد ماساتشوستس للتكنولوجيا",
      shortName: "MIT",
      location: "كامبريدج، ماساتشوستس",
      logo: "/images/universities/mit.png",
      coverImage: "/images/universities/mit-cover.jpg",
      projectCount: 234,
      studentCount: 11523,
      rating: 4.9,
      featured: true,
      slug: "mit",
      tags: ["هندسة", "تكنولوجيا", "بحث علمي"],
    },
    // يمكن إضافة المزيد من الجامعات هنا...
  ];

  return (
    <section className="py-20 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            أفضل الجامعات
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تواصل مع الجامعات الرائدة حول العالم واستكشف مشاريعها البحثية
            المبتكرة
          </p>
        </div>

        {/* التبويبات */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "featured"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              مميزة
            </button>
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "trending"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              الأكثر شهرة
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "new"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              شركاؤنا الجدد
            </button>
          </div>
        </div>

        {/* شبكة الجامعات */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((university) => (
            <Link
              href={`/universities/${university.slug}`}
              key={university.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 rounded-t-xl overflow-hidden">
                <Image
                  src={university.coverImage}
                  alt={university.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white rounded-lg p-2 shadow-md">
                    <Image
                      src={university.logo}
                      alt={`${university.name} logo`}
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 text-right">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {university.name}
                </h3>
                <p className="text-gray-500 mb-4">{university.location}</p>
                <div className="flex flex-wrap gap-2 mb-4 justify-end">
                  {university.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm flex-row-reverse">
                  <div className="flex items-center space-x-reverse space-x-4">
                    <span className="text-gray-500">
                      {university.projectCount} مشروع
                    </span>
                    <span className="text-gray-500">
                      {university.studentCount.toLocaleString()} طالب
                    </span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    ★ {university.rating}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* زر عرض الكل */}
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
