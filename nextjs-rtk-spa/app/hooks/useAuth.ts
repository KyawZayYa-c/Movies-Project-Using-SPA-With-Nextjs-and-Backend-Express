'use client';

import {selectAuth} from "@/lib/features/auth/authSlice";
import {useAppSelector} from "@/lib/hooks";

export default function useAuth() {
    const auth = useAppSelector(selectAuth);
    return auth;
}