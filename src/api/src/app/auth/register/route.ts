import RegisterSchema from "@/app/auth/register/RegisterSchema";
import {ZodError} from "zod";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const response = await RegisterSchema.parseAsync(body);

        return Response.json({body: body, response: response});
    } catch (error) {
        if (error instanceof ZodError) {
            return Response.json({errors: error.flatten()}, {status: 400})
        }

        return Response.json({message:"Erro no servidor"}, {status: 500});
    }
}