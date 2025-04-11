// "use client";

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// interface Rating {
//   userId: string;
//   rating: number;
//   date: string;
// }

// const ProjectDetail = ({ id }: { id: string }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showSummary, setShowSummary] = useState(false);
//   const [userRating, setUserRating] = useState<number>(0);
//   const [hoveredStar, setHoveredStar] = useState<number>(0);
//   const [hasRated, setHasRated] = useState(false);

//   // This would come from your API/database
//   const project = {
//     id,
//     title: "AI-Powered Healthcare Diagnosis System",
//     description: "An innovative machine learning model that helps diagnose common illnesses using symptom analysis and patient history.",
//     longDescription: `This research project focuses on developing an advanced artificial
//     intelligence system capable of assisting healthcare professionals in diagnosing common
//     illnesses. The system utilizes machine learning algorithms to analyze patient symptoms,
//     medical history, and relevant health data to provide accurate diagnostic suggestions.

//     The project implements state-of-the-art deep learning models and natural language
//     processing techniques to understand and process patient information effectively.`,
//     thumbnail: "/images/projects/healthcare-ai.jpg",
//     category: "Computer Science",
//     university: "MIT",
//     documentationUrl: "/documents/project-documentation.pdf",
//     date: "2024-01-15",
//     likes: 234,
//     views: 1502,
//     tags: ["AI", "Healthcare", "Machine Learning"],
//     teamMembers: [
//       {
//         name: "Sohay Al-Hetar",
//         role: "Team Leader",
//         avatar: "/images/avatars/sohayb.jpg",
//         department: "Computer Science",
//         email: "sohayb.alhetar@gmail.com",
//         linkedin: "https://www.linkedin.com/in/sohayb-alhetar-0000000000/"
//       },
//       {
//         name: "Mohammed Al-Hetar",
//         role: "Research Assistant",
//         avatar: "/images/avatars/mohammed.jpg",
//         department: "Computer Science",
//         email: "mohammed.alhetar@gmail.com",
//         linkedin: "https://www.linkedin.com/in/mohammed-alhetar-0000000000/"
//       },
//       // Add more team members...
//     ],
//     resources: [
//       {
//         type: "pdf",
//         name: "Research Documentation",
//         url: "/papers/healthcare-ai-paper.pdf",
//         size: "2.4 MB"
//       },
//       {
//         type: "github",
//         name: "Source Code",
//         url: "https://github.com/example/healthcare-ai",
//       },
//       // Add more resources...
//     ]
//   };

//   const projectWithRatings = {
//     ...project,
//     ratings: {
//       average: 4.2,
//       count: 28,
//       userRatings: [
//         { userId: "1", rating: 5, date: "2024-01-15" },
//         { userId: "2", rating: 4, date: "2024-01-14" },
//         // Add more ratings...
//       ] as Rating[]
//     }
//   };

//   const handleRating = async (rating: number) => {
//     try {
//       // Here you would make an API call to save the rating
//       // await saveRating(id, rating);
//       setUserRating(rating);
//       setHasRated(true);
//       // You might want to update the average rating here
//     } catch (error) {
//       console.error('Error saving rating:', error);
//     }
//   };

//   // AI Summary Modal
//   const SummaryModal = () => (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-bold">AI Summary</h3>
//           <button
//             onClick={() => setShowSummary(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ✕
//           </button>
//         </div>
//         <div className="prose max-w-none">
//           {/* This would be fetched from your AI service */}
//           <p>
//             This project develops an AI-powered healthcare diagnosis system that utilizes
//             machine learning algorithms to assist medical professionals. Key features include:
//           </p>
//           <ul>
//             <li>Symptom analysis using natural language processing</li>
//             <li>Patient history integration</li>
//             <li>Real-time diagnostic suggestions</li>
//             <li>High accuracy rate in preliminary testing</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );

