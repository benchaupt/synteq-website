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
    <div className={cn("group/field relative", className)}>
      <div className="flex items-center gap-3 px-2 py-3">
        <Search className="size-5 shrink-0 text-white/40 group-focus-within/field:text-accent transition-colors duration-300" />
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder="Search models by name, author, or task..."
          className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
        />
      </div>
      <span className="absolute bottom-0 left-0 w-full h-px bg-white/25" />
      <span className="absolute bottom-0 left-0 w-full h-px bg-accent origin-left scale-x-0 group-focus-within/field:scale-x-100 transition-transform duration-300" />
    </div>
  )
}
