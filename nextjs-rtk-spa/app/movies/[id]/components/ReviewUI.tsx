'use client';
import style from './ReviewUI.module.css'
import {Review} from "@/lib/types";
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import {useState} from "react";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import ReviewDialog from "@/app/movies/[id]/components/ReviewDialog";
import {useDeleteReviewMutation} from "@/lib/features/review/reviewApiSlice";

interface ReviewUI{
    review : Review;
}

export default function ReviewUI({review} : ReviewUI){
    const [openConfirm, setOpenConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleteReview, deleteReviewResult] = useDeleteReviewMutation();
    const handleClickOpen = () => {
        setOpen(true);
    }
    const onOkHandler = () => {
        console.log('Ok handler');
        deleteReview(review)
            .then(() => {
                console.log('Review successfully deleted');
            })
    }
    const onCancelHandler = () => {
        console.log('Cancel handler');
    }
    const onDeleteHandler = () => {
        console.log('Delete handler');
        setOpenConfirm(true);
    }

    return (<div className={style["review-page-container"]} >
        <ConfirmDialog
            message={"Are you sure you want to delete this review?"}
            dlgOpen={openConfirm}
            onOk={onOkHandler}
            onCancel={onCancelHandler}
            setOpen={setOpenConfirm}
        />
        <ReviewDialog open={open} setOpen={setOpen} reviewToEdit={review} movieId={review.movie} />
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent >
                    <Stack spacing={1}>
                        <Rating name="half-rating-read" defaultValue={review?.rating} readOnly />
                    </Stack>
                    <Typography component="div" variant="h5">
                        {review.review}
                    </Typography>
                    <Box>
                        <Button variant='contained' onClick={handleClickOpen} >Edit</Button>
                        &nbsp;
                        <Button variant="contained" onClick={onDeleteHandler} >Delete</Button>
                    </Box>
                </CardContent>
            </Box>

        </Card>
    </div>)
}