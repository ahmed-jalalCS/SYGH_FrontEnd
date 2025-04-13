// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// const ProjectDetail = () => {
//   const { id } = useParams(); // Get project ID from URL

//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [userRating, setUserRating] = useState(0);
//   const [hoveredStar, setHoveredStar] = useState(0);
//   const [hasRated, setHasRated] = useState(false);
//   const [ratingError, setRatingError] = useState("");
//   const [newComment, setNewComment] = useState(""); // Stores comment text
//   const [submitting, setSubmitting] = useState(false); // Shows loading state
//   const [commentError, setCommentError] = useState(""); // Error handling
//   const [editingCommentId, setEditingCommentId] = useState(null); // ID of the comment being edited
//   const [editedComment, setEditedComment] = useState(""); // New edited comment text
//   const [deletingCommentId, setDeletingCommentId] = useState(null); // ID of the comment being deleted
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   const [loggedInUser, setLoggedInUser] = useState(null); // Stores logged-in user
  
//   useEffect(() => {
//     const fetchProject = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/project/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch project data");
//         const data = await response.json();
//         setProject(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     const fetchUserRating = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         return;
//       }

//       try {
//         const response = await fetch(
//           `http://127.0.0.1:8000/api/evaluate/${id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (!response.ok) return; // No existing rating

//         const data = await response.json();
//         if (data.rating) {
//           setUserRating(data.rating); // Set existing rating
//           setHasRated(true); // Prevent user from rating again
//         }
//       } catch (error) {
//         console.error("Error fetching user rating:", error);
//       }
//     };
//     const fetchUserData = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         return; // No user logged in
//       }

//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
         
//         console.log(response);
//         if (!response.ok) throw new Error("Failed to fetch user data");
         

