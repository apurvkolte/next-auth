"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from 'react-hot-toast';

export default function AuthGuard({ children, role = ["user"] }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const hasNotified = useRef(false);
    const allowedRoles = Array.isArray(role) ? role : [role];

    useEffect(() => {
        if (status === "unauthenticated") {
            if (!hasNotified.current) {
                toast.error("You must be logged in to access this page");
                hasNotified.current = true;
            }
            router.replace("/");
        } else if (status === "authenticated" && !allowedRoles.includes(session.user.role)) {
            if (!hasNotified.current) {
                toast.error("You do not have permission to access this page");
                hasNotified.current = true;
            }
            router.replace("/");
        }
    }, [status, session, router, allowedRoles]);

    if (status === "loading") {
        return <div className="text-center mt-20 text-gray-500">Checking access...</div>;
    }

    if (status === "authenticated" && allowedRoles.includes(session.user.role)) {
        return <>{children}</>;
    }

    return null;
}