//   const RatingStars = () => (
//     <div className="flex flex-col items-center space-y-2">
//       <div className="flex items-center space-x-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             onClick={() => handleRating(star)}
//             onMouseEnter={() => setHoveredStar(star)}
//             onMouseLeave={() => setHoveredStar(0)}
//             className="focus:outline-none"
//             disabled={hasRated}
//           >
//             <svg
//               className={`w-8 h-8 transition-colors ${
//                 star <= (hoveredStar || userRating)
//                   ? 'text-yellow-400'
//                   : 'text-gray-300'
//               }`}
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//           </button>
//         ))}
//       </div>
//       <div className="text-sm text-gray-600">
//         {hasRated ? (
//           <span>Thank you for rating!</span>
//         ) : (
//           <span>Click to rate this project</span>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="relative h-[400px]">
//         <Image
//           src={project.thumbnail}
//           alt={project.title}
//           fill
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
//         <div className="absolute inset-0 flex items-end">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
//             <div className="max-w-3xl">
//               <div className="flex items-center gap-2 mb-4">
//                 <Link
//                   href={`/categories/${project.category.toLowerCase()}`}
//                   className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium"
//                 >
//                   {project.category}
//                 </Link>
//                 <span className="text-white/80">•</span>
//                 <span className="text-white/80">{new Date(project.date).toLocaleDateString()}</span>
//               </div>
//               <h1 className="text-4xl font-bold text-white mb-4">
//                 {project.title}
//               </h1>
//               <p className="text-xl text-white/90">
//                 {project.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2">
//             {/* AI Summary Button */}
//             <button
//               onClick={() => setShowSummary(true)}
//               className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2"
//             >
//               <span>✨ Generate AI Summary</span>
//             </button>

//             {/* Tabs */}
//             <div className="flex space-x-8 mb-8 border-b">
//               {['overview', 'resources', 'discussion'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`pb-4 text-sm font-medium capitalize transition-all border-b-2 ${
//                     activeTab === tab
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content */}
//             {activeTab === 'overview' && (
//               <div className="prose max-w-none">
//                 <p className="whitespace-pre-line">
//                   {project.longDescription}
//                 </p>
                
//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2 my-8">
//                   {project.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Documentation Button */}
//                 <a
//                   href={project.documentationUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
//                 >
//                   <span>📄 Read Documentation</span>
//                 </a>
//               </div>
//             )}

//             {activeTab === 'resources' && (
//               <div className="space-y-4">
//                 {project.resources.map((resource) => (
//                   <a
//                     key={resource.name}
//                     href={resource.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
//                   >
//                     <div className="flex-1">
//                       <h3 className="font-medium text-gray-900">{resource.name}</h3>
//                       {resource.size && (
//                         <p className="text-sm text-gray-500">{resource.size}</p>
//                       )}
//                     </div>
//                     <span className="text-blue-500">Download →</span>
//                   </a>
//                 ))}
//               </div>
//             )}

//             {activeTab === 'discussion' && (
//               <div className="bg-white rounded-lg p-6">
//                 {/* Add your discussion component here */}
//                 <p className="text-gray-600">Discussion section coming soon...</p>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Team Members */}
//           <div className="space-y-8">
//             <div className="bg-white rounded-xl p-6 shadow-sm">
//               <h3 className="text-lg font-semibold mb-6">Project Team</h3>
//               <div className="space-y-6">
//                 {project.teamMembers.map((member) => (
//                   <div key={member.name} className="border-b last:border-0 pb-6 last:pb-0">
//                     <div className="flex items-center space-x-4 mb-3">
//                       <Image
//                         src={member.avatar}
//                         alt={member.name}
//                         width={60}
//                         height={60}
//                         className="rounded-full"
//                       />
//                       <div>
//                         <h4 className="font-medium">{member.name}</h4>
//                         <p className="text-gray-600">{member.role}</p>
//                         <p className="text-gray-600 text-sm">{member.department}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-4 text-sm">
//                       <a
//                         href={`mailto:${member.email}`}
//                         className="text-blue-500 hover:underline"
//                       >
//                         Email
//                       </a>
//                       <a
//                         href={member.linkedin}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500 hover:underline"
//                       >
//                         LinkedIn
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="bg-white rounded-xl p-6 shadow-sm">
//               <h3 className="text-lg font-semibold mb-4">Evaluation & Stats</h3>
//               <div className="space-y-6">
//                 {/* Rating Component */}
//                 <div className="border-b pb-6">
//                   <div className="flex flex-col items-center">
//                     <div className="text-3xl font-bold text-gray-900 mb-2">
//                       {projectWithRatings.ratings.average.toFixed(1)}
//                     </div>
//                     <div className="flex items-center space-x-1 mb-2">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <svg
//                           key={star}
//                           className={`w-5 h-5 ${
//                             star <= projectWithRatings.ratings.average
//                               ? 'text-yellow-400'
//                               : 'text-gray-300'
//                           }`}
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <div className="text-sm text-gray-500 mb-4">
//                       {projectWithRatings.ratings.count} ratings
//                     </div>
//                     <RatingStars />
//                   </div>
//                 </div>

