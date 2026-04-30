'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  
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

  const currentDept = isISE ? departments[0] : isCSEDS ? departments[1] : null;

  return (
    <nav className="bg-white border-b-2 border-primary shadow-md sticky top-0 z-40">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="ATRIA Logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="text-sm sm:text-lg font-bold text-primary hidden sm:inline">ATRIA</span>
          </Link>

          {/* Department Selection Toggle */}
          <div className="flex bg-gray-100 p-0.5 rounded-lg shadow-inner">
            {departments.map((dept) => {
              const isActive = (dept.name === 'ISE' && isISE) || (dept.name === 'CSE(DS)' && isCSEDS);
              const defaultPath = dept.pages.find(p => p.label === 'About')?.path || dept.path;
              
              return (
                <Link
                  key={dept.name}
                  href={defaultPath}
                  className={`px-3 sm:px-5 py-1 sm:py-1.5 text-xs sm:text-sm font-black rounded-md transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                  }`}
                >
                  {dept.name}
                  {isActive && (
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tier 2: Quick Links (Visible when in a department context) */}
      {currentDept && (
        <div className="bg-gray-50/80 backdrop-blur-sm border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center gap-2 sm:gap-6 py-1 sm:py-1.5">
              {currentDept.pages.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className={`px-3 sm:px-5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold rounded-full transition-all duration-300 border ${
                    pathname === page.path
                      ? 'bg-primary border-primary text-white shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                  }`}
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
