'use client'

import { signIn, signOut } from "next-auth/react"


export const LoginButton = () => {
    return <button onClick={()=>signIn}>Sing IN</button>
}

export const LogoutButton = () => {
    return <button onClick={()=>signOut()}>Sign Out</button>
}