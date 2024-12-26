"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AllCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id:1,
      title: "Computer Science",
      icon: "/images/cs.png",
      description: "Explore projects in AI, Web Development, Mobile Apps, and more",
      count: 234,
      color: "from-blue-500 to-blue-600",
      slug: "computer-science",
      subcategories: ["Artificial Intelligence", "Web Development", "Mobile Apps", "Cybersecurity"]
    },
    {
      id:2,
      title: "Engineering",
      icon: "/images/categories/engineering.svg",
      description: "Discover mechanical, electrical, and civil engineering projects",
      count: 189,
      color: "from-green-500 to-green-600",
      link: "/categories/engineering"
    },
    {
      id:3,
      title: "Business",
      icon: "/images/categories/business.svg",
      description: "Browse startups, business plans, and market research",
      count: 156,
      color: "from-purple-500 to-purple-600",
      link: "/categories/business"
    },
    {
      id:4,
      title: "Design",
      icon: "/images/categories/design.svg",
      description: "View UX/UI, graphic design, and architectural projects",
      count: 142,
      color: "from-pink-500 to-pink-600",
      link: "/categories/design"
    },
    {
      id:5,
      title: "Science",
      icon: "/images/categories/science.svg",
      description: "Explore research in physics, chemistry, and biology",
      count: 167,
      color: "from-yellow-500 to-yellow-600",
      link: "/categories/science"
    },
    {
      id:6,
      title: "Arts & Humanities",
      icon: "/images/categories/arts.svg",
      description: "Discover projects in literature, history, and visual arts",
      count: 128,
      color: "from-red-500 to-red-600",
      link: "/categories/arts-humanities"
    }
    // ... Add more categories similar to your Categories.tsx
  ];

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Browse through all our project categories and find the perfect match for your interests
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-green-500 focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category) => (
            <Link
              href={`/categories/${category.id}`}
              key={category.id}
              className="group"
            >
              <div className={`
                h-full p-8 rounded-2xl transition-all duration-300
                bg-gradient-to-br ${category.color}
                transform hover:scale-105 hover:shadow-xl
              `}>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Image
                      src={category.icon}
                      alt={category.title}
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-white/90 mb-4">
                      {category.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">
                          {category.count} Projects
                        </span>
                        <span className="text-white group-hover:translate-x-2 transition-transform duration-300">
                          →
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories?.map((sub) => (
                          <span
                            key={sub}
                            className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
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

export default AllCategories; 