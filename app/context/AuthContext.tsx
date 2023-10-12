'use client';

import { SessionProvider } from "next-auth/react";

interface AuthContextProbs {
    children : React.ReactNode
}

export default function AuthContext ({
    children
} : AuthContextProbs){
    return <SessionProvider>{children}</SessionProvider>
}