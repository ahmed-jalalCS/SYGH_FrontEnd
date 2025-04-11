// "use client";

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// const ProjectsPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('newest');

//   const projects = [
//     {
//       id: "1",
//       title: "AI-Powered Healthcare Diagnosis System",
//       description: "An innovative machine learning model that helps diagnose common illnesses using symptom analysis and patient history.",
//       thumbnail: "/images/projects/healthcare-ai.jpg",
//       category: "Computer Science",
//       university: "MIT",
//       author: "John Smith",
//       date: "2024-01-15",
//       likes: 234,
//       views: 1502,
//       tags: ["AI", "Healthcare", "Machine Learning"]
//     },
//     // Add more projects...
//   ];

//   const categories = [
//     "all",
//     "Computer Science",
//     "Engineering",
//     "Medicine",
//     "Business",
//     "Arts",
//     "Science"
//   ];

//   const filteredProjects = projects.filter(project =>
//     project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
//     (selectedCategory === 'all' || project.category === selectedCategory)
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Research Projects
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Explore innovative research projects from students and universities worldwide
//           </p>
//         </div>

//         {/* Search and Filters */}
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           {/* Search */}
//           <div className="md:col-span-2">
//             <input
//               type="text"
//               placeholder="Search projects..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
//             />
//           </div>
//           {/* Sort */}
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white"
//           >
//             <option value="newest">Newest First</option>
//             <option value="popular">Most Popular</option>
//             <option value="views">Most Viewed</option>
//           </select>
//         </div>

//         {/* Categories */}
//         <div className="flex flex-wrap gap-3 mb-12">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
//                 selectedCategory === category
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-white text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               {category === 'all' ? 'All Categories' : category}
//             </button>
//           ))}
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
//                   src={project.thumbnail}
//                   alt={project.title}
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute top-4 right-4">
//                   <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
//                     {project.category}
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
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex items-center justify-between text-sm">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-gray-600">{project.author}</span>
//                     <span className="text-gray-400">•</span>
//                     <span className="text-gray-600">{project.university}</span>
//                   </div>
//                   <div className="flex items-center space-x-4 text-gray-500">
//                     <span>❤️ {project.likes}</span>
//                     <span>👁️ {project.views}</span>
//                   </div>
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

// export default ProjectsPage;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch departments from API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/departments");
        if (!response.ok) throw new Error("Failed to fetch departments");
        const data = await response.json();
        setDepartments(data.data); // Extract department list from API response
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDepartments();
  }, []);

  // Fetch projects based on selected department
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let url = "http://127.0.0.1:8000/api/projects";
        if (selectedDepartmentId !== "all") {
          url = `http://127.0.0.1:8000/api/department/${selectedDepartmentId}`;

        }
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        console.log(data);
        setProjects(selectedDepartmentId === "all" ? data : data.data); // Adjust based on API response structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedDepartmentId]);

  // Filter projects based on search query
  const filteredProjects = projects
    .filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.projectYear) - new Date(a.projectYear);
      } else if (sortBy === "popular") {
        return b.average_rating - a.average_rating;
      }
      return 0;
    });

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading projects...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Research Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore innovative research projects from students and universities
            worldwide
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Departments (Categories) */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => setSelectedDepartmentId("all")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              selectedDepartmentId === "all"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            All Departments
          </button>
          {departments.map((department) => (
            <button
              key={department.id}
              onClick={() => setSelectedDepartmentId(department.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedDepartmentId === department.id
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {department.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              href={`/projects/${index + 1}`}
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 rounded-t-xl overflow-hidden">
                <Image
                  src={project.thumbnail || "/images/default-thumbnail.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedDepartmentId !== "all"
                      ? departments.find(
                          (dept) => dept.id === selectedDepartmentId
                        )?.name
                      : "Uncategorized"}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">
                      Published: {project.projectYear}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-500">
                    <span>⭐ {project.average_rating || 0}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No projects found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
