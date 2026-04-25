import * as jwt from 'jsonwebtoken';

const jwtToken = process.env.JWT_SECRET!;

export function generateToken(userId:number) {
    return jwt.sign(
        {userId},
        jwtToken,
        {expiresIn: '1d'}
    );
}


