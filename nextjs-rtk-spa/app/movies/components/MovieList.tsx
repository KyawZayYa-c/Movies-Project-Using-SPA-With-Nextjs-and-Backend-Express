'use client';

import {Movie} from "@/lib/types";
import MovieUi from "@/app/movies/components/MovieUi";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";
import {useState} from "react";
import ConfirmDialog from "@/app/components/ConfirmDialog";

interface MovieListProps{
    movies : Movie[];
}

function renderAction(movie : Movie){
    const router = useRouter()
    const [openConfirm, setOpenConfirm] = useState(false);

    const onDetailHandler = () => {
        console.log("Go to movie detail");
        router.push(`/movies/${movie._id}`)
    }

    const onDeleteHandler = () => {
        console.log("Go to movie delete");
        setOpenConfirm(true);
    }

    const onOkHandler = () => {
        console.log("Go to movie ok");
    }

    const onCancelHandler = () => {
        console.log('Go to movie cancel');
    }

    return ( <Box sx={{ display: 'flex', marginTop : 7, alignItems: 'end' }} >
                <ConfirmDialog
                    message={"Are you sure you want to delete this movie?"}
                    dlgOpen={openConfirm}
                    onOk={onOkHandler}
                    onCancel={onCancelHandler}
                    setOpen = {setOpenConfirm}
                />

                 <Button sx={{ marginRight : "13px"}} variant="contained" onClick={onDeleteHandler} >
                    Delete
                </Button>
                <Button  variant="contained" component="div" onClick={onDetailHandler} >
                    Movie Details
                </Button>
             </Box>)
}

export default function MovieList({movies} : MovieListProps){
    return (<div>
        {movies.map((movie)=><MovieUi
                     movie={movie}
                     key={movie._id}
                     render={renderAction}
        />)}
    </div>)
}