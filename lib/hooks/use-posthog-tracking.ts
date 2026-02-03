"use client";

import { usePostHog } from "posthog-js/react";
import { useCallback } from "react";

/**
 * React hook for PostHog tracking with proper typing
 * Use this hook in client components for easy event tracking
 *
 * @example
 * const { trackEvent, trackCTA } = usePostHogTracking()
 * trackCTA('sign_up', 'hero_section')
 */
export function usePostHogTracking() {
  const posthog = usePostHog();

  const trackEvent = useCallback(
    (eventName: string, properties?: Record<string, unknown>) => {
      posthog?.capture(eventName, properties);
    },
    [posthog]
  );

  const trackCTA = useCallback(
    (ctaName: string, location: string, properties?: Record<string, unknown>) => {
      posthog?.capture("cta_clicked", {
        cta_name: ctaName,
        location,
        ...properties,
      });
    },
    [posthog]
  );

  const trackFormSubmit = useCallback(
    (formName: string, properties?: Record<string, unknown>) => {
      posthog?.capture("form_submitted", {
        form_name: formName,
        ...properties,
      });
    },
    [posthog]
  );

  const trackLinkClick = useCallback(
    (linkName: string, destination: string) => {
      posthog?.capture("link_clicked", {
        link_name: linkName,
        destination,
      });
    },
    [posthog]
  );

  const identifyUser = useCallback(
    (userId: string, properties?: Record<string, unknown>) => {
      posthog?.identify(userId, properties);
    },
    [posthog]
  );

  const resetUser = useCallback(() => {
    posthog?.reset();
  }, [posthog]);

  const setUserProperties = useCallback(
    (properties: Record<string, unknown>) => {
      posthog?.setPersonProperties(properties);
    },
    [posthog]
  );

  const getFeatureFlag = useCallback(
    (flagKey: string) => {
      return posthog?.getFeatureFlag(flagKey);
    },
    [posthog]
  );

  const isFeatureEnabled = useCallback(
    (flagKey: string) => {
      return posthog?.isFeatureEnabled(flagKey) ?? false;
    },
    [posthog]
  );

  return {
    posthog,
    trackEvent,
    trackCTA,
    trackFormSubmit,
    trackLinkClick,
    identifyUser,
    resetUser,
    setUserProperties,
    getFeatureFlag,
    isFeatureEnabled,
  };
}
