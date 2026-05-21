import RegisterSchema from "@/app/auth/register/RegisterSchema";
import {ZodError, z} from "zod";
import * as bcrypt from 'bcrypt';
import {prisma} from "@/lib/prisma";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const validation = await RegisterSchema.parseAsync(body);

        const passwordHash = await bcrypt.hash(validation.password, 10);

        await prisma.users.create({
            data: {
                email: validation.email,
                password: passwordHash,
                name: validation.name,
                address: validation.address,
                number: validation.number,
                cep: validation.cep,
                complement: validation.complement,
                state: validation.state
            }
        });

        return Response.json({
            message: "User created",
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return Response.json({errors: z.flattenError(error)}, {status: 400})
        }

        return Response.json({message: "Server error"}, {status: 500});
    }
}