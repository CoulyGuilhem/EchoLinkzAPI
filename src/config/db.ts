import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = async (): Promise<void> => {
  const conn = await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as mongoose.ConnectOptions)
  console.log(`MongoDB Connected: ${conn.connection.host}`)
}
