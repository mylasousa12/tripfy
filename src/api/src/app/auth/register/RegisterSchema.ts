import * as z from "zod";
import {prisma} from '@/lib/prisma';

export default z.object({
    email: z.email().max(100),
    password: z.string().max(100).min(8).uppercase().lowercase(),
    name: z.string().max(100),
    address: z.string().max(255),
    number: z.int().default(0),
    cep:z.string().length(8),
    complement:z.string().max(255).nullable(),
    state: z.string().length(2)

}).refine(
    async (data) => {
        return !await prisma.users.findUnique({
            where: {email: data.email}
        });
    },
    {
        message: 'Email já cadastrado',
        path: ['email'],
    }
);