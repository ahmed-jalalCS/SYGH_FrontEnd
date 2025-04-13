// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";

// const UniversityColleges = () => {
//   const { slug } = useParams(); // Get university ID from URL parameters
//   const [colleges, setColleges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (slug) {
//       const fetchColleges = async () => {
//         try {
//           const response = await fetch(
//             `http://127.0.0.1:8000/api/university/${slug}`
//           );
//           if (!response.ok) throw new Error("Failed to fetch colleges");
//           const data = await response.json();
//           setColleges(data);
//         } catch (error) {
//           console.error("Error fetching colleges:", error);
//           setError("Failed to load colleges.");
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchColleges();
//     }
//   }, [slug]);

//   if (loading) {
//     return (
//       <p className="text-center text-gray-500 mt-10">Loading colleges...</p>
//     );
//   }

//   if (error) {
//     return <p className="text-center text-red-500 mt-10">{error}</p>;
//   }

//   if (colleges.length === 0) {
//     return (
//       <p className="text-center text-gray-500 mt-10">
//         No colleges found for this university.
//       </p>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
//           University Colleges
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {colleges.map((college) => (
//             <Link
//               key={college.id}
//               href={`/colleges/${college.id}`}
//               className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-blue-500"
//             >
//               <div className="h-full flex flex-col justify-between">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                     {college.name}
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     Click to view departments and projects related to this
//                     college.
//                   </p>
//                 </div>
//                 <div className="mt-4 text-sm text-blue-600 font-medium hover:underline">
//                   View Departments →
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UniversityColleges;
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const UniversityColleges = () => {
  const { slug } = useParams();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug) {
      const fetchColleges = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/university/${slug}`
          );
          if (!response.ok) throw new Error("فشل في جلب الكليات");
          const data = await response.json();
          setColleges(data);
        } catch (error) {
          console.error("خطأ أثناء تحميل الكليات:", error);
          setError("تعذر تحميل الكليات.");
        } finally {
          setLoading(false);
        }
      };

      fetchColleges();
    }
  }, [slug]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10" dir="rtl">
        جاري تحميل الكليات...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10" dir="rtl">
        {error}
      </p>
    );
  }

  if (colleges.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10" dir="rtl">
        لا توجد كليات مرتبطة بهذه الجامعة.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          الكليات التابعة للجامعة
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <Link
              key={college.id}
              href={`/colleges/${college.id}`}
              className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-blue-500 text-right"
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {college.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    اضغط لعرض الأقسام والمشاريع التابعة لهذه الكلية.
                  </p>
                </div>
                <div className="mt-4 text-sm text-blue-600 font-medium hover:underline">
                  عرض الأقسام ←
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityColleges;
