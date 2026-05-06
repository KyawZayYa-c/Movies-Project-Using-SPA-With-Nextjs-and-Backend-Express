'use client';

import {useState} from "react";
import Button from "@mui/material/Button";
import ReviewDialog from "@/app/movies/[id]/components/ReviewDialog";
import {Movie} from "@/lib/types";

interface ReviewEntryProps {
    movieId:string;
}

export default function ReviewEntry({movieId }: ReviewEntryProps) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }
    return (<div>
        <Button variant="contained" onClick={handleClickOpen}>
            New
        </Button>
        <ReviewDialog movieId={movieId} open={open} setOpen={setOpen}/>
    </div>)
}