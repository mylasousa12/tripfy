import ResetPasswordSchema from "@/app/auth/reset-password/Reset-Password-Schema";
import {verifyResetPasswordToken} from "@/core/api/Helpers/JWT";
import * as bcrypt from 'bcrypt';
import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(req: Request){
    const body = await req.json();

    try {
        const validation: {email: string, token: string, password: string} = await ResetPasswordSchema.parseAsync(body);

        const verifyToken = verifyResetPasswordToken(validation.token);

        const hashedPassword = await bcrypt.hash(validation.password, 10);

        const updateUserPassword: {email: string} = await prisma.users.update({
           where: {
               email: validation.email
           },
            data: {
                password: hashedPassword
            }
        });

        return NextResponse.json

    } catch () {}
}