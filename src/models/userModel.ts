import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
}

const userSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  }
});

userSchema.index({ location: '2dsphere' });

export default mongoose.model<IUser>('User', userSchema);
