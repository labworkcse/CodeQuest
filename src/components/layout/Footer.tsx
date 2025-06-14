import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: "CODEQUEST",
      links: [
        { label: "Questions", href: "/questions" },
        { label: "Help", href: "/help" },
      ]
    },
    {
      title: "PRODUCTS",
      links: [
        { label: "Teams", href: "#" },
        { label: "Advertising", href: "#" },
        { label: "Collectives", href: "#" },
        { label: "Talent", href: "#" },
      ]
    },
    {
      title: "COMPANY",
      links: [
        { label: "About", href: "/about" },
        { label: "Press", href: "#" },
        { label: "Work Here", href: "#" },
        { label: "Legal", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "Cookie Settings", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ]
    },
    {
      title: "STACK EXCHANGE NETWORK",
      links: [
        { label: "Technology", href: "#" },
        { label: "Culture & recreation", href: "#" },
        { label: "Life & arts", href: "#" },
        { label: "Science", href: "#" },
        { label: "Professional", href: "#" },
        { label: "Business", href: "#" },
        { label: "API", href: "#" },
        { label: "Data", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-gray-800 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1 mb-6 md:mb-0">
            {/* Stack Overflow Logo Placeholder */}
             <svg width="32" height="37" viewBox="0 0 32 37" className="h-8 w-auto text-orange-500 fill-current mb-4">
              <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path>
              <path d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14.9 8.9h-18v4h18v-4Z" fill="#F48024"></path>
            </svg>
          </div>
          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs hover:text-gray-200 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-xs">
          <ul className="flex space-x-4 mb-4 md:mb-0">
            <li><Link href="#" className="hover:text-gray-200">Blog</Link></li>
            <li><Link href="#" className="hover:text-gray-200">Facebook</Link></li>
            <li><Link href="#" className="hover:text-gray-200">Twitter</Link></li>
            <li><Link href="#" className="hover:text-gray-200">LinkedIn</Link></li>
            <li><Link href="#" className="hover:text-gray-200">Instagram</Link></li>
          </ul>
          <p>
            Site design / logo &copy; {currentYear} CodeQuest Inc; user contributions licensed under <Link href="#" className="hover:text-gray-200 underline">CC BY-SA</Link>.
            <span className="mx-1">rev&nbsp;{new Date().toISOString().slice(0,10).replace(/-/g,'')}.{Math.floor(Math.random()*10000)}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
