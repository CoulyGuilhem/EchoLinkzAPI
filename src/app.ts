import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { initSocketServer } from './socketServer';

// Routes
import authRoutes from './routes/authRoutes';
import reportRoutes from './routes/reportRoutes';
import responseRoutes from './routes/responseRoutes';
import messageRoutes from './routes/messageRoutes';
import chatRoutes from './routes/chatRoutes';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Utiliser tes routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/chat', chatRoutes);

// Créer un serveur HTTP à partir d'Express
const server = http.createServer(app);

// Initialiser Socket.IO
initSocketServer(server);

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI as string,{
    dbName: 'EchoLinkz'
})
    .then(() => {
        console.log('✅ MongoDB connecté');

        // Écoute du serveur une fois que la base est connectée
        const PORT = process.env.PORT || 5001;
        server.listen(PORT, () => {
            console.log(`🚀 API + WebSocket server démarré sur le port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Erreur de connexion MongoDB :', err);
    });
