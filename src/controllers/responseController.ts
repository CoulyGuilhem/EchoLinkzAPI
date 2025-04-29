import { Response } from 'express';
import ResponseModel from '../models/responseModel';
import { AuthRequest } from '../types/AuthRequest';

export const createResponse = async (req: AuthRequest, res: Response) => {
    try {
        const { reportId } = req.body;

        if (!reportId) {
            return res.status(400).json({ message: 'Report ID manquant.' });
        }

        const response = await ResponseModel.create({
            userId: req.userId,
            reportId
        });

        res.status(201).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la création de la réponse.', details: err });
    }
};

