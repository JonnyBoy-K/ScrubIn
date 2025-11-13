import express from 'express';
import { prisma } from '../db';

const router = express.Router({ mergeParams: true });

// GET /workspaces/:workspaceId/roles
router.get('/', async (req, res) => {
	// TODO: Implement get roles
	res.status(501).json({ error: 'Not implemented' });
});

// GET /workspaces/:workspaceId/roles/:id
router.get('/:id', async (req, res) => {
	// TODO: Implement get role
	res.status(501).json({ error: 'Not implemented' });
});

// POST /workspaces/:workspaceId/roles
router.post('/', async (req, res) => {
	// TODO: Implement create role
	res.status(501).json({ error: 'Not implemented' });
});

// PATCH /workspaces/:workspaceId/roles/:id
router.patch('/:id', async (req, res) => {
	// TODO: Implement update role
	res.status(501).json({ error: 'Not implemented' });
});

// DELETE /workspaces/:workspaceId/roles/:id
router.delete('/:id', async (req, res) => {
	// TODO: Implement delete role
	res.status(501).json({ error: 'Not implemented' });
});

// GET /workspaces/:workspaceId/roles/:roleId/members
router.get('/:roleId/members', async (req, res) => {
	// TODO: Implement get role members
	res.status(501).json({ error: 'Not implemented' });
});

// PUT /workspaces/:workspaceId/roles/:roleId/members/:userId
router.put('/:roleId/members/:userId', async (req, res) => {
	// TODO: Implement assign user to role
	res.status(501).json({ error: 'Not implemented' });
});

// DELETE /workspaces/:workspaceId/roles/:roleId/members/:userId
router.delete('/:roleId/members/:userId', async (req, res) => {
	// TODO: Implement revoke user from role
	res.status(501).json({ error: 'Not implemented' });
});

export default router;

