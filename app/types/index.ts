import { Conversation, User, Massage } from "@prisma/client";

export type FullMassageType = Massage & {
    sender: User,
    seen: User[],
}

export type FullConversationType = Conversation & {
    users: User[],
    massages: FullMassageType[],
}