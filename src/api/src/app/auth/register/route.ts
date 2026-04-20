import RegisterSchema from "@/app/auth/register/RegisterSchema";
import {ZodError} from "zod";
import * as z from "zod";
import * as bcrypt from 'bcrypt';
import {prisma} from "@/lib/prisma";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const response = await RegisterSchema.parseAsync(body);

        const passwordHash = await bcrypt.hash(response.password, 10);

        const user = await prisma.users.create({
            data: {
                email: response.email,
                password:passwordHash,
                name: response.name,
                address: response.address,
                number: response.number,
                cep: response.cep,
                complement: response.complement,
                state: response.state
            }
        });

        return Response.json({
            message: 'Usuário criado com sucesso',
            user: {
                id: user.id,
                email: user.email,
                password:user.password,
                name:user.name,
                address:user.address,
                number:user.number,
                cep:user.cep,
                complement:user.complement,
                state:user.state
            }
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return Response.json({errors: z.flattenError(error)}, {status: 400})
        }

        return Response.json({message:"Erro no servidor"}, {status: 500});
    }
}