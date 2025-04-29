import { Response } from 'express';
import Report from '../models/reportModel';
import { AuthRequest } from '../types/AuthRequest';

const createReport = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, category, priority, location } = req.body;

        const report = await Report.create({
            userId: req.userId,
            title,
            description,
            category,
            priority,
            location
        });

        res.status(201).json(report);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la création du signalement', details: err });
    }
};

const getReports = async (req: AuthRequest, res: Response) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des signalements', details: err });
    }
};

export { createReport, getReports };
