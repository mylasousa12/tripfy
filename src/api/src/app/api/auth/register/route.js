import {prisma} from "../../lib/prisma";
import bcrypt from 'bcrypt';

export async function POST(request) {
    const {email, password, name} = await request.json();
                                //password cryptography
    const hashedPassword = await bcrypt.hash(password, 10);
                        //save in database 
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    return Response.json(user);
}

