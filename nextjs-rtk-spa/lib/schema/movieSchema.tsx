import z from "zod";

export const MovieSchema = z.object({
    title: z.string().min(1, "Title is required"),
    year: z.coerce.number<number>().min(1, "Year is required"),
    director : z.object({
        name : z.string().min(1, "Director name is required"),
        phoneNo : z.string().min(1, "Phone number is required"),
    })
});

export type MovieSchemaForm = z.infer<typeof MovieSchema>;
