'use client';
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
import {useEffect, useState} from "react";

interface ConfirmDialogProps{
    message: string;
    onOk?: () => void;
    onCancel?: () => void;
    dlgOpen : boolean;
    setOpen : (open: boolean) => void;
}

export default function ConfirmDialog({message, onOk, onCancel, dlgOpen, setOpen}: ConfirmDialogProps){

    const handleClose = () => setOpen(false);

    if(!dlgOpen){
        return null;
    }else {
        return (  <React.Fragment>
            <Dialog open={dlgOpen} onClose={handleClose}  >
                <DialogTitle>{message}</DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={()=> {
                        onOk?.();
                        setOpen(false);
                    }}>OK</Button>
                    <Button onClick={()=>{
                        onCancel?.();
                        setOpen(false);
                    }} type={"button"} >Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>)
    }
}

//25