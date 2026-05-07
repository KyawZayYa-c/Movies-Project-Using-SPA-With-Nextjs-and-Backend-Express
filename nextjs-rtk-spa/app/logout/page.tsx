'use client';

import Button from "@mui/material/Button";
import {useAppDispatch} from "@/lib/hooks";
import {logout} from "@/lib/features/auth/authSlice";
import {useRouter} from "next/navigation";

export default function LogoutPage(){
    const dispatch = useAppDispatch();
    const router = useRouter();
    const btnLogoutHandler = () => {
        dispatch(logout())
            router.push("/login");
    };

    return (<div>
        <Button type={"button"} variant={"contained"} onClick = {btnLogoutHandler} >
            Logout
        </Button>
    </div>)
}