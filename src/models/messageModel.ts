import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    reportId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    message: string;
    timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
    reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IMessage>('Message', messageSchema);
