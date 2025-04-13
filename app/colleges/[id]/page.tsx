// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";

// const CollegeDepartments = () => {
//   const { id } = useParams();
//   const [departments, setDepartments] = useState([]);
//   const [collegeName, setCollegeName] = useState(""); // NEW
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (id) {
//       const fetchDepartments = async () => {
//         try {
//           const response = await fetch(
//             `http://127.0.0.1:8000/api/college/${id}`
//           );
//           if (!response.ok) throw new Error("Failed to fetch departments");

//           const result = await response.json();
//           setDepartments(result.data || []);
//           setCollegeName(result.college_name || `College #${id}`); // fallback if college_name is not provided
//         } catch (err) {
//           console.error(err);
//           setError("Unable to load departments.");
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchDepartments();
//     }
//   }, [id]);

//   if (loading)
//     return (
//       <p className="text-center text-gray-500 mt-10">Loading departments...</p>
//     );
//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//   if (departments.length === 0)
//     return (
//       <p className="text-center text-gray-500 mt-10">
//         No departments found for this college.
//       </p>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
//           Departments in {collegeName}
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {departments.map((dept) => (
//             <Link
//               key={dept.id}
//               href={`/departments/${dept.id}/projects`}
//               className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-blue-500"
//             >
//               <div className="h-full flex flex-col justify-between">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                     {dept.name}
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     Click to view projects related to this department.
//                   </p>
//                 </div>
//                 <div className="mt-4 text-sm text-blue-600 font-medium hover:underline">
//                   View Projects →
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CollegeDepartments;
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const CollegeDepartments = () => {
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [collegeName, setCollegeName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchDepartments = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/college/${id}`
          );
          if (!response.ok) throw new Error("فشل في جلب الأقسام");

          const result = await response.json();
          setDepartments(result.data || []);
          setCollegeName(result.college_name || `الكلية رقم ${id}`);
        } catch (err) {
          console.error(err);
          setError("تعذر تحميل الأقسام.");
        } finally {
          setLoading(false);
        }
      };

      fetchDepartments();
    }
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10" dir="rtl">
        جاري تحميل الأقسام...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10" dir="rtl">
        {error}
      </p>
    );

  if (departments.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10" dir="rtl">
        لم يتم العثور على أقسام تابعة لهذه الكلية.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          الأقسام في {collegeName}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Link
              key={dept.id}
              href={`/departments/${dept.id}/projects`}
              className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-blue-500 text-right"
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {dept.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    اضغط لعرض المشاريع الخاصة بهذا القسم.
                  </p>
                </div>
                <div className="mt-4 text-sm text-blue-600 font-medium hover:underline">
                  عرض المشاريع ←
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollegeDepartments;
