import {prisma} from "@/lib/prisma";
import Auth from "@/core/api/Helpers/Auth";
import AppResponse from "@/core/api/Adapters/AppResponse";

export async function DELETE(request: Request) {
    const result = await prisma.users.delete({
        where: {
            id: Auth.userId(request) ?? undefined
        }
    });

    if (!result) {
        return AppResponse.unauthorized();
    }

    return AppResponse.success("User deleted");
}