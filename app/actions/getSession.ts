import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

export default async function getSeesion() {
    return await getServerSession(authOption);
}

