import Link from "next/link";
import Image from "next/image";

const Footer = ({ id }: { id?: string }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "الميزات", href: "/features" },
      { name: "الفئات", href: "/categories" },
      { name: "الجامعات", href: "/universities" },
      { name: "المشاريع", href: "/projects" },
      { name: "أوراق بحثية", href: "/papers" },
    ],
    company: [
      { name: "من نحن", href: "/about" },
      { name: "الوظائف", href: "/careers" },
      { name: "الأخبار", href: "/news" },
      { name: "حقيبة الإعلام", href: "/press" },
      { name: "اتصل بنا", href: "/contact" },
    ],
    resources: [
      { name: "المدونة", href: "/blog" },
      { name: "مركز المساعدة", href: "/help" },
      { name: "الإرشادات", href: "/guidelines" },
      { name: "الأسئلة الشائعة", href: "/faqs" },
      { name: "التوثيق", href: "/docs" },
    ],
    legal: [
      { name: "سياسة الخصوصية", href: "/privacy" },
      { name: "شروط الاستخدام", href: "/terms" },
      { name: "سياسة الكوكيز", href: "/cookies" },
      { name: "إخلاء المسؤولية", href: "/disclaimer" },
    ],
  };

  const socialLinks = [
    { name: "تويتر", href: "https://twitter.com", icon: "/icons/twitter.svg" },
    {
      name: "لينكدإن",
      href: "https://linkedin.com",
      icon: "/icons/linkedin.svg",
    },
    { name: "جيت هب", href: "https://github.com", icon: "/icons/github.svg" },
    {
      name: "إنستغرام",
      href: "https://instagram.com",
      icon: "/icons/instagram.svg",
    },
  ];

  return (
    <footer id={id} className="bg-gray-900 text-gray-300" dir="rtl">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 text-right">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-white.svg"
                alt="شعار SYGH"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              نربط الطلاب بالجامعات حول العالم من خلال مشاركة المشاريع المبتكرة
              والتعاون الأكاديمي.
            </p>
            {/* Social Links */}
            <div className="flex space-x-reverse space-x-4 mt-6 justify-end">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="col-span-1 text-right">
            <h3 className="text-white font-semibold mb-4">المنتج</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 text-right">
            <h3 className="text-white font-semibold mb-4">الشركة</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 text-right">
            <h3 className="text-white font-semibold mb-4">المصادر</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 pt-8 mt-12 text-right">
          <div className="max-w-md ml-auto">
            <h3 className="text-white font-semibold mb-4">
              اشترك في النشرة البريدية
            </h3>
            <form className="flex gap-2 flex-row-reverse">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                اشترك
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-right">
          <div className="flex flex-col md:flex-row-reverse justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} SYGH. جميع الحقوق محفوظة.
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
