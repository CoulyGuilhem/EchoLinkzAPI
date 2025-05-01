// controllers/roomController.ts

import { Request, Response } from 'express';
import Message from '../models/messageModel';

export const getMessagesByRoom = async (req: Request, res: Response) => {
  try {
    const { roomName } = req.params;
    const messages = await Message.find({ room: roomName })
      .sort({ timestamp: 1 });
    return res.status(200).json(messages);
  } catch (err) {
    console.error('Erreur récupération salon:', err);
    return res.status(500).json({ error: 'Impossible de charger le salon', details: err });
  }
};
