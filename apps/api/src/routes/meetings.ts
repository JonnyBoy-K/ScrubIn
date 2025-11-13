import express from 'express';
import { prisma } from '../db';

const router = express.Router({ mergeParams: true });

// GET /workspaces/:workspaceId/meetings
router.get('/', async (req, res) => {
	// TODO: Implement get meetings by workspace
	res.status(501).json({ error: 'Not implemented' });
});

// GET /workspaces/:workspaceId/meetings/:id
router.get('/:id', async (req, res) => {
	// TODO: Implement get meeting
	res.status(501).json({ error: 'Not implemented' });
});

// POST /workspaces/:workspaceId/meetings
router.post('/', async (req, res) => {
	// TODO: Implement create meeting
	res.status(501).json({ error: 'Not implemented' });
});

// DELETE /workspaces/:workspaceId/meetings/:id
router.delete('/:id', async (req, res) => {
	// TODO: Implement delete meeting
	res.status(501).json({ error: 'Not implemented' });
});

export default router;

