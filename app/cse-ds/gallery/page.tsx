import { Metadata } from 'next'
import GalleryGrid from '@/components/gallery-grid'

export const metadata: Metadata = {
  title: 'CSE(DS) - Gallery | ATRIA',
  description: 'Gallery of activities and events from the Computer Science and Engineering (Data Science) Department',
}

export default function CSEDSGalleryPage() {
  // Placeholder images - in production, these would come from a database or uploaded files
  const galleryImages = [
    // Add your actual images here like:
    // { id: '1', src: '/gallery/cse-ds/image1.jpg', alt: 'Event 1', title: 'Hackathon 2024' }
  ]

  return (
    <GalleryGrid
      title="CSE(DS) Department Gallery"
      description="Explore our data science department's activities, events, and achievements"
      images={galleryImages}
    />
  )
}
