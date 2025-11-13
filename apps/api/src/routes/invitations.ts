import express from 'express';
import { getAuth } from '@clerk/express';
import { clerkClient } from '@clerk/express';
import { prisma } from '../db';

const router = express.Router({ mergeParams: true });

// GET /workspaces/:workspaceId/invitations
router.get('/', async (req, res) => {
	// TODO: Implement get invitations by workspace
	res.status(501).json({ error: 'Not implemented' });
});

// GET /workspaces/:workspaceId/invitations/:id
router.get('/:id', async (req, res) => {
	const { isAuthenticated, userId: clerkId } = getAuth(req);

	if (!isAuthenticated) {
		return res.status(401).json({ error: 'Unauthenticated' });
	}

	const invitation = await prisma.invitation.findFirst({
		where: {
			id: req.params.id,
		},
	});

	if (!invitation) {
		return res.status(404).json({ error: 'Invitation Not Found' });
	}

	const workspace = await prisma.workspace.findFirst({
		where: {
			id: invitation.workspaceId,
		},
	});

	if (!workspace) {
		return res.status(404).json({ error: 'Workspace Not Found' });
	}

	const user = await prisma.user.findFirst({
		where: {
			id: workspace.adminId,
		},
	});

	if (!user) {
		return res.status(404).json({ error: 'User Not Found' });
	}

	const { fullName, primaryEmailAddress } = await clerkClient.users.getUser(clerkId);

	res.status(200).json({
		workspaceName: workspace.name,
		workspaceOwnerName: fullName,
		workspaceOwnerEmail: primaryEmailAddress?.emailAddress,
		invitationId: invitation.id,
	});
});

// POST /workspaces/:workspaceId/invitations
router.post('/', async (req, res) => {
	const { userId } = getAuth(req);
	const workspaceId = Number(req.params.workspaceId);

	const user = await prisma.user.findFirst({
		where: {
			clerkId: userId,
		},
	});

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	const workspace = await prisma.workspace.findFirst({
		where: {
			id: workspaceId,
		},
	});

	if (!workspace) {
		return res.status(404).json({ error: 'Workspace not found' });
	}

	if (workspace.adminId === user.id) {
		const invitation = await prisma.invitation.create({
			data: {
				workspaceId,
			},
		});

		res.status(200).json(invitation);
	} else {
		res.status(403).json({ error: 'Unauthorized to create invitations for this workspace' });
	}
});

// DELETE /workspaces/:workspaceId/invitations/:id
router.delete('/:id', async (req, res) => {
	// TODO: Implement delete invitation
	res.status(501).json({ error: 'Not implemented' });
});

// POST /workspaces/:workspaceId/invitations/:id/accept
router.post('/:id/accept', async (req, res) => {
	const { id: invitationId } = req.params;
	const { userId } = getAuth(req);

	const invitation = await prisma.invitation.findFirst({
		where: {
			id: invitationId,
		},
	});

	if (!invitation) {
		return res.status(404).json({ error: 'Invitation not Found' });
	}

	const membership = await prisma.userWorkspaceMembership.create({
		data: {
			user: { connect: { clerkId: userId } },
			workspace: { connect: { id: invitation.workspaceId } },
		},
	});

	res.status(200).json(membership);

	await prisma.invitation.delete({
		where: {
			id: invitation.id,
		},
	});
});

export default router;

