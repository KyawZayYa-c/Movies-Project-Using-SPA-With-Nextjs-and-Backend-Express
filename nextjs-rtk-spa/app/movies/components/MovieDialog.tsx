import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MovieSchema, MovieSchemaForm} from "@/lib/schema/movieSchema";
import {Movie} from "@/lib/types";

interface MovieDialogProps{
    movieToEdit? : Movie;
    open: boolean;
    setOpen : (open: boolean) => void;
}

export default function MovieDialog({open, setOpen, movieToEdit} : MovieDialogProps) {

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data : MovieSchemaForm) => {
        console.log('form submitted', data);
    }

    const {
        register,
        handleSubmit,
        watch,
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
