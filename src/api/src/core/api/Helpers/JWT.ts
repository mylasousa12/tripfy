import * as jwt from 'jsonwebtoken';
import {Env} from "@/core/api/Helpers/Env";

const jwtToken: jwt.Secret = Env.get("JWT_SECRET");
const jwtResetPassword = Env.get("JWT_RESET_PASSWORD_SECRET");

export function generateToken(userId: number) {
    return jwt.sign(
        {
            userId,
            type: 'auth'
        },
        jwtToken,
        {expiresIn: '1d'}
    );
}

export function verifyToken(token: string) {
    const decoded = jwt.verify(
        token,
        jwtToken,
    ) as {
        id: string,
        type: string;
    };

    if (decoded.type !== "auth") {
        throw new Error('Invalid token type');
    }

    return decoded;
}


export function resetPasswordToken(userId: number) {
    return jwt.sign(
        {
            userId,
            type: 'reset-password'
        },
        jwtResetPassword,
        {
            expiresIn: "15m"
        }
    );
}

export function verifyResetPasswordToken(token: string) {
    const decoded = jwt.verify(
        token,
        jwtResetPassword,
    ) as {
        id: number,
        type: "reset-password";
    };

    if(decoded.type !== "reset-password") {
        throw new Error("Invalid token");
    }
    return decoded;
}


