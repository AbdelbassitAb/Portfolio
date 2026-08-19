"use client"

import { useEffect, useState } from "react"

export function RotatingWords({ words, intervalMs = 2400 }: { words: string[]; intervalMs?: number }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs)
    return () => clearInterval(id)
  }, [words.length, intervalMs])

  return (
    <span key={index} className="animate-word-in inline-block font-semibold text-primary">
      {words[index]}
    </span>
  )
}
