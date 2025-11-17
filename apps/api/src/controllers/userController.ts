import { prisma } from '../db'

export const getUserByClerkId = async (req, res) => {
    try {
        const { clerkId } = req.params.clerkId;
        const user = await prisma.user.findUnique({
            where: { clerkId },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Error fetching user by clerkId:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};