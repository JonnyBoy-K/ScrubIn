import express from 'express'
import { getAuth } from '@clerk/express'
import { prisma } from '../db.js'
import { getWorkspaceMembership } from '../utils/authz.js'
import { getWorkspaceChannel } from '../event.js'

const router = express.Router()


router.get('/stream', (req,res) => {
    const workspaceId = Number(req.params.workspaceId);
    const channel = getWorkspaceChannel(workspaceId);

    res.setHeader('Content-Type', 'text/event-write');
    res.setHeader('Cache-Control', 'no-cache'); 
    res.setHeader('Connection', 'keep-alive');

    const handler = (payload: any) => {
        res.write(`data: ${JSON.stringify(payload)}\n\n`); 
    }

    channel.on('workspace-reload', handler);

    req.on('close', ()=> {
        channel.off('workspace-reload', handler);
        res.end(); 
    })
})

router.get('/', async (req, res) => {
    const { isAuthenticated, userId } = getAuth(req)

    if (!isAuthenticated) {
        return res.status(401).json({ error: 'User not authenticated' })

    }
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    })

    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    const workspaces = await prisma.workspace.findMany({
        where: {
            memberships: { some: { user } },
        },
    })

    res.status(200).json(workspaces)
})

router.get('/:id', async (req, res) => {
    try {
        const { isAuthenticated, userId } = getAuth(req)

        if (!isAuthenticated) {
            return res.status(401).json({ error: 'User not authenticated' })
    
        }
        const membership = await getWorkspaceMembership(userId, Number(req.params.id))

        if (!membership) {
            return res.status(403).json({ error: 'Unauthorized to Access Workspace' })
        }

        res.status(200).json(membership.workspace) // This is what I changed
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
})

router.post('/', async (req, res) => {
    const { isAuthenticated, userId } = getAuth(req)

    if (!isAuthenticated) {
        return res.status(401).json({ error: 'User not authenticated' })

    }
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    })

    if (!user) {
        return res.status(404).json({ error: 'User not found in db' })
    }

    const workspace = await prisma.workspace.create({
        data: {
            name: req.body.name,
            adminId: user.id,
            location: req.body.location,
            memberships: {
                create: [{ user: { connect: { id: user.id } } }],
            },
        },
    })

    res.status(200).json(workspace)
})

router.patch('/:id', async (req, res) => {
    // TODO: Implement workspace update
    res.status(501).json({ error: 'Not implemented' })
})

router.delete('/:id', async (req, res) => {
    // TODO: Implement workspace delete
    res.status(501).json({ error: 'Not implemented' })
})

export default router
