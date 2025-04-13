// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// const About = () => {
//   const features = [
//     {
//       title: "Student Projects",
//       description: "Showcase your innovative projects and get recognized by universities and industry leaders.",
//       icon: "🎓",
//     },
//     {
//       title: "University Connections",
//       description: "Connect directly with top universities worldwide and explore educational opportunities.",
//       icon: "🌍",
//     },
//     {
//       title: "Global Community",
//       description: "Join a vibrant community of students, educators, and innovators from around the world.",
//       icon: "🤝",
//     },
//     {
//       title: "Knowledge Sharing",
//       description: "Learn from peers, share experiences, and grow together in your academic journey.",
//       icon: "💡",
//     },
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             About <span className="text-green-500">SYGH</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Connecting students with universities worldwide through innovative project sharing and collaboration.
//           </p>
//         </motion.div>

//         {/* Main Content */}
//         <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <Image
//               src="/images/icon.png"
//               alt="About SYGH"
//               width={600}
//               height={500}
//               className="rounded-lg shadow-lg"
//             />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="space-y-6"
//           >
//             <h3 className="text-3xl font-bold text-gray-900">
//               Empowering Student Innovation
//             </h3>
//             <p className="text-lg text-gray-600">
//               SYGH is more than just a platform - it's a global community dedicated to showcasing student talent and fostering connections between ambitious learners and world-class educational institutions.
//             </p>
//             <p className="text-lg text-gray-600">
//               Our mission is to break down barriers between students and universities, creating opportunities for collaboration, learning, and growth.
//             </p>
//           </motion.div>
//         </div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
//             >
//               <div className="text-4xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600">
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Call to Action */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center mt-20"
//         >
//           <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
//             Ready to Join Our Community?
//           </h3>
//           <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
//             Get Started Today
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default About; 
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const features = [
    {
      title: "مشاريع الطلاب",
      description:
        "اعرض مشاريعك الإبداعية واحصل على التقدير من الجامعات وقادة الصناعة.",
      icon: "🎓",
    },
    {
      title: "روابط جامعية",
      description:
        "تواصل مباشرة مع أفضل الجامعات حول العالم واستكشف الفرص التعليمية.",
      icon: "🌍",
    },
    {
      title: "مجتمع عالمي",
      description:
        "انضم إلى مجتمع نشط من الطلاب والمعلمين والمبتكرين من جميع أنحاء العالم.",
      icon: "🤝",
    },
    {
      title: "تبادل المعرفة",
      description: "تعلّم من زملائك، وشارك تجاربك، وتقدّم في رحلتك الأكاديمية.",
      icon: "💡",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            عن <span className="text-green-500">SYGH</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نربط الطلاب بالجامعات حول العالم من خلال مشاركة المشاريع المبتكرة
            والتعاون الأكاديمي.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/icon.png"
              alt="عن SYGH"
              width={600}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-right"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              تمكين الابتكار الطلابي
            </h3>
            <p className="text-lg text-gray-600">
              SYGH ليست مجرد منصة - إنها مجتمع عالمي يهدف إلى عرض مواهب الطلاب
              وربطهم بالمؤسسات التعليمية الرائدة.
            </p>
            <p className="text-lg text-gray-600">
              مهمتنا هي كسر الحواجز بين الطلاب والجامعات، وخلق فرص للتعاون
              والتعليم والنمو.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-right"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            هل أنت مستعد للانضمام إلى مجتمعنا؟
          </h3>
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
            ابدأ الآن
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
