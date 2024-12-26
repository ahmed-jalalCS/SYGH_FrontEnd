"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  university: string;
  thumbnail: string;
  date: string;
  likes: number;
  views: number;
}

const CategoryDetail = ({ slug }: { slug: string }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // This would come from your API/database
  const category = {
    title: "Computer Science",
    description: "Explore innovative computer science projects from students worldwide",
    icon: "/images/categories/cs.svg",
    color: "from-blue-500 to-blue-600",
    subcategories: ["AI", "Web Development", "Mobile Apps", "Cybersecurity"]
  };

  const projects: Project[] = [
    {
      id: "1",
      title: "AI-Powered Healthcare Assistant",
      description: "A machine learning model that helps diagnose common illnesses",
      author: "John Doe",
      university: "MIT",
      thumbnail: "/images/projects/project1.jpg",
      date: "2024-01-15",
      likes: 156,
      views: 1234
    },
    // Add more projects...
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className={`bg-gradient-to-r ${category.color} rounded-2xl p-8 mb-12`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-white/20 p-3 rounded-lg">
              <Image
                src={category.icon}
                alt={category.title}
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {category.title}
              </h1>
              <p className="text-white/90 mt-2">
                {category.description}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setFilter(sub)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${filter === sub 
                    ? 'bg-white text-blue-600' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
          <p className="text-gray-600">
            Showing {projects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <span>{project.author}</span>
                    <span>•</span>
                    <span>{project.university}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>❤️ {project.likes}</span>
                    <span>👁️ {project.views}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail; 