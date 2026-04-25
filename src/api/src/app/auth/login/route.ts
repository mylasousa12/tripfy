import LoginSchema from "@/app/auth/login/LoginSchema";
import * as bcrypt from 'bcrypt';
import {prisma} from "@/lib/prisma";
import {z, ZodError} from "zod";
import {generateToken} from "@/core/api/Helpers/JWT";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const validation = await LoginSchema.parseAsync(body);

        if (!validation.email) {
            return retrieveFailResponse();
        }

        const user: { password: string } | null = await prisma.users.findUnique({
            where: {email: body.email}
        });

        if (user === null) {
            return retrieveFailResponse();
        }

        if (await bcrypt.compare(validation.password, user.password)) {
            // const token = generateToken(user.)
            return Response.json({body: body});
        }


        return retrieveFailResponse();
    } catch (error) {
        if (error instanceof ZodError) {
            return Response.json({errors: z.flattenError(error)}, {status: 400})
        }

        return Response.json({message: "Erro no servidor"}, {status: 500});
    }
}

function retrieveFailResponse() {
    return Response.json(
        {error: 'Credencial invalida'},
        {status: 401}
    );
}