import mongoose, { Schema, Document } from 'mongoose';

export interface IResponse extends Document {
    userId: mongoose.Types.ObjectId;
    reportId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const responseSchema = new Schema<IResponse>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reportId: { type: Schema.Types.ObjectId, ref: 'Report', required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IResponse>('Response', responseSchema);
