'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isISE = pathname.startsWith('/ise');
  const isCSEDS = pathname.startsWith('/cse-ds');

  const departments = [
    {
      name: 'ISE',
      path: '/ise',
      pages: [
        { label: 'Feedback', path: '/ise/feedback' },
        { label: 'About', path: '/ise/about' },
        { label: 'Gallery', path: '/ise/gallery' },
      ]
    },
    {
      name: 'CSE(DS)',
      path: '/cse-ds',
      pages: [
        { label: 'Feedback', path: '/cse-ds/feedback' },
        { label: 'About', path: '/cse-ds/about' },
        { label: 'Gallery', path: '/cse-ds/gallery' },
      ]
    }
  ];

  return (
    <nav className="bg-white border-b-4 border-primary shadow-lg sticky top-0 z-40">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="ATRIA Logo"
              width={50}
              height={50}
              className="w-10 h-10 sm:w-14 sm:h-14"
            />
            <span className="text-lg sm:text-2xl font-bold text-primary hidden sm:inline">ATRIA</span>
          </Link>

          {/* Department Navigation (Always visible) */}
          <div className="flex gap-1">
            {departments.map((dept) => (
              <div key={dept.name} className="relative group">
                <button
                  onClick={() => setOpenMenu(openMenu === dept.name ? null : dept.name)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold transition-colors flex items-center gap-1 sm:gap-2 rounded-t-lg ${
                    (dept.name === 'ISE' && isISE) || (dept.name === 'CSE(DS)' && isCSEDS)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dept.name}
                  <svg className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${openMenu === dept.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute left-0 mt-0 w-44 sm:w-48 bg-white border border-gray-200 shadow-lg rounded-b-lg overflow-hidden transition-all origin-top ${
                  openMenu === dept.name ? 'block' : 'hidden'
                } group-hover:block`}>
                  {dept.pages.map((page) => (
                    <Link
                      key={page.path}
                      href={page.path}
                      className={`block px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors border-b border-gray-100 last:border-b-0 ${
                        pathname === page.path
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setOpenMenu(null)}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Removed Mobile Menu Button */}
        </div>


      </div>
    </nav>
  );
}
