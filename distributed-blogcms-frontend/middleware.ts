import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();

    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    // const token = request.cookies.get('token' as string)?.value as any;

    // console.log(token)
    
    function decodedToken(token: string): any | null {
    
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded as any;
        } catch (error) {
            console.error('Token decoding error:', error);
            return null;
        }
    }

    if (!token && pathname !== '/auth/login' && pathname === '/wall') {
        url.pathname = "/auth/login";
        return NextResponse.redirect(new URL(url, request.url));
    }
    

    if (token) {
        
        const user = decodedToken(token as any) as any;

        // if the person goes to /wall and the there's no token or it is expired route to login
        if (user.exp < Date.now()/1000 && pathname !== '/auth/login' && pathname === '/wall') {
            url.pathname = "/auth/login";
            return NextResponse.redirect(new URL(url, request.url));
        }

        // if user is logged in and still wan to access login page redirect back
        if (user?.exp > Date.now()/1000 && pathname === '/auth/login') {
            url.pathname = "/";
            return NextResponse.redirect(url);
        }

    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/auth/login',
        '/auth/sign-up',
        "/business",
        "/news",
        "/wall",
        "/sports",
        "/entertainment",
        "/feed",
        "/country",
        ],
}

