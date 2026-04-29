# ATRIA Feedback Portal - Setup Guide

## Overview
ATRIA is a modern, mobile-responsive feedback portal for the ISE and CSE(DS) departments. The application collects structured feedback from stakeholders about departmental vision, mission, objectives, and outcomes.

## Technology Stack
- **Frontend**: Next.js 16 with React 19
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas (Cloud)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Form Validation**: React Hook Form + Zod
- **Carousel**: Embla Carousel

## Prerequisites
- Node.js 18+ and pnpm/npm/yarn
- MongoDB Atlas account (free tier available)
- Basic understanding of Next.js

## Installation Steps

### 1. Clone and Install Dependencies
```bash
# Install dependencies
pnpm install
# or
npm install
# or
yarn install
```

### 2. MongoDB Atlas Setup

#### Step 1: Create MongoDB Atlas Account
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new organization and project

#### Step 2: Create a Cluster
1. Click "Create" to create a new cluster
2. Select **M0 Free Tier** (or your preferred tier)
3. Choose your preferred cloud provider and region
4. Click "Create Cluster" and wait for it to be ready (5-10 minutes)

#### Step 3: Get Connection String
1. Click "Connect" on your cluster
2. Select "Drivers" → "Node.js"
3. Copy the connection string
4. It will look like: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`

### 3. Environment Variables Setup

#### Create `.env.local` file in the project root:
```bash
cp .env.example .env.local
```

#### Update `.env.local` with your MongoDB credentials:
```env
# MongoDB Atlas Configuration
# Replace with your actual connection string from MongoDB Atlas
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/atria-feedback?retryWrites=true&w=majority

