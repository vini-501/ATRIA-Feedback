import { Metadata } from 'next'
import AboutSection from '@/components/about-section'
import { iseAboutData } from '@/lib/about-data'

export const metadata: Metadata = {
  title: 'ISE - About | ATRIA',
  description: 'Learn about the Information Science and Engineering Department',
}

export default function ISEAboutPage() {
  return <AboutSection data={iseAboutData} />
}
