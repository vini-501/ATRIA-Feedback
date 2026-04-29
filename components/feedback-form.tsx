'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

interface Question {
  id?: string
  question?: string
  [key: string]: any
}

interface Subsection {
  id: string
  title: string
  description: string
  questions: string[]
}

interface Section {
  id: string
  title: string
  description?: string
  questions?: string[]
  subsections?: Subsection[]
}

interface FeedbackFormProps {
  departmentName: string
  heroTitle: string
  heroDescription: string
  sections: Section[]
  department: 'ise' | 'cse-ds'
  onSubmitSuccess?: () => void
}

const stakeholderTypes = ['Student', 'Alumni', 'Faculty and Staff', 'Employer', 'Entrepreneur'] as const
const relevanceOptions = ['Relevant', 'Somewhat Relevant', 'Not Relevant'] as const

// Build schema dynamically based on sections and questions
function buildFormSchema(sections: Section[]) {
  const relevanceEnum = z.enum(relevanceOptions)
  
  const baseSchema: Record<string, any> = {
    stakeholder_type: z.enum(stakeholderTypes, {
      errorMap: () => ({ message: 'Please select a stakeholder type' })
    }),
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'),
    organization: z.string().min(2, 'Organization name is required').max(100),
    designation: z.string().min(2, 'Designation is required').max(100),
    years_of_experience: z.string().regex(/^[0-9]{1,2}$/, 'Years of experience must be a valid number'),
  }

  // Add all questions
  sections.forEach((section) => {
    if (section.questions) {
      section.questions.forEach((q, idx) => {
        const questionId = `${section.id}_q${idx}`
        baseSchema[questionId] = relevanceEnum.optional()
      })
    }
    if (section.subsections) {
      section.subsections.forEach((sub) => {
        sub.questions.forEach((q, idx) => {
          const questionId = `${sub.id}_q${idx}`
          baseSchema[questionId] = relevanceEnum.optional()
        })
      })
    }
  })

  return z.object(baseSchema)
}

type FormData = {
  [key: string]: string | undefined
}

