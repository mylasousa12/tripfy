import {z} from "zod";

export default z.object({
    email: z.string(),
    token: z.string(),
    password: z.string().min(6).max(100)
});
