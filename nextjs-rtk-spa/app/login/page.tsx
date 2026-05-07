'use client';

import LoginUI from "@/app/login/components/LoginUI";
import {useAppSelector} from "@/lib/hooks";
import {useRouter} from "next/navigation";
import {selectAuth} from "@/lib/features/auth/authSlice";
import {useEffect} from "react";

export default function LoginPage(){
    const auth = useAppSelector(selectAuth);
    const router = useRouter();
    useEffect(() => {
        if(auth){
            console.log('Already logged in');
            router.push("/");
        }
    }, []);
    return (<div>
        <LoginUI />
    </div>)
}