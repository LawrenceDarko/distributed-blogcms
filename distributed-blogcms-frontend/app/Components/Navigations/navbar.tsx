'use client'

import NavbarItem from "./navbar-item"
import Link from "next/link"
import { useGeneralContext } from "@/app/hooks/GeneralContext"
import { useRouter } from "next/navigation"
import axios from "axios"
// import MobileSidebar from "./mobile-sidebar"

const homeRoutes = [
    {
        label: 'News',
        href: '/',
        bgColor: '#70A703'
    },
    {
        label: 'Sports',
        href: '/sports',
        bgColor: 'bg-[#FF0001]'
    },
    {
        label: 'Business',
        href: '/business',
        bgColor: 'bg-[#02AAE9]'
    },
    {
        label: 'Entertainment',
        href: '/entertainment',
        bgColor: 'bg-[#963A8C]'
    },
    {
        label: 'Wall',
        href: '/wall',
        bgColor: 'bg-[#FF5A0A]'
    },
    {
        label: 'Country',
        href: '/country',
        bgColor: 'bg-[#9E7241]'
    },
]

export const Navbar = () => {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`;
    const router = useRouter();
    const { auth, setAuth } = useGeneralContext();
    // console.log(auth)

    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth('');
        router.push('/');
    
        try {
            const response = await axios.get(apiEndpoint, { withCredentials: true });
            const resData = response.data;
            console.log("LOGOUT:", resData);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className="md:flex w-full flex-col h-full px-3 pt-2 hidden bg-[#70A703] border-b shadow-sm">
            {/* <MobileSidebar /> */}
            <div className="relative flex items-start justify-between w-full">
                <div className="w-56">
                    <img src="/images/logo.png" alt="logo" className="object-contain w-full h-full" />
                </div>

                <div className="flex h-5 gap-2 overflow-hidden text-black">
                    <input type="text" className="p-1 text-gray-300 w-[200px]  rounded-full text-xs outline-none" placeholder="Search by patient name"/>

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
                </div>
            </div>
            <div className="flex w-full pt-6">
            {homeRoutes.map((route) => (
                    // Render the NavbarItem only if the user is authenticated or the route is not 'Wall'
                    (auth || route.label !== 'Wall') && (
                        <NavbarItem
                            key={route.href}
                            label={route.label}
                            href={route.href}
                            bgColor={route.bgColor}
                        />
                    )
                ))}
            </div>
        </div>
    )
}