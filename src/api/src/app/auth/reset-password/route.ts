import ResetPasswordSchema from "@/app/auth/reset-password/Reset-Password-Schema";
import {verifyResetPasswordToken} from "@/core/api/Helpers/JWT";
import * as bcrypt from 'bcrypt';
import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {z, ZodError} from "zod";

export async function POST(req: Request) {
    const body = await req.json();

    try {
        const validation: { token: string, password: string } = await ResetPasswordSchema.parseAsync(body);

        const verifyToken: { id: number, type: "reset-password" } = verifyResetPasswordToken(validation.token);

        const hashedPassword: string = await bcrypt.hash(validation.password, 10);

        await prisma.users.update({
            where: {
                id: verifyToken.id
            },
            data: {
                password: hashedPassword
            }
        });

        return NextResponse.json({
            success: true,
            message: "Password update"
        });

    } catch (error) {
        if (error instanceof ZodError) {
            return Response.json({errors: z.flattenError(error)}, {status: 400})
        }
        return Response.json({message: "Server error"}, {status: 500});
    }
}