# Node Environment
NODE_ENV=development

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: 
- Replace `your_username` and `your_password` with your MongoDB credentials
- Replace `your_cluster` with your actual cluster name
- Ensure the database name is `atria-feedback` or modify as needed
- Never commit `.env.local` to version control (it's already in `.gitignore`)

### 4. Database Setup
The MongoDB collections will be automatically created when feedback is first submitted. The application uses Mongoose schemas to define the data structure.

### 5. Start Development Server
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── ise/                          # ISE Department Pages
│   │   ├── feedback/                 # ISE Feedback Form
│   │   ├── about/                    # ISE About & Events
│   │   └── gallery/                  # ISE Gallery
│   ├── cse-ds/                       # CSE(DS) Department Pages
│   │   ├── feedback/                 # CSE(DS) Feedback Form
│   │   ├── about/                    # CSE(DS) About & Events
│   │   └── gallery/                  # CSE(DS) Gallery
│   ├── api/
│   │   └── feedback/
│   │       └── route.ts              # Feedback API Endpoint
│   └── layout.tsx                    # Root Layout with Navbar
├── components/
│   ├── navbar.tsx                    # Navigation Component
│   ├── feedback-form.tsx             # Feedback Form Component
│   ├── about-section.tsx             # About Section Component
│   ├── events-carousel.tsx           # Events Carousel Component
│   ├── hod-showcase.tsx              # HOD Showcase Component
│   ├── gallery-grid.tsx              # Gallery Component
│   └── ui/                           # shadcn/ui Components
├── lib/
│   ├── db.ts                         # MongoDB Connection
│   ├── models/
│   │   └── Feedback.ts               # Feedback Schema
│   ├── form-schema.ts                # Zod Schema
│   ├── ise-feedback-data.ts          # ISE Questions & Content
│   ├── cse-ds-feedback-data.ts       # CSE(DS) Questions & Content
│   ├── about-data.ts                 # About Page Content & Events
│   └── utils.ts                      # Utility Functions
├── public/
│   ├── logo.png                      # ATRIA Logo
│   └── images/                       # Image Assets
├── .env.example                      # Environment Variables Template
├── SETUP.md                          # This File
└── README.md                         # Project Overview
```

## Features

### 1. Mobile-First Responsive Design
- Optimized for mobile, tablet, and desktop
- Touch-friendly form inputs
- Auto-scrolling carousels
- Responsive navigation

### 2. Dual Department Support
- **ISE (Information Science & Engineering)**
- **CSE(DS) (Computer Science & Engineering - Data Science)**
- Each department has independent pages

### 3. Structured Feedback Collection
- Stakeholder Type Selection (Student, Alumni, Faculty, Employer, Entrepreneur)
- Personal Information Capture
- Department-Specific Questions
- Section Hierarchy (Vision → Mission → PEO → PSO)
- Radio Button Responses (Relevant/Somewhat Relevant/Not Relevant)

### 4. Department About Pages
- Vision & Mission statements
- Best Practices
- Premium HOD (Head of Department) Showcase with photo placeholder
- Inspirational quotes

### 5. Events & Activities
- Creative event cards in carousel format
- 17 events per department
- Auto-scrolling carousel (right to left)
- Flagship Event highlighting
- Event details: Type, Title, Schedule, Resource Person, Report Link
- Touch-to-pause, hover interaction

### 6. Gallery
- Creative masonry layouts
- Multiple aspect ratios
- Responsive grid (2 columns mobile, 4 columns desktop)
- Placeholder cards ready for image uploads

### 7. Data Persistence
- MongoDB Atlas cloud database
- Automatic schema creation via Mongoose
- Validated data submission
- IP tracking and user agent logging

## Usage Guide

### Submitting Feedback
1. Navigate to ISE or CSE(DS) department
2. Click on "Feedback" page
3. Select stakeholder type
4. Fill in personal details
5. Answer feedback questions (3-9 questions per section)
6. Submit the form
7. Success message with feedback ID appears

### Managing Events (Admin/Content Editor)
Edit the event data in:
- `/lib/ise-feedback-data.ts` - ISE events
- `/lib/cse-ds-feedback-data.ts` - CSE(DS) events
- `/lib/about-data.ts` - About page content

### Adding HOD Photos
1. Upload your photo to `/public/images/hod-photo.jpg` (ISE) or `/public/images/hod-photo-cse.jpg` (CSE(DS))
2. Uncomment the Image component in `/components/hod-showcase.tsx`
3. Update the image path accordingly

### Uploading Gallery Images
1. Upload images to `/public/images/gallery/` folder
2. Update the gallery data in the respective gallery page component
3. Images will automatically scale and fill grid spaces

## API Endpoints

### POST /api/feedback
Submits feedback to MongoDB.

**Request Body:**
```json
{
  "department": "ise" | "cse-ds",
  "stakeholder_type": "Student" | "Alumni" | "Faculty and Staff" | "Employer" | "Entrepreneur",
  "name": "string",
  "email": "string",
  "phone": "string (10 digits)",
  "organization": "string",
  "designation": "string",
  "years_of_experience": "number",
  "vision_q1": "Relevant" | "Somewhat Relevant" | "Not Relevant",
  ... (more question responses)
}
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "feedbackId": "mongodb_object_id",
  "timestamp": "ISO_8601_datetime"
}
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `NEXT_PUBLIC_APP_URL` | Application URL | `http://localhost:3000` |

## Troubleshooting

### MongoDB Connection Issues
- **Error**: `MongooseError: Cannot connect to MongoDB`
  - Check your `.env.local` file for correct credentials
  - Verify MongoDB Atlas IP whitelist includes your computer
  - Test connection string in MongoDB Atlas console

- **Error**: `SyntaxError in connection string`
  - Ensure special characters in password are URL-encoded
  - Use password generator without special chars if possible
  - Visit [MongoDB Connection String](https://docs.mongodb.com/manual/reference/connection-string/) for help

### Form Validation Issues
- **Error**: `Email format invalid`
  - Ensure email follows standard format (user@domain.com)
  - Check for typos

- **Error**: `Phone number must be 10 digits`
  - Ensure phone field contains exactly 10 numeric digits
  - No spaces, dashes, or country codes

### Build Issues
- **Error**: `embla-carousel not found`
  - Run `pnpm install` to ensure all dependencies are installed
  - Clear `.next` folder: `rm -rf .next && pnpm dev`

## Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy automatically on push

### Manual Deployment
1. Build: `pnpm build`
2. Start: `pnpm start`
3. Access application in production mode

## Security Notes
- Never commit `.env.local` to version control
- Use strong passwords for MongoDB credentials
- Enable MongoDB IP whitelist for your server IPs only
- In production, use environment variables for all sensitive data
- Validate all user inputs (already implemented with Zod)

## Support & Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Guide](https://www.mongodb.com/docs/atlas/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## License
This project is proprietary and maintained by ATRIA Institute of Technology.

---

**Last Updated**: 2024
**Version**: 1.0.0
