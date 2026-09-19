"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * AutoSyncPoller
 * Invisible client-side heartbeat poller that ensures news is continuously
 * fetched from newsmediakiran.com even on serverless or cloud platforms.
 */
export function AutoSyncPoller() {
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const performCheck = async () => {
      try {
        const res = await fetch("/api/sync", {
          method: "GET",
          headers: { "Cache-Control": "no-cache" },
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.result?.newArticlesAdded > 0) {
            console.log(
              `⚡ [AutoSyncPoller] Fetched ${data.result.newArticlesAdded} new stories from newsmediakiran.com! Refreshing view...`
            );
            router.refresh();
          }
        }
      } catch (err) {
        // Silently catch network errors in background
      }
    };

    // Initial check 6 seconds after page loads
    const initialTimer = setTimeout(() => {
      performCheck();
    }, 6000);

    // Continuous background check every 2.5 minutes
    timer = setInterval(() => {
      performCheck();
    }, 2.5 * 60 * 1000);

    return () => {
      clearTimeout(initialTimer);
      if (timer) clearInterval(timer);
    };
  }, [router]);

  return null;
}
