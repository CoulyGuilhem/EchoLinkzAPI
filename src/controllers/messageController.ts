import { Request, Response } from 'express';
import Message from '../models/messageModel';

export const getMessagesByReport = async (req: Request, res: Response) => {
    try {
        const { reportId } = req.params;

        const messages = await Message.find({ reportId })
            .sort({ timestamp: 1 }) // du plus ancien au plus récent
            .populate('senderId', 'username email'); // si tu veux afficher l'utilisateur

        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des messages.", details: err });
    }
};
