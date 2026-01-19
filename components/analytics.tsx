/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

function AnalyticsContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (analytics) {
            logEvent(analytics, "page_view", {
                page_location: window.location.href,
                page_path: pathname,
            });
        }
    }, [pathname, searchParams]);

    return null;
}

export default function Analytics() {
    return (
        <Suspense fallback={null}>
            <AnalyticsContent />
        </Suspense>
    );
}
