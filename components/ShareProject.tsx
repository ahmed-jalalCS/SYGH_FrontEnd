import Link from "next/link";

export default function ShareProject() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Share Your Academic Project
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Are you a student with a completed project? Share it with the academic community after verifying your credentials.
          </p>
          <Link
            href="/student-verification"
            className="group inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Upload Your Project
            <svg 
              className="ml-2 -mr-1 w-5 h-5 transition-transform duration-200 ease-in-out transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 