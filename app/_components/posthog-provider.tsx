"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const POSTHOG_KEY = "phc_spidsnaFy49eqKiSt6oLIVzJAtqgpPvdc0zJPwDb7hW";
const POSTHOG_HOST = "https://us.i.posthog.com";

// Initialize PostHog only on the client side
if (typeof window !== "undefined") {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    defaults: "2025-11-30",
    person_profiles: "identified_only",
    capture_pageview: false, // We capture pageviews manually for better control
    capture_pageleave: true, // Capture when users leave pages
    autocapture: true, // Auto-capture clicks, form submissions, etc.
    session_recording: {
      maskAllInputs: false, // Set to true if you want to mask all inputs
      maskInputFn: (text, element) => {
        // Mask sensitive inputs (passwords, credit cards, etc.)
        const inputElement = element as HTMLInputElement | null;
        if (
          inputElement?.type === "password" ||
          inputElement?.name?.includes("credit") ||
          inputElement?.name?.includes("card") ||
          inputElement?.name?.includes("cvv") ||
          inputElement?.name?.includes("ssn")
        ) {
          return "*".repeat(text.length);
        }
        return text;
      },
    },
    loaded: (posthog) => {
      // Enable debug mode in development
      if (process.env.NODE_ENV === "development") {
        posthog.debug();
      }
    },
  });
}

// Component to track pageviews
function PostHogPageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

// Wrapper with Suspense for searchParams
function SuspendedPageviewTracker() {
  return (
    <Suspense fallback={null}>
      <PostHogPageviewTracker />
    </Suspense>
  );
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <SuspendedPageviewTracker />
      {children}
    </PHProvider>
  );
}

// Export posthog instance for use in other components
export { posthog };
