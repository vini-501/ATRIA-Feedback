'use client'

import { Card } from '@/components/ui/card'

interface Event {
  siNo: number
  type: string
  title: string
  schedule: string
  resourcePerson: string
  reportLink: string
}

interface EventCardsGridProps {
  events: Event[]
}

export default function EventCardsGrid({ events }: EventCardsGridProps) {
  const typeColorMap: Record<string, string> = {
    'FDP/SDP': 'bg-blue-100 text-blue-800 border-blue-300',
    'Expert Visit': 'bg-purple-100 text-purple-800 border-purple-300',
    'Technical Event': 'bg-green-100 text-green-800 border-green-300',
    'Industrial Visit': 'bg-orange-100 text-orange-800 border-orange-300',
    'Others': 'bg-gray-100 text-gray-800 border-gray-300',
  }

  const getTypeStyles = (type: string) => {
    return typeColorMap[type] || 'bg-indigo-100 text-indigo-800 border-indigo-300'
  }

  const isFlagship = (title: string) => title.toLowerCase().includes('cicada') || title.toLowerCase().includes('tech festival')

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
        {events.map((event) => (
          <Card
            key={event.siNo}
            className={`p-4 sm:p-6 hover:shadow-xl transition-all duration-300 ${
              isFlagship(event.title)
                ? 'border-2 border-primary/50 bg-gradient-to-r from-primary/5 to-transparent'
                : 'border border-gray-200'
            }`}
          >
            <div className="space-y-3">
              {/* Header with SI No, Type, and Flagship Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  {/* SI No Badge */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                    {event.siNo}
                  </div>

                  {/* Type Badge */}
                  <span
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border ${getTypeStyles(
                      event.type
                    )}`}
                  >
                    {event.type}
                  </span>
                </div>

                {/* Flagship Badge */}
                {isFlagship(event.title) && (
                  <div className="px-2 sm:px-3 py-1 bg-primary/20 text-primary text-xs sm:text-sm font-bold rounded-full animate-pulse">
                    ⭐ Flagship
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <h3 className="text-sm sm:text-lg font-bold text-gray-900 leading-snug text-pretty">
                  {event.title}
                </h3>
              </div>

              {/* Schedule and Resource Person */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg">
                {/* Schedule */}
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">📅 Schedule</p>
                  <p className="text-xs sm:text-sm text-gray-800 font-medium">{event.schedule}</p>
                </div>

                {/* Resource Person */}
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">👤 Resource Person</p>
                  <p className="text-xs sm:text-sm text-gray-800 font-medium">{event.resourcePerson}</p>
                </div>
              </div>

              {/* Report Link */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-gray-500">Event #{event.siNo}</div>
                {event.reportLink && event.reportLink !== '#' && (
                  <a
                    href={event.reportLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors"
                  >
                    📄 Report
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
