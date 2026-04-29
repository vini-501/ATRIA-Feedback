'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Event {
  siNo: number;
  type: string;
  title: string;
  schedule: string;
  resourcePerson: string;
  reportLink: string;
}

interface EventsCarouselProps {
  events: Event[];
}

export default function EventsCarousel({ events }: EventsCarouselProps) {
  const [autoScroll, setAutoScroll] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Split events into rows of 5
  const eventRows = [];
  for (let i = 0; i < events.length; i += 5) {
    eventRows.push(events.slice(i, i + 5));
  }

  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      const container = document.getElementById('events-scroll-container');
      if (container) {
        // Scroll 2px per interval for smooth animation
        container.scrollLeft += 2;

        // Reset scroll when reaching end
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth - 10
        ) {
          container.scrollLeft = 0;
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [autoScroll]);

  return (
    <div className="w-full">
      <div className="space-y-4 sm:space-y-6">
        {eventRows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="relative"
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
          >
            {/* Scroll Container */}
            <div
              id={rowIdx === 0 ? 'events-scroll-container' : undefined}
              className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scroll-smooth"
              style={{
                scrollBehavior: 'smooth',
                ...(rowIdx === 0 && {
                  id: 'events-scroll-container',
                }),
              }}
            >
              {row.map((event, eventIdx) => (
                <div
                  key={`${rowIdx}-${eventIdx}`}
                  className="flex-shrink-0 w-full sm:w-80"
                >
                  <EventCard event={event} />
                </div>
              ))}
              {/* Duplicate cards for infinite scroll effect */}
              {row.map((event, eventIdx) => (
                <div
                  key={`${rowIdx}-${eventIdx}-dup`}
                  className="flex-shrink-0 w-full sm:w-80"
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>

            {/* Left Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none" />

            {/* Right Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Info Text */}
      <p className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
        Hover to pause • Scroll to browse
      </p>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const isFlagship = event.type === 'Flagship Event';

  return (
    <Card
      className={`h-full p-4 sm:p-6 rounded-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer flex flex-col group overflow-hidden relative ${
        isFlagship
          ? 'bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white border-2 border-yellow-400 shadow-lg'
          : 'bg-white border-2 border-gray-200 hover:border-primary'
      }`}
    >
      {/* SI Number Badge */}
      <div
        className={`inline-block w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mb-3 flex-shrink-0 ${
          isFlagship
            ? 'bg-yellow-300 text-primary'
            : 'bg-primary/10 text-primary'
        }`}
      >
        {event.siNo}
      </div>

      {/* Type Badge */}
      <div className="mb-3 flex-shrink-0">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs sm:text-xs font-semibold ${
            isFlagship
              ? 'bg-yellow-300 text-primary'
              : 'bg-primary/10 text-primary'
          }`}
        >
          {event.type}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`text-sm sm:text-base font-bold mb-3 leading-snug line-clamp-3 ${
          isFlagship ? 'text-white' : 'text-gray-900'
        }`}
      >
        {event.title}
      </h3>

      {/* Divider */}
      <div
        className={`h-1 w-12 mb-3 ${isFlagship ? 'bg-yellow-300' : 'bg-primary'}`}
      />

      {/* Schedule */}
      <div className="mb-3 flex-shrink-0">
        <p className={`text-xs sm:text-xs font-semibold ${isFlagship ? 'text-yellow-200' : 'text-gray-600'} mb-1`}>
          Schedule
        </p>
        <p className={`text-xs sm:text-xs leading-tight ${isFlagship ? 'text-white' : 'text-gray-700'}`}>
          {event.schedule}
        </p>
      </div>

      {/* Resource Person */}
      <div className="mb-4 flex-shrink-0">
        <p className={`text-xs sm:text-xs font-semibold ${isFlagship ? 'text-yellow-200' : 'text-gray-600'} mb-1`}>
          Expert
        </p>
        <p className={`text-xs sm:text-xs leading-tight line-clamp-2 ${isFlagship ? 'text-white' : 'text-gray-700'}`}>
          {event.resourcePerson}
        </p>
      </div>

      {/* Report Link - Spacer for flex */}
      <div className="flex-grow" />

      {/* Report Link */}
      <a
        href={event.reportLink}
        className={`inline-block px-3 py-2 rounded-lg text-xs sm:text-xs font-semibold transition-all ${
          isFlagship
            ? 'bg-yellow-300 text-primary hover:bg-yellow-400'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        View Report →
      </a>

      {/* Shine Effect on Hover */}
      {isFlagship && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      )}
    </Card>
  );
}
