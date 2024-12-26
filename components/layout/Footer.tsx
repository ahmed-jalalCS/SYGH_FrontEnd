import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Categories', href: '/categories' },
      { name: 'Universities', href: '/universities' },
      { name: 'Projects', href: '/projects' },
      { name: 'Research Papers', href: '/papers' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'News', href: '/news' },
      { name: 'Press Kit', href: '/press' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Help Center', href: '/help' },
      { name: 'Guidelines', href: '/guidelines' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Documentation', href: '/docs' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Disclaimer', href: '/disclaimer' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com', icon: '/icons/twitter.svg' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: '/icons/linkedin.svg' },
    { name: 'GitHub', href: 'https://github.com', icon: '/icons/github.svg' },
    { name: 'Instagram', href: 'https://instagram.com', icon: '/icons/instagram.svg' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-white.svg"
                alt="SYGH Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              Connecting students with universities worldwide through innovative project sharing and collaboration.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
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
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Product</h3>
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

          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Company</h3>
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

          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Resources</h3>
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
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-4">Subscribe to our newsletter</h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} SYGH. All rights reserved.
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