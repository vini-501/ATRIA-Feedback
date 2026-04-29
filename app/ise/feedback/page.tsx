import { Metadata } from 'next'
import FeedbackForm from '@/components/feedback-form'
import { ISE_FEEDBACK_DATA } from '@/lib/ise-feedback-data'

export const metadata: Metadata = {
  title: 'ISE - Feedback Form | ATRIA',
  description: 'Feedback form for Information Science and Engineering Department',
}

export default function ISEFeedbackPage() {
  return (
    <FeedbackForm
      departmentName={ISE_FEEDBACK_DATA.departmentName}
      heroTitle={ISE_FEEDBACK_DATA.heroTitle}
      heroDescription={ISE_FEEDBACK_DATA.heroDescription}
      sections={ISE_FEEDBACK_DATA.sections}
      department="ise"
    />
  )
}
