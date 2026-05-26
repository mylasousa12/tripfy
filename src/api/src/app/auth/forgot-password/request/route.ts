import {prisma} from "@/lib/prisma";
import {ZodError, z} from "zod";
import {resetPasswordToken} from "@/core/api/Helpers/JWT";
import ForgotPasswordSchema from "@/app/auth/forgot-password/request/Forgot-Password-Schema";
import {Env} from "@/core/api/Helpers/Env";
import {sendResetPasswordEmail} from "@/core/api/services/emails/sendResetPasswordEmail";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const validation: { email: string } = await ForgotPasswordSchema.parseAsync(body);

        const user: {
            email: string,
            id: number,
            reset_password_token: string | null,
            reset_password_token_expires_at: Date | null
        } | null = await prisma.users.findUnique({
            where: {email: validation.email}
        });

        if (!user) {
            return retrieveFailResponse();
        }

        if(user.reset_password_token !== null && user.reset_password_token_expires_at && new Date(user.reset_password_token_expires_at) > new Date()){
           if (!await sendMail(user.email, user.reset_password_token)) {
                return NextResponse.json({
                    success: false,
                    status: 500
                });
            }
            return NextResponse.json({
                success: true,
                status: 200
            });
        }

        const token: string = resetPasswordToken(user.id);

        await prisma.users.update({
            where: {
                id: user.id
            }
            ,
            data: {
                reset_password_token: token,
                reset_password_token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }
        });

        if (!await sendMail(user.email, token)) {
            return NextResponse.json({
                success: false,
                status: 500
            });
        }
        return NextResponse.json({
            success: true,
            status: 200
        });

    } catch (error) {
        if (error instanceof ZodError) {
            return Response.json({errors: z.flattenError(error)}, {status: 400})
        }

        return Response.json({message: "Server error"}, {status: 500});
    }

    function retrieveFailResponse(): Response {
        return Response.json(
            {error: 'Invalid credential'},
            {status: 401}
        );
    }

    function mountResetLinkByToken(token:string): string {
        return `${Env.get("TRIPFY_API_BASE_URL")}/reset-password?token=${token}`;
    }

    async function  sendMail(email:string, token: string): Promise<string> {
        return await sendResetPasswordEmail(email, mountResetLinkByToken(token));
    }
}