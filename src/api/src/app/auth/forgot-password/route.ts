import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {ZodError, z} from "zod";
import {resetPasswordToken} from "@/core/api/Helpers/JWT";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const {email} = body;

        const user = await prisma.users.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User dont found"
                },
                {
                    status: 404
                }
            );
        }

        const token = resetPasswordToken(user.id);

        const resetLink = `process.env.TRIPFY_API_BASE_URL/reset-password?token=${token}`;

        return NextResponse.json(
            {
                success: true,
                message: 'Recovery link sent'
            }
        )
    } catch (error) {
        if (error instanceof ZodError) {
            return Response.json({errors: z.flattenError(error)}, {status: 400})
        }

        return Response.json({message: "Server error"}, {status: 500});
    }
}