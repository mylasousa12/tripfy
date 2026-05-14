import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/core/api/Helpers/JWT";

export function proxy(request: NextRequest) {
    if (publicRoutes().includes(request.nextUrl.pathname)) {
        console.log(request.nextUrl.pathname);
        return NextResponse.next();
    } //Se a rota atual estiver dentro das rotas públicas, permite continuar normalmente.

    const authHeader = request.headers.get("authorization");

    const token:string | undefined = authHeader?.split('')[1];

    if (!token){
        return NextResponse.json(
            {
                success: false,
                message: 'Unauthorized'
            },
            {
                status: 401
            }
        );
    }

    const decoded = verifyToken(token);

    return NextResponse.json({
        user:decoded
    });

}

function publicRoutes(): Array<string> {
    return [
        '/auth/login',
        '/auth/register',
    ];
}