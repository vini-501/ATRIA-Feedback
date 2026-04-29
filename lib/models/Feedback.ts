import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  department: 'ise' | 'cse-ds';
  stakeholder_type: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  years_of_experience: string;
  responses: Record<string, string>;
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

const feedbackSchema = new Schema<IFeedback>(
  {
    department: {
      type: String,
      enum: ['ise', 'cse-ds'],
      required: true,
      index: true,
    },
    stakeholder_type: {
      type: String,
      required: true,
      enum: ['Student', 'Alumni', 'Faculty and Staff', 'Employer', 'Entrepreneur'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    years_of_experience: {
      type: String,
      required: true,
    },
    responses: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for faster queries
feedbackSchema.index({ department: 1, submittedAt: -1 });
feedbackSchema.index({ email: 1 });

export const Feedback = mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', feedbackSchema);
