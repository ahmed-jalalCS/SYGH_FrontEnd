// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// const DepartmentProjectsPage = () => {
//   const { id } = useParams();
//   const [projects, setProjects] = useState([]);
//   const [departmentName, setDepartmentName] = useState(""); // NEW
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("newest");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:8000/api/department/${id}`
//         );
//         if (!response.ok)
//           throw new Error("Failed to fetch department projects");

//         const data = await response.json();
//         setProjects(data.data || []);
//         setDepartmentName(data.department_name || `Department #${id}`); // NEW
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, [id]);

//   const filteredProjects = projects
//     .filter((project) =>
//       project.title.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortBy === "newest") {
//         return new Date(b.created_at) - new Date(a.created_at);
//       } else if (sortBy === "popular") {
//         return (b.average_rating || 0) - (a.average_rating || 0);
//       }
//       return 0;
//     });

//   if (loading)
//     return (
//       <p className="text-center text-gray-500 mt-10">Loading projects...</p>
//     );

//   if (error)
//     return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             {departmentName} Projects
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Discover impactful research projects from the {departmentName}{" "}
//             department.
//           </p>
//         </div>

//         {/* Search and Sort */}
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           <div className="md:col-span-2">
//             <input
//               type="text"
//               placeholder="Search projects..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
//             />
//           </div>
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white"
//           >
//             <option value="newest">Newest First</option>
//             <option value="popular">Most Popular</option>
//           </select>
//         </div>

//         {/* Projects Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProjects.map((project) => (
//             <Link
//               href={`/projects/${project.id}`}
//               key={project.id}
//               className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
//             >
//               <div className="relative h-48 rounded-t-xl overflow-hidden">
//                 <Image
//                   src={project.thumbnail || "/images/default-thumbnail.jpg"}
//                   alt={project.title}
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute top-4 right-4">
//                   <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
//                     {departmentName}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {project.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4 line-clamp-2">
//                   {project.description}
//                 </p>
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-600">
//                     {project.created_at
//                       ? new Date(project.created_at).toLocaleDateString()
//                       : "No date"}
//                   </span>
//                   <span className="text-gray-500">
//                     ⭐ {project.average_rating || 0}
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* No Results */}
//         {filteredProjects.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">
//               No projects found matching your search criteria.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DepartmentProjectsPage;
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const DepartmentProjectsPage = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/department/${id}`
        );
        if (!response.ok) throw new Error("فشل في جلب مشاريع القسم");

        const data = await response.json();
        setProjects(data.data || []);
        setDepartmentName(data.department_name || `القسم رقم ${id}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [id]);

  const filteredProjects = projects
    .filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortBy === "popular") {
        return (b.average_rating || 0) - (a.average_rating || 0);
      }
      return 0;
    });

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10" dir="rtl">
        جاري تحميل المشاريع...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10" dir="rtl">
        خطأ: {error}
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            مشاريع قسم {departmentName}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            استعرض مشاريع بحثية مؤثرة من قسم {departmentName}.
          </p>
        </div>

        {/* Search and Sort */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="ابحث عن مشروع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-right"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white text-right"
          >
            <option value="newest">الأحدث أولاً</option>
            <option value="popular">الأعلى تقييماً</option>
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 rounded-t-xl overflow-hidden">
                <Image
                  src={project.thumbnail || "/images/default-thumbnail.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                    {departmentName}
                  </span>
                </div>
              </div>
              <div className="p-6 text-right">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-sm flex-row-reverse">
                  <span className="text-gray-600">
                    {project.created_at
                      ? new Date(project.created_at).toLocaleDateString()
                      : "بدون تاريخ"}
                  </span>
                  <span className="text-gray-500">
                    ⭐ {project.average_rating || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              لم يتم العثور على مشاريع مطابقة لبحثك.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentProjectsPage;
