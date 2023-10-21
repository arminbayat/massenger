import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return [];
    }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMassageAt: 'desc',
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                massages: {
                    include: {
                        sender: true,
                        seen: true,
                    }
                },
            }
        });

        return conversations;
    } catch (error: any) {
        return [];
    }
};

export default getConversations;
