import express from 'express'
import { prisma } from '../db.js'
import type { Request, Response } from 'express'

const router = express.Router({ mergeParams: true })

router.get(
    '/',
    async (
        req: Request<{ workspaceId: string }, any, any, { start?: string; end?: string }>,
        res,
    ) => {
        try {
            const workspaceId = Number(req.params.workspaceId)

            if (!Number.isInteger(workspaceId))
                return res.status(400).json({ error: 'Invalid param' })

            const { start, end } = req.query

            const where: any = { shift: { workspaceId } }
            if (start && end) {
                const startDate = new Date(start)
                const endDate = new Date(end)

                where.shift.startTime = { lt: endDate }
                where.shift.endTime = { gt: startDate }
            }

            const timesheets = await prisma.timesheet.findMany({
                where,
                include: {
                    shift: {
                        select: {
                            id: true,
                            startTime: true,
                            endTime: true,
                            user: true,
                        },
                    },
                },

                orderBy: { id: 'desc' },
            })

            res.status(200).json(timesheets)
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Error fetching user timesheets', err)
            return res.status(500).json({ error: 'Internal server error' })
        }
    },
)

router.get(
    '/users/:userId',
    async (
        req: Request<
            { workspaceId: string; userId: string },
            any,
            any,
            { start?: string; end?: string }
        >,
        res: Response,
    ) => {
        try {
            const workspaceId = Number(req.params.workspaceId)
            const userId = req.params.userId
            if (!Number.isInteger(workspaceId) || !userId)
                return res.status(400).json({ error: 'Invalid params' })

            const { start, end } = req.query
            const where: any = { shift: { workspaceId, userId } }

            if (start && end) {
                const startDate = new Date(start)
                const endDate = new Date(end)
                where.shift.startTime = { lt: endDate }
                where.shift.endTime = { gt: startDate }
            }

            const timesheets = await prisma.timesheet.findMany({
                where,
                include: {
                    shift: {
                        select: {
                            id: true,
                            userId: true,
                            workspaceId: true,
                            startTime: true,
                            endTime: true,
                            breakDuration: true,
                            user: { select: { id: true, firstName: true, lastName: true } },
                        },
                    },
                },
                orderBy: { id: 'desc' },
            })

            return res.status(200).json(timesheets);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Error fetching user timesheets', err)
            return res.status(500).json({ error: 'Internal server error' })
        }
    },
)

export default router;