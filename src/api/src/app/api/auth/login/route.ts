import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;


export async function POST(request:Request) {

    const { email, password } = await request.json();

    if(email !== 'admin@email.com' || password !== '123') {
        return Response.json({error: 'Credentials invalid'}, {status: 401});
    }

    const token = jwt.sign(
        {email},
        SECRET,
        {expiresIn: '1h' }
    );

    return Response.json({token});
}