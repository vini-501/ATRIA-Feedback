import { Metadata } from 'next'
import GalleryGrid from '@/components/gallery-grid'

export const metadata: Metadata = {
  title: 'ISE - Gallery | ATRIA',
  description: 'Gallery of activities and events from the Information Science and Engineering Department',
}

export default function ISEGalleryPage() {
  // Placeholder images - in production, these would come from a database or uploaded files
  const galleryImages = [
    // Add your actual images here like:
    // { id: '1', src: '/gallery/ise/image1.jpg', alt: 'Event 1', title: 'Annual Symposium' }
  ]

  return (
    <GalleryGrid
      title="ISE Department Gallery"
      description="Explore our department's activities, events, and achievements"
      images={galleryImages}
    />
  )
}
