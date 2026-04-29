import { Metadata } from 'next'
import FeedbackForm from '@/components/feedback-form'
import { CSE_DS_FEEDBACK_DATA } from '@/lib/cse-ds-feedback-data'

export const metadata: Metadata = {
  title: 'CSE(DS) - Feedback Form | ATRIA',
  description: 'Feedback form for Computer Science and Engineering (Data Science) Department',
}

export default function CSEDSFeedbackPage() {
  return (
    <FeedbackForm
      departmentName={CSE_DS_FEEDBACK_DATA.departmentName}
      heroTitle={CSE_DS_FEEDBACK_DATA.heroTitle}
      heroDescription={CSE_DS_FEEDBACK_DATA.heroDescription}
      sections={CSE_DS_FEEDBACK_DATA.sections}
      department="cse-ds"
    />
  )
}
