'use client';

import {useForm} from "react-hook-form";
import {AuthSchema, AuthSchemaForm} from "@/lib/schema/authSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {login, selectAuth} from "@/lib/features/auth/authSlice";
import {useRouter, useSearchParams} from "next/navigation";

export default function LoginUI(){
    const dispatch = useAppDispatch();
    const auth = useAppSelector(selectAuth);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');
    console.log('RedirectTo', redirectTo);
    const {
        register ,
        handleSubmit,
        watch,
        reset,
        formState: { errors, touchedFields },
    } = useForm<AuthSchemaForm>({
        resolver : zodResolver(AuthSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    });
    const onSubmit = (data: any) => {
        console.log('Data', data);
        dispatch(login(data))
            .unwrap()
            .then(response => {
                console.log('Login Success ', response);
                if(redirectTo){
                    router.push(redirectTo);
                }else {
                    router.push('/');
                }
            }, err => {
                console.log('Login Failed 1 ', err);
            })
            .catch(error => {
                console.log('Login Error ', error)
            })
    }
    return (<div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label = "Username"
                fullWidth
                margin="normal"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
            />

            <TextField
                label = "Password"
                fullWidth
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

                <Button type="submit" variant={"contained"} >
                    Login
                </Button>
        </form>
    </div>)
}