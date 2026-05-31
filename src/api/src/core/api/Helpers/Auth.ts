import {verifyToken} from "@/core/api/Helpers/JWT";
import {prisma} from "@/lib/prisma";

export default class Auth {
   public static userId(request: Request): number | null {
       const authHeader = request.headers.get("authorization");

       const token: string | undefined = authHeader?.split(" ")[1];

       if (token === undefined || token === "") {
           return null;
       }

       const decoded: {userId: number, type: "auth"} = verifyToken(token);

       return decoded.userId;
    }

    public static user(request: Request) {

       const userId: number | null = this.userId(request);

       if (userId === null) {
           return null;
       }

        return prisma.users.findUnique({
            where: {
                id: userId
            }
        });
    }
}