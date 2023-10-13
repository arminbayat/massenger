import prisma from '@/app/libs/prismadb';
import getSeesion from './getSession';

const getCurrentUser = async () => {
    try {

        const session = await getSeesion();
        if (!session?.user?.email) {
            return null;
        }
        console.log('ss')

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }

        return currentUser;
    } catch (error: any) {
        return null;
    }
}

export default getCurrentUser