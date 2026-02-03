"use client"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

interface ModelSearchProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ModelSearch({ value, onChange, className }: ModelSearchProps) {
  const [localValue, setLocalValue] = useState(value)

  // Debounce the onChange callback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [localValue, onChange, value])

  // Sync external value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
  }, [])

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white/40" />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder="Search models by name, author, or task..."
        className="w-full bg-background-secondary border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-accent/50 transition-colors"
      />
    </div>
  )
}
