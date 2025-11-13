import express from 'express';
import { prisma } from '../db';

const router = express.Router();

// GET /permissions
router.get('/', async (req, res) => {
	// TODO: Implement get permissions
	res.status(501).json({ error: 'Not implemented' });
});

// GET /permissions/:bitkey
router.get('/:bitkey', async (req, res) => {
	// TODO: Implement get permission
	res.status(501).json({ error: 'Not implemented' });
});

export default router;

