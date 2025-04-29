import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
  alert: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  text: string
}

const messageSchema: Schema = new Schema({
  alert: { type: mongoose.Schema.Types.ObjectId, ref: 'Alert', required: true },
  user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text:  { type: String, required: true }
}, { timestamps: true })

export default mongoose.model<IMessage>('Message', messageSchema)
