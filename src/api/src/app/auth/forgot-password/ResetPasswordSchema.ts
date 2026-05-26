import {z} from "zod";

export default z.object({
    token: z.string(),
    password: z.string().min(6).max(100)
});
