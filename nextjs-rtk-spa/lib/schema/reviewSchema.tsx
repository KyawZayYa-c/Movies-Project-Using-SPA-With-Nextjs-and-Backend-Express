import z from "zod";

export const ReviewSchema = z.object({
    rating: z.number().min(1, "Rating is required"),
    review : z.string().min(1, "Review is required"),
});

export type ReviewSchemaForm = z.infer<typeof ReviewSchema>;