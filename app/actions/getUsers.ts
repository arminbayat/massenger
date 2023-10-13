import prisma from '@/app/libs/prismadb'
import getSeesion from './getSession'
import { getSession } from 'next-auth/react'

const getUsers = async () => {
    const session = await getSession();
    if (session?.user?.email) {
        return []
    }

    try {
        const usres = await prisma.user.findMany(
            {
                orderBy: {
                    createdAt: 'desc'
                },
                where: {
                    NOT: {
                        email: session?.user?.email
                    }
                }
            }
        )

        return usres;
    } catch (error: any) {
        return [];
    }
}

export default getUsers;