export default function FeedbackForm({
  departmentName,
  heroTitle,
  heroDescription,
  sections,
  department,
  onSubmitSuccess,
}: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [showPersonalDetails, setShowPersonalDetails] = useState(false)

  const schema = buildFormSchema(sections)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const stakeholderType = watch('stakeholder_type')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          department,
          departmentName,
          timestamp: new Date().toISOString(),
          ...data,
        }),
      })

      if (response.ok) {
        setSubmitMessage('✓ Thank you! Your feedback has been submitted successfully.')
        reset()
        onSubmitSuccess?.()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setSubmitMessage('✗ Error submitting form. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('✗ Error submitting form. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-8 sm:py-16 px-4 sm:px-6 lg:px-8 mb-6 sm:mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-pretty leading-tight">{heroTitle}</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed text-pretty max-w-3xl mx-auto px-2">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        {submitMessage && (
          <div className={`mb-6 sm:mb-8 p-3 sm:p-4 rounded-lg text-center font-semibold text-sm sm:text-base ${
            submitMessage.startsWith('✓')
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-12">
          {/* Stakeholder Type Selection */}
          <section className="bg-white border-l-4 border-primary p-4 sm:p-8 rounded-lg shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">Step 1: Select Your Stakeholder Type</h2>
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                Stakeholder Type <span className="text-red-500">*</span>
              </label>
              <Controller
                name="stakeholder_type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value || ''} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-10 sm:h-12 bg-white border-2 border-gray-300 focus:border-primary text-sm sm:text-base">
                      <SelectValue placeholder="Select your stakeholder type" />
                    </SelectTrigger>
                    <SelectContent>
                      {stakeholderTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.stakeholder_type && (
                <p className="text-red-500 text-sm mt-2">{errors.stakeholder_type.message}</p>
              )}
            </div>

            {/* Show Personal Details only after stakeholder type is selected */}
            {stakeholderType && (
              <div className="space-y-3 sm:space-y-5 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-gray-200">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Step 2: Personal Details</h3>
                
                {/* Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full h-10 sm:h-11 border-2 border-gray-300 focus:border-primary text-sm"
                      />
                    )}
                  />
                  {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full h-10 sm:h-11 border-2 border-gray-300 focus:border-primary text-sm"
                      />
                    )}
                  />
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Enter 10-digit phone number"
                        className="w-full h-10 sm:h-11 border-2 border-gray-300 focus:border-primary text-sm"
                      />
                    )}
                  />
                  {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone.message}</p>}
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="organization"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter organization name"
                        className="w-full h-10 sm:h-11 border-2 border-gray-300 focus:border-primary text-sm"
                      />
                    )}
                  />
                  {errors.organization && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.organization.message}</p>
                  )}
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="designation"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your designation"
                        className="w-full h-10 sm:h-11 border-2 border-gray-300 focus:border-primary text-sm"
                      />
                    )}
                  />
                  {errors.designation && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.designation.message}</p>
                  )}
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Year of Experience <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="years_of_experience"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        max="99"
                        placeholder="Enter years of experience"
                        className="w-full h-10 sm:h-11 border-2 border-gray-300 focus:border-primary text-sm"
                      />
                    )}
                  />
                  {errors.years_of_experience && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.years_of_experience.message}</p>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Questions Sections */}
          {stakeholderType && (
            <>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 sm:p-6 rounded-lg">
                <p className="text-blue-800 font-semibold text-xs sm:text-sm md:text-base">
                  Step 3: Please rate your feedback on the following statements using the scale: Relevant, Somewhat Relevant, or Not Relevant
                </p>
              </div>

              {sections.map((section) => (
                <section key={section.id} className="bg-white p-4 sm:p-8 rounded-lg shadow-sm border-2 border-gray-200">
                  {/* Main Section Title and Description */}
                  <div className="mb-4 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">{section.title}</h2>
                    {section.description && (
                      <div className="bg-primary/5 border-l-4 border-primary p-3 sm:p-6 rounded-r-lg">
                        <p className="text-gray-800 text-xs sm:text-base leading-relaxed italic">{section.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Direct Questions (for Vision) */}
                  {section.questions && section.questions.length > 0 && (
                    <div className="space-y-4 sm:space-y-6">
                      {section.questions.map((question, qIdx) => {
                        const questionId = `${section.id}_q${qIdx}`
                        return (
                          <div key={questionId} className="border-b pb-4 sm:pb-6">
                            <p className="text-gray-800 font-semibold mb-2 sm:mb-4 text-sm sm:text-base">{qIdx + 1}. {question}</p>
                            <div className="flex flex-col gap-2 sm:gap-4 pl-2 sm:pl-4">
                              {relevanceOptions.map((option) => (
                                <label key={option} className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-gray-50 p-1 sm:p-2 rounded">
                                  <Controller
                                    name={questionId}
                                    control={control}
                                    render={({ field }) => (
                                      <input
                                        type="radio"
                                        {...field}
                                        value={option}
                                        checked={field.value === option}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        className="w-3 h-3 sm:w-4 sm:h-4 text-primary cursor-pointer"
                                      />
                                    )}
                                  />
                                  <span className="text-gray-700 font-medium text-xs sm:text-sm">{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Subsections (for Mission, PEO, PSO) */}
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="space-y-6 sm:space-y-10">
                      {section.subsections.map((subsection, subIdx) => (
                        <div key={subsection.id} className="bg-gray-50 p-3 sm:p-6 rounded-lg border-l-4 border-primary">
                          {/* Subsection Title and Description */}
                          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{subsection.title}</h3>
                          <div className="bg-white border-l-4 border-primary/50 p-2 sm:p-4 rounded mb-4 sm:mb-6">
                            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">{subsection.description}</p>
                          </div>

                          {/* Subsection Questions */}
                          <div className="space-y-4 sm:space-y-6">
                            {subsection.questions.map((question, qIdx) => {
                              const questionId = `${subsection.id}_q${qIdx}`
                              return (
                                <div key={questionId} className="bg-white p-2 sm:p-4 rounded border-b-2 border-gray-100">
                                  <p className="text-gray-800 font-semibold mb-2 sm:mb-4 text-xs sm:text-sm">{qIdx + 1}. {question}</p>
                                  <div className="flex flex-col gap-2 sm:gap-4 pl-2 sm:pl-4">
                                    {relevanceOptions.map((option) => (
                                      <label key={option} className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-gray-50 p-1 sm:p-2 rounded">
                                        <Controller
                                          name={questionId}
                                          control={control}
                                          render={({ field }) => (
                                            <input
                                              type="radio"
                                              {...field}
                                              value={option}
                                              checked={field.value === option}
                                              onChange={(e) => field.onChange(e.target.value)}
                                              className="w-3 h-3 sm:w-4 sm:h-4 text-primary cursor-pointer"
                                            />
                                          )}
                                        />
                                        <span className="text-gray-700 font-medium text-xs sm:text-sm">{option}</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </>
          )}

          {/* Submit Button */}
          {stakeholderType && (
            <div className="flex justify-center py-6 sm:py-8 px-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-12 py-3 sm:py-4 text-sm sm:text-lg font-bold rounded-lg flex items-center gap-2 sm:gap-3 transition-all w-full sm:w-auto justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-base">Submitting...</span>
                  </>
                ) : (
                  <span className="text-xs sm:text-base">Submit Feedback</span>
                )}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
