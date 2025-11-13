import express from 'express';
import { prisma } from '../db';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	// TODO: Implement get shift requests by workspace
	res.status(501).json({ error: 'Not implemented' });
});

router.get('/:id', async (req, res) => {
	// TODO: Implement get shift request
	res.status(501).json({ error: 'Not implemented' });
});

router.post('/', async (req, res) => {
	// TODO: Implement create shift request
	res.status(501).json({ error: 'Not implemented' });
});

router.patch('/:id', async (req, res) => {
	// TODO: Implement update shift request
	res.status(501).json({ error: 'Not implemented' });
});

router.delete('/:id', async (req, res) => {
	// TODO: Implement delete shift request
	res.status(501).json({ error: 'Not implemented' });
});

router.post('/:id/approve', async (req, res) => {
	// TODO: Implement approve shift request
	res.status(501).json({ error: 'Not implemented' });
});

router.post('/:id/reject', async (req, res) => {
	// TODO: Implement reject shift request
	res.status(501).json({ error: 'Not implemented' });
});

export default router;

