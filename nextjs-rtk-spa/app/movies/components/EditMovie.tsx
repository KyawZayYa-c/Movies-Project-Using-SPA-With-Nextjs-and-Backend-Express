'use client';
import '../movies.css'
import Button from "@mui/material/Button";
import MovieDialog from "@/app/movies/components/MovieDialog";
import {useState} from "react";
import {Movie} from "@/lib/types";

interface EditMovieProps{
    movie: Movie,
}

export default function EditMovie({movie}: EditMovieProps) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    return (<div className={'movies-page-container'}>
        <Button variant="contained"   onClick={handleClickOpen}>
            Edit
        </Button>
        <MovieDialog setOpen={setOpen} open={open} movieToEdit={movie} />
    </div>)
}

