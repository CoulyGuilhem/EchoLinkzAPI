import mongoose, { Schema, Document } from 'mongoose'

export interface IAlert extends Document {
  type: string
  description?: string
  location: { type: 'Point'; coordinates: number[] }
  priority: 'low' | 'medium' | 'high'
  user: mongoose.Types.ObjectId
  status: 'open' | 'matched' | 'closed'
}

const alertSchema: Schema = new Schema({
  type: { type: String, required: true },
  description: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['open','matched','closed'], default: 'open' }
}, { timestamps: true })

alertSchema.index({ location: '2dsphere' })

export default mongoose.model<IAlert>('Alert', alertSchema)