//                 {/* Existing Stats */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-gray-900">
//                       {project.likes}
//                     </div>
//                     <div className="text-sm text-gray-600">Likes</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-gray-900">
//                       {project.views}
//                     </div>
//                     <div className="text-sm text-gray-600">Views</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* AI Summary Modal */}
//       {showSummary && <SummaryModal />}
//     </div>
//   );
// };

// export default ProjectDetail;

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const ProjectDetail = () => {
  const { id } = useParams(); // Get project ID from URL

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [ratingError, setRatingError] = useState("");
  const [newComment, setNewComment] = useState(""); // Stores comment text
  const [submitting, setSubmitting] = useState(false); // Shows loading state
  const [commentError, setCommentError] = useState(""); // Error handling
  const [editingCommentId, setEditingCommentId] = useState(null); // ID of the comment being edited
  const [editedComment, setEditedComment] = useState(""); // New edited comment text
  const [deletingCommentId, setDeletingCommentId] = useState(null); // ID of the comment being deleted
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [loggedInUser, setLoggedInUser] = useState(null); // Stores logged-in user
  localStorage.setItem(
    "token",
    "1|5nCpv3TGAh1RUkHl6Qv6rXqohAbOgOkgQ6OMsgqR1429c320"
  );
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/project/${id}`);
        if (!response.ok) throw new Error("Failed to fetch project data");
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchUserRating = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/evaluate/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) return; // No existing rating

        const data = await response.json();
        if (data.rating) {
          setUserRating(data.rating); // Set existing rating
          setHasRated(true); // Prevent user from rating again
        }
      } catch (error) {
        console.error("Error fetching user rating:", error);
      }
    };
     const fetchUserData = async () => {
       const token = localStorage.getItem("token");

       if (!token) {
         return; // No user logged in
       }

       try {
         const response = await fetch("http://127.0.0.1:8000/api/users", {
           headers: { Authorization: `Bearer ${token}` },
         });
         
console.log(response);
         if (!response.ok) throw new Error("Failed to fetch user data");
         

         const data = await response.json();
         console.log(data);
         setLoggedInUser(data.name); // Store logged-in user's name
       } catch (error) {
         console.error("Error fetching user data:", error);
       }
     };

    if (id) {
      fetchProject();
      fetchUserRating();
       fetchUserData();
    }
   
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading project...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  }

  if (!project) {
    return (
      <p className="text-center text-gray-500 mt-10">Project not found.</p>
    );
  }
  const handleRating = async (rating) => {
    setRatingError(""); // Clear previous errors
    const token = localStorage.getItem("token");

    if (!token) {
      setRatingError("Authentication required. Please log in.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/evaluate/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating }),
      });

      if (!response.ok) throw new Error("Failed to submit rating");

      setUserRating(rating);
      setHasRated(true); // User cannot rate again
    } catch (error) {
      setRatingError(error.message);
    }
  };
  const handleSubmitComment = async () => {
    setCommentError(""); // Clear previous errors
    const token = localStorage.getItem("token");

    if (!token) {
      setCommentError("Authentication required. Please log in.");
      return;
    }

    if (!newComment.trim()) {
      setCommentError("Comment cannot be empty.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/project/${id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ body: newComment }), // Send comment body
        }
      );

      if (!response.ok) throw new Error("Failed to submit comment");

      const data = await response.json();

      // Update comments list dynamically
      setProject((prevProject) => ({
        ...prevProject,
        comments: [
          ...prevProject.comments,
          { id: Date.now(), body: newComment, user_name: "You" },
        ],
      }));

      setNewComment(""); // Clear input field
    } catch (error) {
      setCommentError(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  const handleEditComment = async (commentId) => {
    setCommentError(""); // Clear errors

    if (!token) {
      setCommentError("Authentication required. Please log in.");
      return;
    }

    if (!editedComment.trim()) {
      setCommentError("Comment cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/comment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ body: editedComment }),
        }
      );

      if (!response.ok) throw new Error("Failed to update comment");

      setProject((prevProject) => ({
        ...prevProject,
        comments: prevProject.comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, body: editedComment }
            : comment
        ),
      }));

      setEditingCommentId(null); // Exit edit mode
      setEditedComment(""); // Clear input
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!token) {
      setCommentError("Authentication required. Please log in.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return; // User cancelled deletion
    }

    setDeletingCommentId(commentId);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete comment");

      setProject((prevProject) => ({
        ...prevProject,
        comments: prevProject.comments.filter(
          (comment) => comment.id !== commentId
        ),
      }));
    } catch (error) {
      setCommentError(error.message);
    } finally {
      setDeletingCommentId(null);
    }
  };
 

  // Fetch user data when the page loads
  // useEffect(() => {
    
  // }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image
          src={project.videoUrl || "/images/default-thumbnail.jpg"}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-white/90">{project.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2">
            {/* Project Year */}
            <h3 className="text-lg font-semibold mb-2">Project Year</h3>
            <p className="text-gray-600 mb-6">{project.projectYear}</p>

            {/* Supervisor */}
            <h3 className="text-lg font-semibold mb-2">Supervisor</h3>
            <p className="text-gray-600 mb-6">{project.supervisorName}</p>

            {/* Documentation */}
            {project.document_path && (
              <div className="mt-6">
                <a
                  href={project.document_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <span>📄 View Project Documentation</span>
                </a>
              </div>
            )}
          </div>

          {/* Right Column - Rating & Students */}
          <div className="space-y-8">
            {/* Ratings Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Project Rating</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {project.average_rating.toFixed(1)}
              </div>
              <div className="flex items-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= project.average_rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Students Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Students</h3>
              {project.students.length > 0 ? (
                project.students.map((student, index) => (
                  <div key={index} className="border-b last:border-0 pb-4 mb-4">
                    <p className="text-gray-900 font-medium">{student.name}</p>
                    <p className="text-gray-600 text-sm">{student.email}</p>
                    <div className="mt-2 flex space-x-4">
                      {student.social_links.map((link, i) => (
                        <a
                          key={i}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm"
                        >
                          Social Link {i + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">
                  No students listed for this project.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="focus:outline-none"
              disabled={hasRated} // Disable button if the user has rated before
            >
              <svg
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredStar || userRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          {" "}
          {ratingError && (
            <p className="text-red-500 text-sm mt-2">{ratingError}</p>
          )}
          {hasRated && (
            <p className="text-green-500 text-sm mt-2">Thank you for rating!</p>
          )}
        </div>
        {/* Comment Input */}
        <div className="bg-white rounded-lg p-6 shadow-md mt-6">
          <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>

          <textarea
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            disabled={submitting} // Disable while submitting
          ></textarea>

          <button
            onClick={handleSubmitComment}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            disabled={submitting} // Disable button while submitting
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>

          {/* Error message if comment fails */}
          {commentError && (
            <p className="text-red-500 text-sm mt-2">{commentError}</p>
          )}
        </div>
        {/* Comments Section */}
        <div className="bg-white rounded-lg p-6 shadow-md mt-12">
          <h3 className="text-lg font-semibold mb-4">Comments</h3>

          {project.comments.length > 0 ? (
            project.comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b last:border-0 pb-4 mb-4"
              >
                {/* If editing, show input field */}
                {editingCommentId === comment.id ? (
                  <div className="flex items-center space-x-2">
                    <textarea
                      className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      rows={2}
                    ></textarea>
                    <button
                      onClick={() => handleEditComment(comment.id)}
                      className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 italic">"{comment.body}"</p>
                    <p className="text-sm text-gray-500 mt-1">
                      - {comment.user_name}
                    </p>

                    {/* Show Edit & Delete only if logged-in user owns the comment */}
                    {loggedInUser === comment.user_name && (
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditedComment(comment.body);
                          }}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-500 hover:underline"
                        >
                          {deletingCommentId === comment.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

