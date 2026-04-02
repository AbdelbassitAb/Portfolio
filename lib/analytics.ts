"use client"

type EventValue = string | number | boolean | null | undefined
type EventParams = Record<string, EventValue>
const CONTACT_INTENT_THRESHOLD = 2
const contactIntentActions = new Set<string>()
let didTrackContactIntent = false

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: EventParams) => void
  }
}

/**
 * Generic GA4 event wrapper that safely no-ops when gtag is unavailable.
 */
export function trackEvent(eventName: string, params: EventParams = {}) {
  if (process.env.NODE_ENV === "development") {
    console.info(`[analytics] ${eventName}`, params)
  }

  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", eventName, params)
}

export function trackCTA(ctaName: string, location: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    location,
  })

  if (ctaName === "linkedin" || ctaName === "github" || ctaName === "email" || ctaName === "phone") {
    trackContactIntentAction(ctaName)
  }
}

export function trackNavigation(sectionName: string) {
  trackEvent("navigation_click", {
    section_name: sectionName,
  })
}

export type ProjectInteractionAction = "card_click" | "open_modal" | "github_click"

export function trackProject(action: ProjectInteractionAction, projectName: string) {
  trackEvent("project_interaction", {
    project_name: projectName,
    action,
  })
}

export function trackSectionView(sectionName: string) {
  trackEvent("section_view", {
    section_name: sectionName,
  })
}

export function trackProjectImpression(projectName: string, projectPosition: number) {
  trackEvent("project_impression", {
    project_name: projectName,
    project_position: projectPosition,
    section_name: "projects",
  })
}

export function trackContactIntentAction(actionType: "linkedin" | "github" | "email" | "phone" | "cv_download") {
  contactIntentActions.add(actionType)

  if (didTrackContactIntent || contactIntentActions.size < CONTACT_INTENT_THRESHOLD) return

  didTrackContactIntent = true

  trackEvent("contact_intent", {
    interaction_count: contactIntentActions.size,
    clicked_types: Array.from(contactIntentActions).sort().join(","),
  })
}
