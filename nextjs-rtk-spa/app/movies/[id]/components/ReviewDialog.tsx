'use client';

import {Review} from "@/lib/types";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {ReviewSchema, ReviewSchemaForm} from "@/lib/schema/reviewSchema";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import {useState} from "react";
import {useSaveReviewMutation} from "@/lib/features/review/reviewApiSlice";

interface ReviewDialogProps {
    movieId : string;
    reviewToEdit?: Review;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function ReviewDialog({movieId, reviewToEdit, open, setOpen}: ReviewDialogProps) {
    const [rating, setRating] = useState(reviewToEdit? reviewToEdit.rating : 0);
    const [saveReview, SaveReviewResult] = useSaveReviewMutation();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, touchedFields },
    } = useForm<ReviewSchemaForm>({
        resolver : zodResolver(ReviewSchema),
        defaultValues : {
            rating : reviewToEdit ? reviewToEdit.rating : 0,
            review : reviewToEdit ? reviewToEdit.review : '',

        }
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data : ReviewSchemaForm) => {

        if(reviewToEdit){
            console.log('review updated', data);
            setOpen(false);
        }else {
            let reviewToSave : Partial<Review> = {
                ...data,
                movie: movieId
            }
            console.log('form submitted', reviewToSave);

            saveReview(reviewToSave)
                .unwrap()
                .then(() => {
                    reset();
                    setOpen(false);
                 })
        }
        
    }



    const ratingChangeHandler =(value: number | null)=>{
        let num= value??0;
        setValue('rating', num);
        setRating(num);
    }

    if (!open){
        return null
    }else {
        return (
            <React.Fragment>

                <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"sm"} >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogTitle>
                            {reviewToEdit ? "Edit Review" : "New Review"}
                        </DialogTitle>
                        <DialogContent>
                            <Stack spacing={1}>
                                <Rating name="half-rating-read" defaultValue={rating}
                                        onChange={(event, newValue) => {
                                            ratingChangeHandler(newValue);
                                        }}
                                />
                                <div style={{
                                    color : "red",
                                }} >
                                    { !!errors.rating && errors.rating?.message}
                                </div>
                            </Stack>
                            <TextField
                                label="Title"
                                fullWidth
                                margin="normal"
                                {...register("review")}
                                error={!!errors.review}
                                helperText={errors.review?.message}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">
                                {reviewToEdit ? "Update" : "Save"}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
        );
    }
}

