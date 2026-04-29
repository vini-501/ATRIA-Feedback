'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface HODData {
  name: string;
  title: string;
  qualifications: string;
  experience: string;
  description?: string;
  specialization: string;
}

interface HODShowcaseProps {
  hod: HODData;
}

export default function HODShowcase({ hod }: HODShowcaseProps) {
  return (
    <section className="relative py-8 sm:py-16 px-3 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-2 sm:mb-4">
            Head of Department
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-primary mx-auto" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-start">
          {/* Left Column - Name and Photo */}
          <div className="space-y-6 sm:space-y-8">
            {/* Name */}
            <div>
              <p className="text-xs sm:text-sm text-primary font-bold uppercase tracking-widest mb-2">
                Distinguished Faculty
              </p>
              <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
                {hod.name}
              </h3>
              <p className="text-lg sm:text-2xl text-primary font-semibold">
                {hod.title}
              </p>
            </div>

            {/* Photo Section - Premium Frame */}
            <div className="relative group">
            {/* Outer Golden Frame */}
            <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 p-6 sm:p-8 rounded-2xl shadow-2xl">
              {/* Inner White Frame */}
              <div className="bg-white p-2 sm:p-3 rounded-xl">
                {/* Photo Container */}
                <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                  {/* Placeholder for HOD Photo */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-center">
                      <svg
                        className="w-20 h-20 sm:w-32 sm:h-32 text-gray-400 mx-auto mb-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      <p className="text-gray-500 font-semibold text-xs sm:text-sm">
                        Photo Coming Soon
                      </p>
                    </div>
                  </div>

                  {/* Image (when provided) */}
                  {/* 
                  <Image
                    src="/images/hod-photo.jpg"
                    alt={hod.name}
                    fill
                    className="object-cover"
                  />
                  */}
                </div>
              </div>

              {/* Decorative Stars */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full shadow-lg" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full shadow-lg" />

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 sm:px-6 py-2 rounded-full shadow-lg font-semibold text-xs sm:text-sm whitespace-nowrap">
              Visionary Leader
            </div>
            </div>
            {/* Details Cards - Horizontal below photo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
              {/* Qualifications Card */}
              <Card className="p-3 sm:p-4 border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all bg-gradient-to-r from-primary/5 to-transparent flex flex-col items-center text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-sm mb-3">
                  📜
                </div>
                <div className="flex-1">
                  <p className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                    Qualifications
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-800 leading-relaxed font-medium">
                    {hod.qualifications}
                  </p>
                </div>
              </Card>

              {/* Experience Card */}
              <Card className="p-3 sm:p-4 border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all bg-gradient-to-r from-primary/5 to-transparent flex flex-col items-center text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-sm mb-3">
                  🎓
                </div>
                <div className="flex-1">
                  <p className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                    Experience
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-800 leading-relaxed font-medium">
                    {hod.experience}
                  </p>
                </div>
              </Card>

              {/* Specialization Card */}
              <Card className="p-3 sm:p-4 border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all bg-gradient-to-r from-primary/5 to-transparent flex flex-col items-center text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-sm mb-3">
                  ⚡
                </div>
                <div className="flex-1">
                  <p className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                    Research Interests
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-800 leading-relaxed font-medium">
                    {hod.specialization}
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Information Section */}
          <div className="space-y-6 sm:space-y-8">
            {/* Description */}
            {hod.description && (
              <div className="relative">
                <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full" />
                <div className="pl-5">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {hod.description}
                  </p>
                </div>
              </div>
            )}



            {/* Inspirational Quote */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-primary/10 border-l-4 border-primary rounded-lg">
              <p className="text-xs sm:text-sm italic text-gray-700 leading-relaxed">
                "Excellence in education is our commitment. We strive to nurture not just technical experts, but responsible global citizens who contribute meaningfully to society."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
