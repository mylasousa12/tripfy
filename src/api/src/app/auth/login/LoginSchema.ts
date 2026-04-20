import * as z from "zod";

export default z.object({
    email: z.email().max(100),
    password: z.string().max(100).min(8).uppercase().lowercase()
});