'use client'

import { cn } from "@/lib/utils";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';


interface NavbarItemProps {
    label: string;
    href: string;
    bgColor?: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, href, bgColor}) => {

    const pathname = usePathname()
    const router = useRouter()

    const isActive = (pathname === '/' && href === '/') || pathname === href || pathname?.startsWith(`${href}/`)

    const onClick = () => { 
        router.push(href);
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                'flex flex-col w-full cursor-pointer items-center justify-center gap-x-2 text-white text-md font-[500] transition-all',
                bgColor && bgColor
            )}
        >
            <div
                className={cn('mb-auto opacity-0 border-2 flex border-black w-full transition-all', isActive && 'opacity-100')}
            />
            <div className="flex items-center justify-center px-4 py-2 text-white">
                {label}
            </div>
            
        </button>
    )
}

export default NavbarItem