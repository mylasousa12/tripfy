import {verifyResetPasswordToken} from "@/core/api/Helpers/JWT";
import * as bcrypt from 'bcrypt';
import {prisma} from "@/lib/prisma";
import {z, ZodError} from "zod";
import ResetPasswordSchema from "@/app/auth/forgot-password/ResetPasswordSchema";
import AppResponse from "@/core/api/Adapters/AppResponse";

export async function POST(req: Request) {
    const body = await req.json();

    try {
        const validation: { token: string, password: string } = await ResetPasswordSchema.parseAsync(body);

        const verifyToken: { userId: number, type: "reset-password" } = verifyResetPasswordToken(validation.token);

        const user: {
            email: string,
            id: number,
            reset_password_token: string | null,
            reset_password_token_expires_at: Date | null
        } | null = await prisma.users.findUnique({
            where: {
                id: verifyToken.userId,
                reset_password_token: validation.token
            }
        });

        if (!user) {
            return AppResponse.unauthorized();
        }

        const hashedPassword: string = await bcrypt.hash(validation.password, 10);

        await prisma.users.update({
            where: {
                id: verifyToken.userId
            },
            data: {
                password: hashedPassword,
                reset_password_token: null,
                reset_password_token_expires_at: null
            }
        });

        return AppResponse.success();

    } catch (error) {
        if (error instanceof ZodError) {
            return AppResponse.json({errors: z.flattenError(error)})
        }
        return Response.json({message: "Server error", error: error}, {status: 500});
    }
}