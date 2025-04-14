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

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/departments");
        if (!response.ok) throw new Error("فشل في جلب الأقسام");
        const data = await response.json();
        setDepartments(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let url = "http://127.0.0.1:8000/api/projects";
        if (selectedDepartmentId !== "all") {
          url = `http://127.0.0.1:8000/api/department/${selectedDepartmentId}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("فشل في جلب المشاريع");
        const data = await response.json();

        setProjects(selectedDepartmentId === "all" ? data : data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedDepartmentId]);

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
      <p className="text-center text-gray-500 mt-10" dir="rtl">
        جاري تحميل المشاريع...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10" dir="rtl">
        خطأ: {error}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            المشاريع البحثية
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            استكشف مشاريع بحثية مبتكرة من طلاب وجامعات حول العالم
          </p>
        </div>

        {/* Search and Filters */}
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
            className="px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white"
          >
            <option value="newest">الأحدث أولاً</option>
            <option value="popular">الأعلى تقييماً</option>
          </select>
        </div>

        {/* Departments Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-start">
          <button
            onClick={() => setSelectedDepartmentId("all")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              selectedDepartmentId === "all"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            جميع الأقسام
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
              href={`/projects/${project.id}`}
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 rounded-t-xl overflow-hidden">
                <Image
  src={project.cover_image || "/images/default-thumbnail.jpg"}
  alt={project.title}
  fill
  className="object-cover"
/>

                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedDepartmentId !== "all"
                      ? departments.find(
                          (dept) => dept.id === selectedDepartmentId
                        )?.name
                      : "بدون تصنيف"}
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
                <div className="flex flex-row-reverse items-center justify-between text-sm">
                  <div className="flex items-center space-x-reverse space-x-2">
                    <span className="text-gray-600">
                      سنة النشر: {project.projectYear}
                    </span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-4 text-gray-500">
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
              لم يتم العثور على مشاريع مطابقة لبحثك.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
