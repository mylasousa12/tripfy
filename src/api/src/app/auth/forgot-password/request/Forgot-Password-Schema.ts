import {z} from "zod";

export default z.object({
    email: z.string().max(100)
});
