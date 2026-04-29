'use client'

import { Card } from '@/components/ui/card'
import EventsPaginated from './events-paginated'
import HODShowcase from './hod-showcase'

interface Event {
  siNo: number
  type: string
  title: string
  schedule: string
  resourcePerson: string
  reportLink: string
}

interface AboutData {
  title: string
  shortname: string
  introduction: string
  about: string
  bestPractices: string[]
  flagship?: {
    title: string
    description: string
  }
  headOfDepartment: {
    name: string
    title: string
    qualifications: string
    experience: string
    description?: string
    specialization: string
  }
  events: Event[]
}

export default function AboutSection({ data }: { data: AboutData }) {
  return (
    <div className="min-h-screen bg-background py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-primary">{data.title}</h1>
          <p className="text-xs sm:text-lg text-gray-600 italic">{data.introduction}</p>
        </div>

        {/* About Section */}
        <Card className="p-4 sm:p-8 bg-white">
          <h2 className="text-xl sm:text-3xl font-bold text-primary mb-3 sm:mb-6">About the Department</h2>
          <div className="space-y-2 sm:space-y-4 text-gray-700 leading-relaxed text-xs sm:text-base">
            {data.about.split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </Card>

        {/* Best Practices */}
        <div>
          <h2 className="text-xl sm:text-3xl font-bold text-primary mb-4 sm:mb-8">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
            {data.bestPractices.map((practice, idx) => (
              <Card key={idx} className="p-3 sm:p-4">
                <div className="flex gap-2 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-base">
                    ✓
                  </div>
                  <p className="text-xs sm:text-base text-gray-700">{practice}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Events & Activities with Pagination */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">Department Events & Activities</h2>
          <EventsPaginated events={data.events} flagship={data.flagship} />
        </div>

        {/* Head of Department - Premium Showcase */}
        <HODShowcase hod={data.headOfDepartment} />
      </div>
    </div>
  )
}