//         const data = await response.json();
//         console.log(data);
//         setLoggedInUser(data.name); // Store logged-in user's name
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (id) {
//       fetchProject();
//       fetchUserRating();
//       fetchUserData();
//     }
   
//   }, [id]);

//   if (loading) {
//     return (
//       <p className="text-center text-gray-500 mt-10">Loading project...</p>
//     );
//   }

//   if (error) {
//     return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
//   }

//   if (!project) {
//     return (
//       <p className="text-center text-gray-500 mt-10">Project not found.</p>
//     );
//   }
//   const handleRating = async (rating) => {
//     setRatingError(""); // Clear previous errors
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setRatingError("Authentication required. Please log in.");
//       return;
//     }

//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/evaluate/${id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ rating }),
//       });

//       if (!response.ok) throw new Error("Failed to submit rating");

//       setUserRating(rating);
//       setHasRated(true); // User cannot rate again
//     } catch (error) {
//       setRatingError(error.message);
//     }
//   };
//   const handleSubmitComment = async () => {
//     setCommentError(""); // Clear previous errors
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setCommentError("Authentication required. Please log in.");
//       return;
//     }

//     if (!newComment.trim()) {
//       setCommentError("Comment cannot be empty.");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/project/${id}/comment`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ body: newComment }), // Send comment body
//         }
//       );

//       if (!response.ok) throw new Error("Failed to submit comment");

//       const data = await response.json();

//       // Update comments list dynamically
//       setProject((prevProject) => ({
//         ...prevProject,
//         comments: [
//           ...prevProject.comments,
//           { id: Date.now(), body: newComment, user_name: "You" },
//         ],
//       }));

//       setNewComment(""); // Clear input field
//     } catch (error) {
//       setCommentError(error.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };
//   const handleEditComment = async (commentId) => {
//     setCommentError(""); // Clear errors

//     if (!token) {
//       setCommentError("Authentication required. Please log in.");
//       return;
//     }

//     if (!editedComment.trim()) {
//       setCommentError("Comment cannot be empty.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/comment/${commentId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ body: editedComment }),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to update comment");

//       setProject((prevProject) => ({
//         ...prevProject,
//         comments: prevProject.comments.map((comment) =>
//           comment.id === commentId
//             ? { ...comment, body: editedComment }
//             : comment
//         ),
//       }));

//       setEditingCommentId(null); // Exit edit mode
//       setEditedComment(""); // Clear input
//     } catch (error) {
//       setCommentError(error.message);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     if (!token) {
//       setCommentError("Authentication required. Please log in.");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this comment?")) {
//       return; // User cancelled deletion
//     }

//     setDeletingCommentId(commentId);

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/comment/${commentId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to delete comment");

//       setProject((prevProject) => ({
//         ...prevProject,
//         comments: prevProject.comments.filter(
//           (comment) => comment.id !== commentId
//         ),
//       }));
//     } catch (error) {
//       setCommentError(error.message);
//     } finally {
//       setDeletingCommentId(null);
//     }
//   };
 

  // Fetch user data when the page loads
  // useEffect(() => {
    
  // }, []);


  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       {/* Hero Section */}
  //       <div className="relative h-[400px]">
  //         <Image
  //           src={project.videoUrl || "/images/default-thumbnail.jpg"}
  //           alt={project.title}
  //           fill
  //           className="object-cover"
  //         />
  //         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
  //         <div className="absolute inset-0 flex items-end">
  //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
  //             <div className="max-w-3xl">
  //               <h1 className="text-4xl font-bold text-white mb-4">
  //                 {project.title}
  //               </h1>
  //               <p className="text-xl text-white/90">{project.description}</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Main Content */}
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  //         <div className="grid lg:grid-cols-3 gap-12">
  //           {/* Left Column - Project Details */}
  //           <div className="lg:col-span-2">
  //             {/* Project Year */}
  //             <h3 className="text-lg font-semibold mb-2">Project Year</h3>
  //             <p className="text-gray-600 mb-6">{project.projectYear}</p>

  //             {/* Supervisor */}
  //             <h3 className="text-lg font-semibold mb-2">Supervisor</h3>
  //             <p className="text-gray-600 mb-6">{project.supervisorName}</p>

  //             {/* Documentation */}
  //             {project.document_path && (
  //               <div className="mt-6">
  //                 <a
  //                   href={project.document_path}
  //                   target="_blank"
  //                   rel="noopener noreferrer"
  //                   className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
  //                 >
  //                   <span>📄 View Project Documentation</span>
  //                 </a>
  //               </div>
  //             )}
  //           </div>

  //           {/* Right Column - Rating & Students */}
  //           <div className="space-y-8">
  //             {/* Ratings Section */}
  //             <div className="bg-white rounded-xl p-6 shadow-sm">
  //               <h3 className="text-lg font-semibold mb-4">Project Rating</h3>
  //               <div className="text-3xl font-bold text-gray-900 mb-2">
  //                 {project.average_rating.toFixed(1)}
  //               </div>
  //               <div className="flex items-center space-x-1 mb-2">
  //                 {[1, 2, 3, 4, 5].map((star) => (
  //                   <svg
  //                     key={star}
  //                     className={`w-5 h-5 ${
  //                       star <= project.average_rating
  //                         ? "text-yellow-400"
  //                         : "text-gray-300"
  //                     }`}
  //                     fill="currentColor"
  //                     viewBox="0 0 20 20"
  //                   >
  //                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //                   </svg>
  //                 ))}
  //               </div>
  //             </div>

  //             {/* Students Section */}
  //             <div className="bg-white rounded-xl p-6 shadow-sm">
  //               <h3 className="text-lg font-semibold mb-4">Students</h3>
  //               {project.students.length > 0 ? (
  //                 project.students.map((student, index) => (
  //                   <div key={index} className="border-b last:border-0 pb-4 mb-4">
  //                     <p className="text-gray-900 font-medium">{student.name}</p>
  //                     <p className="text-gray-600 text-sm">{student.email}</p>
  //                     <div className="mt-2 flex space-x-4">
  //                       {student.social_links.map((link, i) => (
  //                         <a
  //                           key={i}
  //                           href={link}
  //                           target="_blank"
  //                           rel="noopener noreferrer"
  //                           className="text-blue-500 hover:underline text-sm"
  //                         >
  //                           Social Link {i + 1}
  //                         </a>
  //                       ))}
  //                     </div>
  //                   </div>
  //                 ))
  //               ) : (
  //                 <p className="text-gray-600">
  //                   No students listed for this project.
  //                 </p>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //         <div className="flex justify-center items-center space-x-1 mb-2">
  //           {[1, 2, 3, 4, 5].map((star) => (
  //             <button
  //               key={star}
  //               onClick={() => handleRating(star)}
  //               onMouseEnter={() => setHoveredStar(star)}
  //               onMouseLeave={() => setHoveredStar(0)}
  //               className="focus:outline-none"
  //               disabled={hasRated} // Disable button if the user has rated before
  //             >
  //               <svg
  //                 className={`w-8 h-8 transition-colors ${
  //                   star <= (hoveredStar || userRating)
  //                     ? "text-yellow-400"
  //                     : "text-gray-300"
  //                 }`}
  //                 fill="currentColor"
  //                 viewBox="0 0 20 20"
  //               >
  //                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //               </svg>
  //             </button>
  //           ))}
  //         </div>

  //         <div className="flex justify-center">
  //           {" "}
  //           {ratingError && (
  //             <p className="text-red-500 text-sm mt-2">{ratingError}</p>
  //           )}
  //           {hasRated && (
  //             <p className="text-green-500 text-sm mt-2">Thank you for rating!</p>
  //           )}
  //         </div>
  //         {/* Comment Input */}
  //         <div className="bg-white rounded-lg p-6 shadow-md mt-6">
  //           <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>

  //           <textarea
  //             className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             placeholder="Write your comment..."
  //             value={newComment}
  //             onChange={(e) => setNewComment(e.target.value)}
  //             rows={3}
  //             disabled={submitting} // Disable while submitting
  //           ></textarea>

  //           <button
  //             onClick={handleSubmitComment}
  //             className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
  //             disabled={submitting} // Disable button while submitting
  //           >
  //             {submitting ? "Posting..." : "Post Comment"}
  //           </button>

  //           {/* Error message if comment fails */}
  //           {commentError && (
  //             <p className="text-red-500 text-sm mt-2">{commentError}</p>
  //           )}
  //         </div>
  //         {/* Comments Section */}
  //         <div className="bg-white rounded-lg p-6 shadow-md mt-12">
  //           <h3 className="text-lg font-semibold mb-4">Comments</h3>

  //           {project.comments.length > 0 ? (
  //             project.comments.map((comment) => (
  //               <div
  //                 key={comment.id}
  //                 className="border-b last:border-0 pb-4 mb-4"
  //               >
  //                 {/* If editing, show input field */}
  //                 {editingCommentId === comment.id ? (
  //                   <div className="flex items-center space-x-2">
  //                     <textarea
  //                       className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                       value={editedComment}
  //                       onChange={(e) => setEditedComment(e.target.value)}
  //                       rows={2}
  //                     ></textarea>
  //                     <button
  //                       onClick={() => handleEditComment(comment.id)}
  //                       className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
  //                     >
  //                       Save
  //                     </button>
  //                     <button
  //                       onClick={() => setEditingCommentId(null)}
  //                       className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 transition"
  //                     >
  //                       Cancel
  //                     </button>
  //                   </div>
  //                 ) : (
  //                   <>
  //                     <p className="text-gray-600 italic">"{comment.body}"</p>
  //                     <p className="text-sm text-gray-500 mt-1">
  //                       - {comment.user_name}
  //                     </p>

  //                     {/* Show Edit & Delete only if logged-in user owns the comment */}
  //                     {loggedInUser === comment.user_name && (
  //                       <div className="flex space-x-2 mt-2">
  //                         <button
  //                           onClick={() => {
  //                             setEditingCommentId(comment.id);
  //                             setEditedComment(comment.body);
  //                           }}
  //                           className="text-blue-500 hover:underline"
  //                         >
  //                           Edit
  //                         </button>

  //                         <button
  //                           onClick={() => handleDeleteComment(comment.id)}
  //                           className="text-red-500 hover:underline"
  //                         >
  //                           {deletingCommentId === comment.id
  //                             ? "Deleting..."
  //                             : "Delete"}
  //                         </button>
  //                       </div>
  //                     )}
  //                   </>
  //                 )}
  //               </div>
  //             ))
  //           ) : (
  //             <p className="text-gray-600">
  //               No comments yet. Be the first to comment!
  //             </p>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default ProjectDetail;

  "use client";

  import { useState, useEffect } from "react";
  import { useParams } from "next/navigation";
  import Image from "next/image";
  import Link from "next/link";
import SummaryModal from "../SummaryModal";
  const ProjectDetail = () => {
    const { id } = useParams(); // الحصول على معرف المشروع من الرابط

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userRating, setUserRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [hasRated, setHasRated] = useState(false);
    const [ratingError, setRatingError] = useState("");
    const [newComment, setNewComment] = useState(""); // تخزين نص التعليق
    const [submitting, setSubmitting] = useState(false); // حالة الإرسال
    const [commentError, setCommentError] = useState(""); // التعامل مع الخطأ
    const [editingCommentId, setEditingCommentId] = useState(null); // معرف التعليق الجاري تعديله
    const [editedComment, setEditedComment] = useState(""); // نص التعليق المعدل
    const [deletingCommentId, setDeletingCommentId] = useState(null); // معرف التعليق الجاري حذفه
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const [loggedInUser, setLoggedInUser] = useState(null); // تخزين اسم المستخدم المسجل
   const [projectSummary, setProjectSummary] = useState("");
   const [summaryLoading, setSummaryLoading] = useState(false);
   const [summaryModalOpen, setSummaryModalOpen] = useState(false);

    useEffect(() => {
      const fetchProject = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/project/${id}`
          );
          if (!response.ok) throw new Error("فشل في جلب بيانات المشروع");
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

          if (!response.ok) return; // لا يوجد تقييم سابق

          const data = await response.json();
          if (data.rating) {
            setUserRating(data.rating); // تعيين التقييم السابق
            setHasRated(true); // منع المستخدم من التقييم مرة أخرى
          }
        } catch (error) {
          console.error("خطأ في جلب التقييم:", error);
        }
      };
      const fetchUserData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
          return; // لا يوجد مستخدم مسجل دخول
        }

        try {
          const response = await fetch("http://127.0.0.1:8000/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log(response);
          if (!response.ok) throw new Error("فشل في جلب بيانات المستخدم");

          const data = await response.json();
          console.log(data);
          setLoggedInUser(data.name); // تخزين اسم المستخدم المسجل
        } catch (error) {
          console.error("خطأ في جلب بيانات المستخدم:", error);
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
        <p className="text-center text-gray-500 mt-10">جاري تحميل المشروع...</p>
      );
    }

    if (error) {
      return <p className="text-center text-red-500 mt-10">خطأ: {error}</p>;
    }

    if (!project) {
      return (
        <p className="text-center text-gray-500 mt-10">المشروع غير موجود.</p>
      );
    }
const handleSummarize = async () => {
  setSummaryLoading(true);
  setSummaryModalOpen(true);

  try {
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: project.description }),
    });

    const data = await res.json();
    setProjectSummary(data.summary);
  } catch (error) {
    setProjectSummary("❌ حدث خطأ أثناء التلخيص.");
  } finally {
    setSummaryLoading(false);
  }
};


    const handleRating = async (rating) => {
      setRatingError(""); // مسح الأخطاء السابقة
      const token = localStorage.getItem("token");

      if (!token) {
        setRatingError("التسجيل مطلوب. الرجاء تسجيل الدخول.");
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/evaluate/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ rating }),
          }
        );

        if (!response.ok) throw new Error("فشل في إرسال التقييم");

        setUserRating(rating);
        setHasRated(true); // منع التقييم مرة أخرى
      } catch (error) {
        setRatingError(error.message);
      }
    };

    const handleSubmitComment = async () => {
      setCommentError(""); // مسح الأخطاء السابقة
      const token = localStorage.getItem("token");

      if (!token) {
        setCommentError("التسجيل مطلوب. الرجاء تسجيل الدخول.");
        return;
      }

      if (!newComment.trim()) {
        setCommentError("لا يمكن أن يكون التعليق فارغًا.");
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
            body: JSON.stringify({ body: newComment }), // إرسال نص التعليق
          }
        );

        if (!response.ok) throw new Error("فشل في إرسال التعليق");

        const data = await response.json();

        // تحديث قائمة التعليقات ديناميكيًا
        setProject((prevProject) => ({
          ...prevProject,
          comments: [
            ...prevProject.comments,
            { id: Date.now(), body: newComment, user_name: "أنت" },
          ],
        }));

        setNewComment(""); // تفريغ الحقل
      } catch (error) {
        setCommentError(error.message);
      } finally {
        setSubmitting(false);
      }
    };
    const handleEditComment = async (commentId) => {
      setCommentError(""); // مسح الأخطاء

      if (!token) {
        setCommentError("يجب تسجيل الدخول أولاً.");
        return;
      }

      if (!editedComment.trim()) {
        setCommentError("لا يمكن أن يكون التعليق فارغًا.");
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

        if (!response.ok) throw new Error("فشل في تعديل التعليق");

        setProject((prevProject) => ({
          ...prevProject,
          comments: prevProject.comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, body: editedComment }
              : comment
          ),
        }));

        setEditingCommentId(null); // الخروج من وضع التعديل
        setEditedComment(""); // تفريغ الحقل
      } catch (error) {
        setCommentError(error.message);
      }
    };

    const handleDeleteComment = async (commentId) => {
      if (!token) {
        setCommentError("يجب تسجيل الدخول أولاً.");
        return;
      }

      if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا التعليق؟")) {
        return; // المستخدم ألغى الحذف
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

        if (!response.ok) throw new Error("فشل في حذف التعليق");

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

    return (
      <div className="min-h-screen bg-gray-50">
        {/* قسم الهيدر */}
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

        {/* المحتوى الرئيسي */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* العمود الأيسر - تفاصيل المشروع */}
            <div className="lg:col-span-2">
              <div className="flex justify-start mb-6" dir="rtl">
                {" "}
                <button
                  onClick={() => alert("سيتم عرض  المشروع هنا قريبًا")}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                >
                  📝 عرض المشروع
                </button>
              </div>
              {/* زر ملخص المشروع */}
              <div className="flex justify-start mb-6" dir="rtl">
                {" "}
                <button
                  onClick={handleSummarize}
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                >
                  📝 ملخص المشروع
                </button>
                <SummaryModal
                  isOpen={summaryModalOpen}
                  onClose={() => setSummaryModalOpen(false)}
                  summaryText={projectSummary} // 🔥 text from Gemini API or OpenAI
                  isLoading={summaryLoading}
                />
              </div>

              {/* سنة المشروع */}
              <h3 className="text-lg font-semibold mb-2">سنة المشروع</h3>
              <p className="text-gray-600 mb-6">{project.projectYear}</p>

              {/* المشرف */}
              <h3 className="text-lg font-semibold mb-2">اسم المشرف</h3>
              <p className="text-gray-600 mb-6">{project.supervisorName}</p>

              {/* الوثائق */}
              {project.document_path && (
                <div className="mt-6">
                  <a
                    href={project.document_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <span>📄 عرض توثيق المشروع</span>
                  </a>
                </div>
              )}
            </div>

            {/* العمود الأيمن - التقييم والطلاب */}

            <div className="space-y-8">
              {/* قسم التقييم */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">تقييم المشروع</h3>
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

              {/* قسم الطلاب */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">الطلاب المشاركون</h3>
                {project.students.length > 0 ? (
                  project.students.map((student, index) => (
                    <div
                      key={index}
                      className="border-b last:border-0 pb-4 mb-4"
                    >
                      <p className="text-gray-900 font-medium">
                        {student.name}
                      </p>
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
                            رابط اجتماعي {i + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">لا يوجد طلاب لهذا المشروع.</p>
                )}
              </div>
            </div>
          </div>

          {/* تقييم النجوم */}
          <div className="flex justify-center items-center space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="focus:outline-none"
                disabled={hasRated}
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
            {ratingError && (
              <p className="text-red-500 text-sm mt-2">{ratingError}</p>
            )}
            {hasRated && (
              <p className="text-green-500 text-sm mt-2">شكرًا لتقييمك!</p>
            )}
          </div>

          {/* حقل إضافة تعليق */}
          <div className="bg-white rounded-lg p-6 shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-4">أضف تعليقًا</h3>

            <textarea
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="اكتب تعليقك هنا..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              disabled={submitting}
            ></textarea>

            <button
              onClick={handleSubmitComment}
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? "جاري الإرسال..." : "إرسال التعليق"}
            </button>

            {commentError && (
              <p className="text-red-500 text-sm mt-2">{commentError}</p>
            )}
          </div>

          {/* قسم التعليقات */}
          <div className="bg-white rounded-lg p-6 shadow-md mt-12">
            <h3 className="text-lg font-semibold mb-4">التعليقات</h3>

            {project.comments.length > 0 ? (
              project.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b last:border-0 pb-4 mb-4"
                >
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
                        حفظ
                      </button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 transition"
                      >
                        إلغاء
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-600 italic">"{comment.body}"</p>
                      <p className="text-sm text-gray-500 mt-1">
                        - {comment.user_name}
                      </p>

                      {loggedInUser === comment.user_name && (
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={() => {
                              setEditingCommentId(comment.id);
                              setEditedComment(comment.body);
                            }}
                            className="text-blue-500 hover:underline"
                          >
                            تعديل
                          </button>

                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-500 hover:underline"
                          >
                            {deletingCommentId === comment.id
                              ? "جاري الحذف..."
                              : "حذف"}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                لا توجد تعليقات حتى الآن. كن أول من يعلّق!
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // جلب بيانات المستخدم عند تحميل الصفحة
  // useEffect(() => {

  // }, []);
 
  

export default ProjectDetail;
