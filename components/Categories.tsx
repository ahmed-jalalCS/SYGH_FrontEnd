"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Categories = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories = [
    {
      title: "Computer Science",
      icon: "/images/categories/cs.svg",
      description: "Explore projects in AI, Web Development, Mobile Apps, and more",
      count: 234,
      color: "from-blue-500 to-blue-600",
      link: "/categories/computer-science"
    },
    {
      title: "Engineering",
      icon: "/images/categories/engineering.svg",
      description: "Discover mechanical, electrical, and civil engineering projects",
      count: 189,
      color: "from-green-500 to-green-600",
      link: "/categories/engineering"
    },
    {
      title: "Business",
      icon: "/images/categories/business.svg",
      description: "Browse startups, business plans, and market research",
      count: 156,
      color: "from-purple-500 to-purple-600",
      link: "/categories/business"
    },
    {
      title: "Design",
      icon: "/images/categories/design.svg",
      description: "View UX/UI, graphic design, and architectural projects",
      count: 142,
      color: "from-pink-500 to-pink-600",
      link: "/categories/design"
    },
    {
      title: "Science",
      icon: "/images/categories/science.svg",
      description: "Explore research in physics, chemistry, and biology",
      count: 167,
      color: "from-yellow-500 to-yellow-600",
      link: "/categories/science"
    },
    {
      title: "Arts & Humanities",
      icon: "/images/categories/arts.svg",
      description: "Discover projects in literature, history, and visual arts",
      count: 128,
      color: "from-red-500 to-red-600",
      link: "/categories/arts-humanities"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover projects across various fields of study and find inspiration for your next innovation
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              href={category.link}
              key={category.title}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`
                h-full p-8 rounded-2xl transition-all duration-300
                bg-gradient-to-br ${category.color}
                transform ${hoveredIndex === index ? 'scale-105' : 'scale-100'}
                hover:shadow-xl
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
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">
                        {category.count} Projects
                      </span>
                      <span className="text-white group-hover:translate-x-2 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link 
            href="/categories"
            className="inline-flex items-center space-x-2 bg-white border-2 border-gray-200 text-gray-800 hover:border-gray-300 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
          >
            <span>View All Categories</span>
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories; 