import { Request, Response } from "express";
import { register, login } from "../services/authService";

const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const { token, user } = await register(username, email, password);
    res.status(201).json({ token, user });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Utilisateur déjà existant") {
        return res.status(409).json({ error: "Utilisateur déjà existant" });
      }
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Une erreur inconnue s'est produite" });
    }
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await login(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Utilisateur non trouvé") {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Une erreur inconnue s'est produite" });
    }
  }
};

export { signup, signin };
