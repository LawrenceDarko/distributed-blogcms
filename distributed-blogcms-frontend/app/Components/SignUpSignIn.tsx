'use client'

import Link from 'next/link';
import React from 'react'
import { useGeneralContext } from "@/app/hooks/GeneralContext"
import { useRouter } from "next/navigation"
import { cookies } from "next/headers";

// interface SignUpSignInProps {
//     handleLogout: () => void;
// }

const SignUpSignIn: React.FC = () => {
    const router = useRouter();
    const { auth, setAuth } = useGeneralContext();

    const handleLogout = async() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        cookies().delete("token")
    }

    

    return (
        <>
            {!auth ? <>
                <button className="bg-[#A9CA68] text-xs px-2 font-semibold rounded-full">
                    <Link href="/auth/sign-up">Sign up</Link>
                </button>
                <button className="bg-[#A9CA68] text-xs px-2 font-semibold rounded-full">
                    <Link href="/auth/login">Sign in</Link>
                </button>
            </> :
                <button onClick={handleLogout} className="bg-[#A9CA68] text-xs px-2 font-semibold rounded-full">
                    Logout
                </button>
                }
        </>
    )
}

export default SignUpSignIn