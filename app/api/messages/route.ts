import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { pusherServer } from '@/app/libs/pusher'

export async function POST(requests: Request) {

    try {
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

        console.log(requests);

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

        await pusherServer.trigger(conversationId, 'messages:new', newMessage);

        const lastMessage = updateConveresation.massages[updateConveresation.massages.length - 1];

        updateConveresation.users.map((user) => {
            pusherServer.trigger(user.email!, 'conversation:update', {
                id: conversationId,
                messages: [lastMessage]
            });
        });

        return NextResponse.json(newMessage)

    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('internal server error', { status: 500 });
    }

}