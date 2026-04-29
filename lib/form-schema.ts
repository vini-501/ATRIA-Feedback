import { z } from 'zod'

const stakeholderTypes = [
  'Student',
  'Alumni',
  'Faculty and Staff',
  'Employer',
  'Entrepreneur'
] as const

const relevanceOptions = ['Relevant', 'Somewhat Relevant', 'Not Relevant'] as const

export const feedbackFormSchema = z.object({
  stakeholder_type: z.enum(stakeholderTypes, {
    errorMap: () => ({ message: 'Please select a stakeholder type' })
  }),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'),
  organization: z.string().min(2, 'Organization name is required').max(100),
  designation: z.string().min(2, 'Designation is required').max(100),
  years_of_experience: z.string().regex(/^[0-9]+$/, 'Years of experience must be a number'),
}).catchall(z.enum(relevanceOptions).optional())

export type FeedbackFormData = z.infer<typeof feedbackFormSchema>

export const stakeholderTypeOptions = stakeholderTypes.map(type => ({
  value: type,
  label: type
}))

export const relevanceOptions_list = relevanceOptions.map(option => ({
  value: option,
  label: option
}))
