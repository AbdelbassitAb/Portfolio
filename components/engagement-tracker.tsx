"use client"

import { useEffect, useRef } from "react"
import { trackEvent, trackSectionView } from "@/lib/analytics"

const SCROLL_THRESHOLDS = [25, 50, 75, 90] as const
const SECTION_IDS = ["experience", "projects", "contact"] as const
const TIME_MARKS_SECONDS = [15, 30, 60] as const

export function EngagementTracker() {
  const seenScrollDepths = useRef<Set<number>>(new Set())
  const seenSections = useRef<Set<string>>(new Set())
  const maxScrollPercent = useRef(0)
  const timeOnPageSeconds = useRef(0)
  const startTimeMs = useRef(0)
  const didTrackEngagedSession = useRef(false)
  const didTrackPageExit = useRef(false)

  const maybeTrackEngagedSession = () => {
    if (didTrackEngagedSession.current) return
    if (timeOnPageSeconds.current < 30 || maxScrollPercent.current < 50) return

    didTrackEngagedSession.current = true
    trackEvent("engaged_session", {
      seconds_on_page: timeOnPageSeconds.current,
      max_scroll_percent: Math.round(maxScrollPercent.current),
    })
  }

  useEffect(() => {
    startTimeMs.current = Date.now()

    const onScroll = () => {
      const maxScrollable = document.documentElement.scrollHeight - window.innerHeight
      if (maxScrollable <= 0) return

      const scrolled = window.scrollY
      const scrollPercent = (scrolled / maxScrollable) * 100
      maxScrollPercent.current = Math.max(maxScrollPercent.current, Math.min(100, scrollPercent))

      for (const threshold of SCROLL_THRESHOLDS) {
        if (scrollPercent >= threshold && !seenScrollDepths.current.has(threshold)) {
          seenScrollDepths.current.add(threshold)
          trackEvent("scroll_depth", { percent: threshold })
        }
      }

      maybeTrackEngagedSession()
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const sectionName = entry.target.id
          if (seenSections.current.has(sectionName)) continue

          seenSections.current.add(sectionName)
          trackSectionView(sectionName)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.35,
      }
    )

    for (const sectionId of SECTION_IDS) {
      const sectionNode = document.getElementById(sectionId)
      if (sectionNode) observer.observe(sectionNode)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timers = TIME_MARKS_SECONDS.map((seconds) =>
      window.setTimeout(() => {
        timeOnPageSeconds.current = Math.max(timeOnPageSeconds.current, seconds)
        trackEvent("time_on_page", { seconds })
        maybeTrackEngagedSession()
      }, seconds * 1000)
    )

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  useEffect(() => {
    const handlePageExit = () => {
      if (didTrackPageExit.current) return
      didTrackPageExit.current = true

      const elapsedSeconds = Math.max(1, Math.round((Date.now() - startTimeMs.current) / 1000))

      trackEvent("page_exit", {
        time_spent_seconds: elapsedSeconds,
        max_scroll_percent: Math.round(maxScrollPercent.current),
        transport_type: "beacon",
      })
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") handlePageExit()
    }

    window.addEventListener("pagehide", handlePageExit)
    window.addEventListener("beforeunload", handlePageExit)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("pagehide", handlePageExit)
      window.removeEventListener("beforeunload", handlePageExit)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  return null
}
