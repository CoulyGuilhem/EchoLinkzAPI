import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import http from 'http'
import alertRoutes from './routes/alertRoutes'
import userRoutes from './routes/userRoutes'
import chatRoutes from './routes/chatRoutes'
import { initSocket } from './socket/socket'
import { connectDB } from './config/db'

connectDB()

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use('/api/alerts', alertRoutes)
app.use('/api/users',   userRoutes)
app.use('/api/chat',    chatRoutes)
import errorHandler from './middleware/errorHandler'
app.use(errorHandler)
initSocket(server)

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
