"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ✅ أيقونات من React Icons
import {
  FaProjectDiagram,
  FaUniversity,
  FaArchive,
  FaLightbulb,
} from "react-icons/fa";

const About = ({ id }: { id?: string }) => {
  const features = [
    {
      title: "عرض مشاريع التخرج",
      description:
        "يمكنك تصفّح وعرض جميع مشاريع التخرج من مختلف الجامعات اليمنية في مكانٍ واحد.",
      icon: <FaProjectDiagram className="text-4xl text-green-500" />,
    },
    {
      title: "تعزيز التواصل الأكاديمي",
      description:
        "نربط الطلاب والمشرفين والجامعات من خلال منصة موحدة تعزز من فرص التعاون.",
      icon: <FaUniversity className="text-4xl text-green-500" />,
    },
    {
      title: "بناء أرشيف معرفي وطني",
      description:
        "نوثّق مشاريع الطلاب لتكوين قاعدة بيانات تعليمية ثرية تدعم البحث والتطوير.",
      icon: <FaArchive className="text-4xl text-green-500" />,
    },
    {
      title: "فرص للابتكار والإلهام",
      description:
        "استلهم من مشاريع الآخرين وابدأ مشوارك نحو فكرة جديدة ذات تأثير حقيقي.",
      icon: <FaLightbulb className="text-4xl text-green-500" />,
    },
  ];

  return (
    <section
      id={id}
      className="py-20 bg-gradient-to-b from-white to-gray-50"
      dir="rtl"
    >
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            SYGH هو مشروع تقني يهدف إلى عرض جميع مشاريع التخرج في جامعات
            الجمهورية اليمنية، عبر منصة موحدة وسهلة الاستخدام. نسعى لتوفير بيئة
            رقمية شاملة تسهّل الوصول إلى المشاريع الأكاديمية، وتدعم التواصل بين
            الطلاب والمشرفين والجامعات، مع بناء أرشيف وطني معرفي يساهم في تطوير
            التعليم والابتكار.
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
              تمكين المعرفة والربط الجامعي
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              نسعى في SYGH إلى تمكين الطلاب من مشاركة إنجازاتهم الأكاديمية،
              وتشجيع تبادل الخبرات بين الجامعات داخل الجمهورية اليمنية وخارجها.
              نوفّر أداة فعالة للعرض، البحث، والتوثيق الأكاديمي، مما يعزز من فرص
              التعاون ويزيد من تأثير مشاريع التخرج.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              المنصة مفتوحة للجميع، وتُمكّنك من تصفح المشاريع بحسب الجامعة،
              التخصص، أو السنة، مما يجعلها مرجعًا أكاديميًا موثوقًا ومصدر إلهام
              للطلبة والباحثين على حد سواء.
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
              <div className="mb-4">{feature.icon}</div>
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
            هل أنت مستعد لاكتشاف مشاريع التخرج في الجامعات اليمنية؟
          </h3>
          <Link href="/projects">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              تصفح المشاريع الآن
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
