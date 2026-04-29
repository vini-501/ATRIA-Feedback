'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Event {
  siNo: number
  type: string
  title: string
  schedule: string
  resourcePerson: string
  reportLink: string
}

interface EventsPaginatedProps {
  events: Event[]
  flagship?: {
    title: string
    description: string
  }
}

const getEventTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    'FDP/SDP': 'bg-blue-100 text-blue-800 border-blue-300',
    'Expert Visit': 'bg-purple-100 text-purple-800 border-purple-300',
    'Technical Event': 'bg-green-100 text-green-800 border-green-300',
    'Industrial Visit': 'bg-orange-100 text-orange-800 border-orange-300',
    'Others': 'bg-gray-100 text-gray-800 border-gray-300',
  }
  return colors[type] || 'bg-gray-100 text-gray-800 border-gray-300'
}

export default function EventsPaginated({ events, flagship }: EventsPaginatedProps) {
  const [showMore, setShowMore] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const initialEvents = events.slice(0, 5)
  const nextEvents = events.slice(5, 10)
  const remainingEvents = events.slice(10)

  const displayedEvents = showAll ? events : showMore ? [...initialEvents, ...nextEvents] : initialEvents

  return (
    <div className="w-full space-y-8">
      {/* First 5 Events */}
      <div className="space-y-4">
        {displayedEvents.slice(0, 5).map((event) => (
          <EventCard key={event.siNo} event={event} />
        ))}
      </div>

      {/* View More Button for Next 5 */}
      {!showMore && !showAll && events.length > 5 && (
        <div className="flex justify-center">
          <Button
            onClick={() => setShowMore(true)}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base font-bold rounded-lg"
          >
            View More
          </Button>
        </div>
      )}

      {/* Next 5 Events (if showMore is true) */}
      {showMore && !showAll && (
        <div className="space-y-4 animate-fadeIn">
          {nextEvents.map((event) => (
            <EventCard key={event.siNo} event={event} />
          ))}
        </div>
      )}

      {/* View All Button */}
      {showMore && !showAll && (
        <div className="flex justify-center">
          <Button
            onClick={() => setShowAll(true)}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base font-bold rounded-lg"
          >
            View All
          </Button>
        </div>
      )}

      {/* Remaining Events (if showAll is true) */}
      {showAll && (
        <div className="space-y-4 animate-fadeIn">
          {remainingEvents.map((event) => (
            <EventCard key={event.siNo} event={event} />
          ))}
        </div>
      )}

      {/* Flagship Event Section */}
      {flagship && (
        <div className="mt-12 pt-12 border-t-2 border-primary">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-start gap-3 sm:gap-4 mb-4">
              <div className="text-3xl sm:text-4xl">⭐</div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">Flagship Event: {flagship.title}</h3>
              </div>
            </div>
            <p className="text-sm sm:text-base text-white/95 leading-relaxed">
              {flagship.description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

interface EventCardProps {
  event: Event
}

function EventCard({ event }: EventCardProps) {
  const typeColor = getEventTypeColor(event.type)

  return (
    <Card className="p-3 sm:p-6 border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 bg-white">
      <div className="space-y-3 sm:space-y-4">
        {/* Header with SI No and Type */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs sm:text-sm">
            {event.siNo}
          </div>
          <div className="flex-1">
            <span className={`inline-block px-3 py-1 text-xs sm:text-sm font-bold rounded-full border ${typeColor}`}>
              {event.type}
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
            {event.title}
          </h4>
        </div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded-lg">
          {/* Schedule */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Schedule</p>
            <p className="text-xs sm:text-sm text-gray-800">{event.schedule}</p>
          </div>

          {/* Resource Person */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Resource Person</p>
            <p className="text-xs sm:text-sm text-gray-800">{event.resourcePerson}</p>
          </div>
        </div>

        {/* Report Link */}
        <div>
          {event.reportLink !== '#' ? (
            <Link
              href={event.reportLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <span>📄 View Report</span>
            </Link>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-600 text-xs sm:text-sm font-bold rounded-lg cursor-not-allowed opacity-50">
              <span>📄 Report Not Available</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
