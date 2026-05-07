import z from 'zod';
import {MovieSchema} from "@/lib/schema/movieSchema";

export const AuthSchema = z.object({
    username : z.string().min(2, "Username is required"),
    password: z.string().min(2, "Password is required"),
});

export type AuthSchemaForm = z.infer<typeof AuthSchema>;