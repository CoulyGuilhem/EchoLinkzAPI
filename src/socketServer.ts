import { Server } from "socket.io";
import Message from "./models/messageModel";

export const initSocketServer = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // ⚠️ à sécuriser en prod
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("✅ WebSocket connecté :", socket.id);

        // Rejoindre une room spécifique à un report
        socket.on("joinRoom", ({ reportId }) => {
            socket.join(reportId);
            console.log(`📥 Socket ${socket.id} rejoint la room ${reportId}`);
        });

        // Réception d’un message => sauvegarde + broadcast
        socket.on("sendMessage", async ({ reportId, message, senderId }) => {
            try {
                // 1. Sauvegarder en base
                const newMessage = await Message.create({
                    reportId,
                    senderId,
                    message
                });

                // 2. Émettre à tous les utilisateurs dans la room
                io.to(reportId).emit("receiveMessage", {
                    message: newMessage.message,
                    senderId: newMessage.senderId,
                    timestamp: newMessage.timestamp
                });

                console.log(`📤 Message envoyé dans ${reportId} par ${senderId}`);
            } catch (err) {
                console.error("❌ Erreur lors de l'enregistrement du message :", err);
            }
        });

        socket.on("disconnect", () => {
            console.log("❎ Socket déconnecté :", socket.id);
        });
    });
};
