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
        const validation : {email:string} = await ForgotPasswordSchema.parseAsync(body);

        const user : {email:string, id: number} | null = await prisma.users.findUnique({
            where: {email: validation.email}
        });

        if (!user) {
            return retrieveFailResponse();
        }

        const token:string = resetPasswordToken(user.id);

        const resetLink = `${Env.get("TRIPFY_API_BASE_URL")}/reset-password?token=${token}`;
        const emailSent = await sendResetPasswordEmail(user.email, resetLink);
        if(!emailSent) {
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
        console.log(error)
        if (error instanceof ZodError) {
            return Response.json({errors: z.flattenError(error)}, {status: 400})
        }

        return Response.json({message: "Server error"}, {status: 500});
    }

    function retrieveFailResponse() {
        return Response.json(
            {error: 'Invalid credential'},
            {status: 401}
        );
    }
}