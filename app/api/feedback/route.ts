import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Feedback } from '@/lib/models/Feedback'

export async function POST(request: NextRequest) {
  try {
    console.log('[FEEDBACK_API] Starting request processing...');
    
    // Test database connection
    try {
      await connectDB()
      console.log('[FEEDBACK_API] Database connected successfully');
    } catch (dbError) {
      console.error('[FEEDBACK_API] Database connection failed:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed. Please check server logs.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    console.log('[FEEDBACK_API] Request body received for department:', body.department);

    // Validate required fields
    const requiredFields = [
      'stakeholder_type',
      'name',
      'email',
      'phone',
      'organization',
      'designation',
      'years_of_experience',
      'department'
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        console.warn(`[FEEDBACK_API] Missing field: ${field}`);
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /.+\@.+\..+/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate phone format (10 digits)
    if (!/^[0-9]{10}$/.test(body.phone)) {
      return NextResponse.json(
        { error: 'Phone number must be 10 digits' },
        { status: 400 }
      )
    }

    // Get client IP and user agent
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-client-ip') || 
                    'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Prepare responses object - exclude personal info fields
    const responses: Record<string, string> = {}
    for (const [key, value] of Object.entries(body)) {
      if (!['stakeholder_type', 'name', 'email', 'phone', 'organization', 'designation', 'years_of_experience', 'department', 'departmentName', 'timestamp'].includes(key)) {
        responses[key] = value as string
      }
    }

    // Create feedback document
    const feedback = new Feedback({
      department: body.department,
      stakeholder_type: body.stakeholder_type,
      name: body.name,
      email: body.email,
      phone: body.phone,
      organization: body.organization,
      designation: body.designation,
      years_of_experience: body.years_of_experience,
      responses,
      ipAddress: clientIP,
      userAgent,
    })

    console.log('[FEEDBACK_API] Saving to MongoDB...');
    // Save to MongoDB
    const savedFeedback = await feedback.save()

    console.log('[FEEDBACK_API] Feedback saved successfully:', {
      id: savedFeedback._id,
      department: body.department,
      email: body.email,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Feedback submitted successfully',
        feedbackId: savedFeedback._id,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('[FEEDBACK_API] Unexpected error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process feedback submission' },
      { status: 500 }
    )
  }
}
