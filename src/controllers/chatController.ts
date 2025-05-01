import { Request, Response } from "express";
import { sendChat } from "../services/chatService";

export const chatHandler = async (req: Request, res: Response) => {
  const { threadId, message } = req.body;
  try {
    const data = await sendChat(threadId, message);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "assistant_error" });
  }
};
