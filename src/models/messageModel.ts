import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  reportId?: mongoose.Types.ObjectId;
  room?: string;
  senderId: mongoose.Types.ObjectId;
  message: string;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
  reportId: { type: Schema.Types.ObjectId, ref: 'Report' },
  room:     { type: String },
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message:  { type: String, required: true },
  timestamp:{ type: Date, default: Date.now }
});

messageSchema.pre('validate', function (next) {
  if (!this.reportId && !this.room) {
    next(new Error('Un message doit avoir soit reportId, soit room'));
  } else {
    next();
  }
});

export default mongoose.model<IMessage>('Message', messageSchema);
