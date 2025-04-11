// "use client";

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// const AllUniversities = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState('all');

//   const universities = [
//     {
//       id: 1,
//       name: "Massachusetts Institute of Technology",
//       shortName: "MIT",
//       location: "Cambridge, MA",
//       logo: "/images/universites/MIT-icon.png",
//       coverImage: "/images/universites/MIT.png",
//       projectCount: 234,
//       studentCount: 11523,
//       rating: 4.9,
//       featured: true,
//       slug: "mit",
//       tags: ["Engineering", "Technology", "Research"],
//       region: "North America"
//     },
//     {
//       id: 2,
//       name: "Harvard University",
//       shortName: "Harvard",
//       location: "Cambridge, MA",
//       logo: "/images/universities/harvard.png",
//       coverImage: "/images/universities/harvard-cover.jpg",
//       projectCount: 234,
//       studentCount: 11523,
//       rating: 4.9,
//       featured: true,
//       slug: "harvard",
//       tags: ["Engineering", "Technology", "Research"],
//       region: "Europe"
//     },
//     {
//       id: 3,
//       name: "Stanford University",
//       shortName: "Stanford",
//       location: "Cambridge, MA",
//       logo: "/images/universities/stanford.png",
//       coverImage: "/images/universities/stanford-cover.jpg",
//       projectCount: 234,
//       studentCount: 11523,
//       rating: 4.9,
//       featured: true,
//       slug: "stanford",
//       tags: ["Engineering", "Technology", "Research"]
//     },
//     {
//       id: 4,
//       name: "Princeton University",
//       shortName: "Princeton",
//       location: "Princeton, NJ",
//       logo: "/images/universities/princeton.png",
//       coverImage: "/images/universities/princeton-cover.jpg",
//       projectCount: 234,
//       studentCount: 11523,
//       rating: 4.9,
//       featured: true,
//       slug: "princeton",
//       tags: ["Engineering", "Technology", "Research"]
//     }
//     // ... Add more categories similar to your Categories.tsx
//   ];

//   const filteredUniversities = universities.filter(uni =>
//     uni.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//     (filter === 'all' || uni.region === filter)
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Search */}
//         <div className="mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
//             Universities
//           </h1>
//           <div className="max-w-2xl mx-auto">
//             <input
//               type="text"
//               placeholder="Search universities..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
//             />
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {['all', 'North America', 'Europe', 'Asia', 'Australia'].map((region) => (
//             <button
//               key={region}
//               onClick={() => setFilter(region)}
//               className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
//                 filter === region
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-white text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               {region === 'all' ? 'All Regions' : region}
//             </button>
//           ))}
//         </div>

//         {/* Universities Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredUniversities.map((university) => (
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

//         {/* No Results */}
//         {filteredUniversities.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">
//               No universities found matching your search criteria.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllUniversities;


"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const AllUniversities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/universities"
        );
        setUniversities(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch universities");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filteredUniversities = universities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filter === "all" || uni.address.includes(filter))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Search */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Universities
          </h1>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "North America", "Europe", "Asia", "Australia"].map(
            (region) => (
              <button
                key={region}
                onClick={() => setFilter(region)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === region
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {region === "all" ? "All Regions" : region}
              </button>
            )
          )}
        </div>

        {/* Universities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUniversities.map((university) => (
            <Link
              href={`/universities/${university.id}`}
              key={university.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 rounded-t-xl overflow-hidden">
                {university.image && (
                  <Image
                    src={university.image}
                    alt={university.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <div className="bg-white rounded-lg p-2 shadow-md">
                    {university.image ? (
                      <Image
                        src={university.image}
                        alt={`${university.name} logo`}
                        width={40}
                        height={40}
                        className="w-10 h-10"
                        unoptimized
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {university.name}
                </h3>
                <p className="text-gray-500 mb-4">{university.address}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {university.colleges.map((college) => (
                    <span
                      key={college.id}
                      className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                    >
                      {college.name}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-500">
                    Established:{" "}
                    {new Date(university.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredUniversities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No universities found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUniversities;
