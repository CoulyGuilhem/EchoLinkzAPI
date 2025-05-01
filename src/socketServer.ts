import { Server } from "socket.io";
import Message from "./models/messageModel";

export const initSocketServer = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("✅ WebSocket connecté :", socket.id);

        // Rejoindre une room (reportId ou salon)
        socket.on("joinRoom", (data) => {
            const roomKey = data.reportId || data.room;
            if (roomKey) {
                socket.join(roomKey);
                console.log(`📥 Socket ${socket.id} rejoint la room ${roomKey}`);
            }
        });

        // Réception d’un message => broadcast + sauvegarde conditionnelle
        socket.on("sendMessage", async (data) => {
            const { reportId, room, message, senderId } = data;
            const roomKey = reportId || room;

            // 1) Émettre immédiatement à la room
            io.to(roomKey).emit("receiveMessage", {
                ...data,
                timestamp: new Date(),
            });

            try {
                // 2) Sauvegarder en base : reportId OU room
                if (reportId) {
                    await Message.create({ reportId, senderId, message });
                    console.log(`📤 Message stocké pour report ${reportId} par ${senderId}`);
                } else if (room) {
                    await Message.create({ room, senderId, message });
                    console.log(`📤 Message stocké pour room ${room} par ${senderId}`);
                }
            } catch (err) {
                console.error("❌ Erreur lors de l'enregistrement du message :", err);
            }
        });

        socket.on("disconnect", () => {
            console.log("❎ Socket déconnecté :", socket.id);
        });
    });
};
