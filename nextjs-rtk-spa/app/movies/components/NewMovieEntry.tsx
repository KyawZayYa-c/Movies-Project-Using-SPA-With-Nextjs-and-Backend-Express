'use client';
import '../movies.css'
import Button from "@mui/material/Button";
import MovieDialog from "@/app/movies/components/MovieDialog";
import {useState} from "react";

export default function NewMovieEntry(props: any) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    return (<div className={'movies-page-container'}>
        <Button variant="contained"  onClick={handleClickOpen}>
            New
        </Button>
        <MovieDialog setOpen={setOpen} open={open} />
    </div>)
}

