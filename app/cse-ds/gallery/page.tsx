import { Metadata } from 'next'
import GalleryGrid from '@/components/gallery-grid'

export const metadata: Metadata = {
  title: 'CSE(DS) - Gallery | ATRIA',
  description: 'Gallery of activities and events from the Computer Science and Engineering (Data Science) Department',
}

export default function CSEDSGalleryPage() {
  // Placeholder images - in production, these would come from a database or uploaded files
  const galleryImages = [
    { id: '2', src: '/gallery/image2.jpeg', alt: 'Department Activity', title: 'Laboratory Session' },
    { id: '3', src: '/gallery/image3.jpeg', alt: 'Department Activity', title: 'Student Presentation' },
    { id: '4', src: '/gallery/image4.jpeg', alt: 'Department Activity', title: 'Tech Talk' },
    { id: '5', src: '/gallery/image5.jpeg', alt: 'Department Activity', title: 'Workshop' },
    { id: '6', src: '/gallery/image6.jpeg', alt: 'Department Activity', title: 'Seminar' },
    { id: '7', src: '/gallery/image7.png', alt: 'Department Activity', title: 'Group Project' },
    { id: '8', src: '/gallery/image8.jpeg', alt: 'Department Activity', title: 'Innovation Lab' },
    { id: '9', src: '/gallery/image9.jpeg', alt: 'Department Activity', title: 'Guest Lecture' },
    { id: '10', src: '/gallery/image10.jpeg', alt: 'Department Activity', title: 'Hackathon' },
    { id: '11', src: '/gallery/image11.jpeg', alt: 'Department Activity', title: 'Coding Competition' },
    { id: '12', src: '/gallery/image12.jpeg', alt: 'Department Activity', title: 'Project Exhibition' },
    { id: '13', src: '/gallery/image13.jpeg', alt: 'Department Activity', title: 'Industry Visit' },
    { id: '14', src: '/gallery/image14.jpeg', alt: 'Department Activity', title: 'Career Guidance' },
    { id: '15', src: '/gallery/image15.png', alt: 'Department Activity', title: 'Team Building' },
    { id: '16', src: '/gallery/image16.jpeg', alt: 'Department Activity', title: 'Technical Fest' },
    { id: '17', src: '/gallery/image17.jpeg', alt: 'Department Activity', title: 'Robotics Workshop' },
    { id: '18', src: '/gallery/image18.jpeg', alt: 'Department Activity', title: 'AI Symposium' },
    { id: '19', src: '/gallery/image19.jpeg', alt: 'Department Activity', title: 'Cyber Security Meet' },
    { id: '20', src: '/gallery/image20.png', alt: 'Department Activity', title: 'Database Seminar' },
    { id: '21', src: '/gallery/image21.png', alt: 'Department Activity', title: 'Cloud Computing' },
    { id: '22', src: '/gallery/image22.png', alt: 'Department Activity', title: 'IoT Project' },
    { id: '23', src: '/gallery/image23.png', alt: 'Department Activity', title: 'Mobile App Dev' },
    { id: '24', src: '/gallery/image24.png', alt: 'Department Activity', title: 'UI/UX Design' },
    { id: '25', src: '/gallery/image25.png', alt: 'Department Activity', title: 'Open Day' },
    { id: '26', src: '/gallery/image26.jpeg', alt: 'Department Activity', title: 'Cultural Event' },
    { id: '27', src: '/gallery/image27.jpeg', alt: 'Department Activity', title: 'Sports Meet' },
    { id: '28', src: '/gallery/image28.jpeg', alt: 'Department Activity', title: 'Alumni Meet' },
    { id: '29', src: '/gallery/image29.jpeg', alt: 'Department Activity', title: 'Farewell Day' },
    { id: '30', src: '/gallery/image30.jpeg', alt: 'Department Activity', title: 'Welcome Ceremony' },
    { id: '31', src: '/gallery/image31.jpeg', alt: 'Department Activity', title: 'Awards Night' },
    { id: '32', src: '/gallery/image32.jpeg', alt: 'Department Activity', title: 'Convocation' },
    { id: '33', src: '/gallery/image33.jpeg', alt: 'Department Activity', title: 'Placement Drive' },
    { id: '34', src: '/gallery/image34.jpeg', alt: 'Department Activity', title: 'Soft Skills Training' },
    { id: '35', src: '/gallery/image35.jpeg', alt: 'Department Activity', title: 'Library' },
    { id: '36', src: '/gallery/image36.jpeg', alt: 'Department Activity', title: 'Campus Tour' },
    { id: '37', src: '/gallery/image37.jpeg', alt: 'Department Activity', title: 'Expert Talk' },
    { id: '38', src: '/gallery/image38.jpeg', alt: 'Department Activity', title: 'Orientation Program' },
    { id: '39', src: '/gallery/image39.jpeg', alt: 'Department Activity', title: 'Tech Carnival' },
    { id: '40', src: '/gallery/image40.jpeg', alt: 'Department Activity', title: 'Research Lab' },
  ]

  return (
    <GalleryGrid
      title="CSE(DS) Department Gallery"
      description="Explore our data science department's activities, events, and achievements"
      images={galleryImages}
    />
  )
}
