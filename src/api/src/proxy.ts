import {NextRequest, NextResponse} from "next/server";
import Auth from "@/core/api/Helpers/Auth";
import AppResponse from "@/core/api/Adapters/AppResponse";

export async function proxy(request: NextRequest) {
    if (publicRoutes().includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }

    if (await Auth.user(request) === null) {
        return AppResponse.unauthorized();
    }

    return NextResponse.next();
}

function publicRoutes(): Array<string> {
    return [
        '/auth/login',
        '/auth/register',
        '/auth/forgot-password',
        '/auth/forgot-password/request'
    ];
}