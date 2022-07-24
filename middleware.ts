
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest){
    const token = req.cookies.get('__Secure-next-auth.session-token')
    if(!token){
        return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
}

export const config = {
    matcher: ['/','/random','/profile/:id*'],
}