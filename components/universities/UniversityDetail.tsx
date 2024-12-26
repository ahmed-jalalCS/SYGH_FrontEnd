"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const UniversityDetail = ({ slug }: { slug: string }) => {
  const [activeTab, setActiveTab] = useState('projects');

  // This would come from your API
  const university = {
    name: "Massachusetts Institute of Technology",
    shortName: "MIT",
    location: "Cambridge, MA",
    logo: "/images/universities/mit.png",
    coverImage: "/images/universities/mit-cover.jpg",
    description: "MIT is a world-renowned science and technology research university...",
    stats: {
      founded: 1861,
      students: 11523,
      projects: 234,
      publications: 1523,
      rating: 4.9
    },
    departments: [
      "Computer Science",
      "Mechanical Engineering",
      "Electrical Engineering",
      "Physics",
      "Mathematics"
    ],
    projects: [
      // Project items
    ],
    researchers: [
      // Researcher profiles
    ],
    publications: [
      // Publications
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image
          src={university.coverImage}
          alt={university.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center space-x-6">
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <Image
                  src={university.logo}
                  alt={`${university.name} logo`}
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {university.name}
                </h1>
                <p className="text-xl text-white/90">
                  {university.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">University Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Founded</span>
                  <span className="font-medium">{university.stats.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium">{university.stats.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-medium">{university.stats.projects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Publications</span>
                  <span className="font-medium">{university.stats.publications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium text-yellow-500">★ {university.stats.rating}</span>
                </div>
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Departments</h3>
              <div className="space-y-2">
                {university.departments.map((dept) => (
                  <div
                    key={dept}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <span>•</span>
                    <span>{dept}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex space-x-4 mb-8 border-b">
              {['projects', 'researchers', 'publications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-all border-b-2 ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Add content based on activeTab */}
              {/* This would be populated with actual data from your API */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail; 