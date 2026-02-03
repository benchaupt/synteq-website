import posthog from "posthog-js";

/**
 * PostHog Analytics Utilities
 *
 * This file provides helper functions for common PostHog tracking patterns.
 * Import these functions in your components to track custom events.
 */

/**
 * Track a custom event
 * @example
 * trackEvent('button_clicked', { button_name: 'cta', page: 'home' })
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  posthog.capture(eventName, properties);
}

/**
 * Identify a user (call when user logs in or signs up)
 * @example
 * identifyUser('user_123', { email: 'user@example.com', name: 'John Doe' })
 */
export function identifyUser(
  userId: string,
  properties?: Record<string, unknown>
) {
  posthog.identify(userId, properties);
}

/**
 * Reset user identity (call on logout)
 */
export function resetUser() {
  posthog.reset();
}

/**
 * Set properties on the current user without identifying
 * @example
 * setUserProperties({ plan: 'pro', company: 'Acme Inc' })
 */
export function setUserProperties(properties: Record<string, unknown>) {
  posthog.setPersonProperties(properties);
}

/**
 * Track a link click with destination
 * @example
 * trackLinkClick('docs', 'https://docs.example.com')
 */
export function trackLinkClick(linkName: string, destination: string) {
  posthog.capture("link_clicked", {
    link_name: linkName,
    destination,
  });
}

/**
 * Track form submission
 * @example
 * trackFormSubmit('contact_form', { source: 'footer' })
 */
export function trackFormSubmit(
  formName: string,
  properties?: Record<string, unknown>
) {
  posthog.capture("form_submitted", {
    form_name: formName,
    ...properties,
  });
}

/**
 * Track a CTA (Call to Action) click
 * @example
 * trackCTAClick('get_started', 'hero_section')
 */
export function trackCTAClick(ctaName: string, location: string) {
  posthog.capture("cta_clicked", {
    cta_name: ctaName,
    location,
  });
}

/**
 * Track pricing page interactions
 * @example
 * trackPricingInteraction('view_plan', { plan: 'enterprise' })
 */
export function trackPricingInteraction(
  action: string,
  properties?: Record<string, unknown>
) {
  posthog.capture("pricing_interaction", {
    action,
    ...properties,
  });
}

/**
 * Track feature flag exposure for experiments
 * @example
 * const variant = getFeatureFlag('new_homepage')
 */
export function getFeatureFlag(flagKey: string): string | boolean | undefined {
  return posthog.getFeatureFlag(flagKey);
}

/**
 * Check if a feature flag is enabled
 * @example
 * if (isFeatureEnabled('new_checkout')) { ... }
 */
export function isFeatureEnabled(flagKey: string): boolean {
  return posthog.isFeatureEnabled(flagKey) ?? false;
}

/**
 * Track scroll depth (useful for long-form content)
 * @example
 * trackScrollDepth(50, 'blog_post', 'my-article-slug')
 */
export function trackScrollDepth(
  percentage: number,
  contentType: string,
  contentId: string
) {
  posthog.capture("scroll_depth", {
    percentage,
    content_type: contentType,
    content_id: contentId,
  });
}

/**
 * Group a user into a company/organization (for B2B analytics)
 * @example
 * setGroup('company', 'company_123', { name: 'Acme Inc', plan: 'enterprise' })
 */
export function setGroup(
  groupType: string,
  groupKey: string,
  properties?: Record<string, unknown>
) {
  posthog.group(groupType, groupKey, properties);
}

/**
 * Start session recording (if not already recording)
 */
export function startSessionRecording() {
  posthog.startSessionRecording();
}

/**
 * Stop session recording
 */
export function stopSessionRecording() {
  posthog.stopSessionRecording();
}

/**
 * Opt user out of tracking (for GDPR compliance)
 */
export function optOutTracking() {
  posthog.opt_out_capturing();
}

/**
 * Opt user back into tracking
 */
export function optInTracking() {
  posthog.opt_in_capturing();
}

/**
 * Check if user has opted out of tracking
 */
export function hasOptedOut(): boolean {
  return posthog.has_opted_out_capturing();
}
