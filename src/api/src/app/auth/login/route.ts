import LoginSchema from "@/app/auth/login/LoginSchema";
import * as bcrypt from 'bcrypt';
import {prisma} from "@/lib/prisma";
import {z, ZodError} from "zod";
import {generateToken} from "@/core/api/Helpers/JWT";
import AppResponse from "@/core/api/Adapters/AppResponse";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const validation: { email: string, password: string } = await LoginSchema.parseAsync(body);

        if (!validation.email) {
            return retrieveFailResponse();
        }

        const user: { password: string, id: number } | null = await prisma.users.findUnique({
            where: {email: body.email}
        });

        if (user === null) {
            return retrieveFailResponse();
        }

        if (await bcrypt.compare(validation.password, user.password)) {
            const token = generateToken(user.id);
            user.password = '***';
            return AppResponse.json({user: user, token});
        }

        return retrieveFailResponse();
    } catch (error) {
        if (error instanceof ZodError) {
            return AppResponse.json({errors: z.flattenError(error)});
        }

        return AppResponse.serverError();
    }
}

function retrieveFailResponse() {
    return AppResponse.fail();
}