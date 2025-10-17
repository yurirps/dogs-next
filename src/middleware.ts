import { NextResponse, type NextRequest } from "next/server";
import verifyToken from "./functions/verify-token";

export async function middleware(resquest: NextRequest) {
    const token = resquest.cookies.get('token')?.value;
    const authenticated = token ? await verifyToken(token) : false;

    if(!authenticated && resquest.nextUrl.pathname.startsWith('/conta')){
        return NextResponse.redirect(new URL('/login', resquest.url))
    }

    if(authenticated && resquest.nextUrl.pathname.startsWith('/login')){
        return NextResponse.redirect(new URL('/conta', resquest.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/conta/:patch*', '/login/:path*']
}