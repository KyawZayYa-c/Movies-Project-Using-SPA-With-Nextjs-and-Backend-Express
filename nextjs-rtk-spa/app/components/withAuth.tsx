'use client';

import { useAppSelector } from "@/lib/hooks";
import { selectAuth } from "@/lib/features/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuth(Component: React.JSX.ElementType, ...props: any[]) {
    return function AuthenticatedComponent() {
        const auth = useAppSelector(selectAuth);
        const router = useRouter();
        const pathname = usePathname();

        useEffect(() => {
            if (!auth) {
                router.push(`/login?redirectTo=${pathname}`);
            }
        }, [auth, router, pathname]);

        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}