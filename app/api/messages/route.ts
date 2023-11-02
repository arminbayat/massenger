import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(requests: Request) {

    try {

        console.log(requests);

        const currentUser = await getCurrentUser();

        const body = await requests.json();
        const {
            message,
            image,
            conversationId,
        } = body

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('unautirized', { status: 401 });
        }
        const newMessage = await prisma.massage.create({
            include: {
                seen: true,
                sender: true
            },
            data: {
                body: message,
                image: image,
                Conversation: {
                    connect: { id: conversationId }
                },
                sender: {
                    connect: { id: currentUser.id }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                },
            }
        });

        const updateConveresation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMassageAt: new Date(),
                massages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                massages: {
                    include: {
                        seen: true
                    }
                }
            }
        });

        return NextResponse.json(newMessage)

    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('internal server error', { status: 500 });
    }

}