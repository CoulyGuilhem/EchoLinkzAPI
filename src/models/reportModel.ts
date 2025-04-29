import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    category: string;
    priority: number;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    status: 'open' | 'in_progress' | 'resolved';
    createdAt: Date;
}

const reportSchema: Schema<IReport> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    priority: { type: Number, min: 1, max: 5, default: 3 },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'resolved'],
        default: 'open'
    },
    createdAt: { type: Date, default: Date.now }
});

reportSchema.index({ location: '2dsphere' });

export default mongoose.model<IReport>('Report', reportSchema);
