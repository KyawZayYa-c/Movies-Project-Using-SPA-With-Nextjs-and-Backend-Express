import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MovieSchema, MovieSchemaForm} from "@/lib/schema/movieSchema";
import {Movie} from "@/lib/types";
import {useSaveMovieMutation, useUpdateMovieMutation} from "@/lib/features/movie/movieApiSlice";

interface MovieDialogProps{
    movieToEdit? : Movie;
    open: boolean;
    setOpen : (open: boolean) => void;
}

export default function MovieDialog({open, setOpen, movieToEdit} : MovieDialogProps) {
    const [saveMovie, saveMovieResult] = useSaveMovieMutation();
    const [updateMovie, updateMovieResult] = useUpdateMovieMutation();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, touchedFields },
    } = useForm<MovieSchemaForm>({
        resolver : zodResolver(MovieSchema),
        defaultValues : {
            title : movieToEdit ? movieToEdit.title : "",
            year : movieToEdit ? movieToEdit.year : 0,
            director : {
                name : movieToEdit ? movieToEdit?.director?.name : "",
                phoneNo : movieToEdit ? movieToEdit?.director?.phoneNo : ""
            }

        }
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data : MovieSchemaForm) => {
        if(movieToEdit){
            console.log('Updated movie ', data);
            let movieToUpdate : Movie = {
                ...movieToEdit,
                ...data,
                director : {
                    ...movieToEdit.director,
                    ...data.director,
                }
            }
            updateMovie(movieToUpdate)
                .unwrap()
                .then(result => {
                    console.log('movie update ', result);
                    setOpen(false);
                    reset();
                })
                .catch(err => {
                    console.error("Update Error:", err); // error ကို ဒီမှာ ဖတ်လို့ရပါပြီ
                });
        }else {

            saveMovie(data as Partial<Movie>)
                .unwrap()
                .then(result => {
                    console.log('Saved movie ', result);
                    setOpen(false);
                    reset();
                })
        }
    }
    if (!open){
        return null
    }else {
        return (
            <React.Fragment>

                <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"sm"} >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogTitle>
                            {movieToEdit ? "Edit Movie" : "New Movie"}
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Title"
                                fullWidth
                                margin="normal"
                                {...register("title")}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />

                            <TextField
                                label="Year"
                                fullWidth
                                margin="normal"
                                {...register("year")}
                                error={!!errors.year}
                                helperText={errors.year?.message}
                            />

                            <TextField
                                label="Director Name"
                                fullWidth
                                margin="normal"
                                {...register("director.name")}
                                error={!!errors.director?.name}
                                helperText={errors.director?.name?.message}
                            />

                            <TextField
                                label="Director Phone No"
                                fullWidth
                                margin="normal"
                                {...register("director.phoneNo")}
                                error={!!errors.director?.phoneNo}
                                helperText={errors.director?.phoneNo?.message}
                            />


                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">
                                {movieToEdit ? "Update" : "Save"}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
        );
    }
}
