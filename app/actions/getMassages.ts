import prisma from '@/app/libs/prismadb'

const getMassages = async (
    conversationId: string
) => {
    try {
        const massages = await prisma.massage.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                seen: true,
                sender: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return massages;
    } catch (error: any) {
        return null;
    }
}

export default getMassages;