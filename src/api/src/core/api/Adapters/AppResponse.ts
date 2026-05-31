export default class AppResponse extends Response {
    public static unauthorized(): Response {
        return this.fail("Unauthorized", null, 401);
    }

    public static serverError(): Response {
        return this.fail("Server error", null, 500);
    }

    private static generic(message: string | null, data: object | null, status: number): Response {
        const body: {
            message?: string;
            data?: object;
        } = {};

        if (message !== null) {
            body.message = message;
        }

        if (data !== null) {
            body.data = data;
        }

        return this.json(body, {status: status})
    }

    public static success(message: string | null = null, data: object | null = null, status: number = 200): Response {
        return this.generic(message,data,status);
    }

    public static fail(message: string | null = null, data: object | null = null, status: number = 400): Response {
        return this.generic(message,data,status);
    }

}