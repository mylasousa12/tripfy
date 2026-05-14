import * as jwt from 'jsonwebtoken';

const jwtToken = process.env.JWT_SECRET!;
const jwtResetPassword = process.env.JWT_RESET_PASSWORD_SECRET!;

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
        id: string,
        type: string;
    };

    if (decoded.type !== "reset-password") {
        throw new Error('Invalid token type');
    }

    return decoded;
}


