"use client"

import { cn } from "@/lib/utils"
import * as Select from "@radix-ui/react-select"
import { ChevronDown, Check, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"

interface ModelFiltersProps {
  taskTypes: string[]
  authors: string[]
  availableSizes?: string[]
  selectedTaskType: string | null
  selectedAuthor: string | null
  selectedSize: string | null
  search?: string
  onTaskTypeChange: (value: string | null) => void
  onAuthorChange: (value: string | null) => void
  onSizeChange: (value: string | null) => void
  onSearchChange?: (value: string) => void
  className?: string
}

const SIZE_OPTIONS = [
  { value: "small", label: "Small (<1B)", minParams: 0, maxParams: 1 },
  { value: "medium", label: "Medium (1B-10B)", minParams: 1, maxParams: 10 },
  { value: "large", label: "Large (10B-70B)", minParams: 10, maxParams: 70 },
  { value: "xlarge", label: "XL (70B+)", minParams: 70, maxParams: null },
]

const ALL_VALUE = "__all__"

function FilterSelect({
  placeholder,
  value,
  options,
  onChange,
}: {
  placeholder: string
  value: string | null
  options: { value: string; label: string }[]
  onChange: (value: string | null) => void
}) {
  const [open, setOpen] = useState(false)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)

  const checkScroll = useCallback(() => {
    const el = viewportRef.current
    if (!el) return
    setCanScrollUp(el.scrollTop > 2)
    setCanScrollDown(el.scrollTop < el.scrollHeight - el.clientHeight - 2)
  }, [])

  // Close dropdown on scroll outside it
  useEffect(() => {
    if (!open) return
    const handleWheel = (e: WheelEvent) => {
      if (!(e.target as HTMLElement).closest('[data-radix-popper-content-wrapper]')) {
        setOpen(false)
      }
    }
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchmove', () => setOpen(false), { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchmove', () => setOpen(false))
    }
  }, [open])

  return (
    <div className="group/field relative">
      <Select.Root
        open={open}
        value={value || ALL_VALUE}
        onValueChange={(v) => onChange(v === ALL_VALUE ? null : v)}
        onOpenChange={(isOpen) => {
          setOpen(isOpen)
          if (isOpen) {
            requestAnimationFrame(() => requestAnimationFrame(checkScroll))
          }
        }}
      >
        <Select.Trigger
          className="inline-flex items-center justify-between gap-2 px-2 py-2.5 min-w-[140px] text-sm text-white/50 hover:text-white focus:outline-none transition-colors group"
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="transition-transform duration-200 group-data-[state=open]:rotate-180">
            <ChevronDown className="size-4" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="bg-background-secondary overflow-hidden z-50 border border-white/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-1 data-[state=closed]:slide-out-to-top-1 duration-150"
            position="popper"
            sideOffset={8}
          >
            <div className="relative">
              {/* Top gradient mask */}
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-background-secondary to-transparent z-10 pointer-events-none transition-opacity duration-200",
                  canScrollUp ? "opacity-100" : "opacity-0"
                )}
              />

              <Select.Viewport
                ref={viewportRef}
                onScroll={checkScroll}
                className="max-h-[300px] overflow-y-auto"
                data-lenis-prevent
              >
                <Select.Item
                  value={ALL_VALUE}
                  className="px-4 py-2.5 text-sm text-white/60 outline-none cursor-pointer hover:bg-white/5 data-highlighted:bg-white/5 border-b border-white/5"
                >
                  <Select.ItemText>All</Select.ItemText>
                </Select.Item>
                {options.map((option, i) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className={cn(
                      "relative flex items-center px-4 py-2.5 pr-8 text-sm text-white/60 outline-none cursor-pointer hover:bg-white/5 data-highlighted:bg-white/5",
                      i > 0 && "border-t border-white/5"
                    )}
                    onPointerUp={() => {
                      if (option.value === value) {
                        onChange(null)
                      }
                    }}
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator className="absolute right-3">
                      <Check className="size-4 text-accent" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>

              {/* Bottom gradient mask + chevron */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background-secondary via-background-secondary/80 to-transparent z-10 pointer-events-none flex items-end justify-center pb-2 transition-opacity duration-200",
                  canScrollDown ? "opacity-100" : "opacity-0"
                )}
              >
                <ChevronDown className="size-4 text-white/60" />
              </div>
            </div>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <span className="absolute bottom-0 left-0 w-full h-px bg-white/25" />
      <span className="absolute bottom-0 left-0 w-full h-px bg-accent origin-left scale-x-0 group-focus-within/field:scale-x-100 transition-transform duration-300" />
    </div>
  )
}

export function ModelFilters({
  taskTypes,
  authors,
  availableSizes,
  selectedTaskType,
  selectedAuthor,
  selectedSize,
  search,
  onTaskTypeChange,
  onAuthorChange,
  onSizeChange,
  onSearchChange,
  className,
}: ModelFiltersProps) {
  const taskTypeOptions = taskTypes.map((t) => ({
    value: t,
    label: t.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
  }))

  const authorOptions = authors.map((a) => ({
    value: a,
    label: a,
  }))

  const sizeOptions = SIZE_OPTIONS
    .filter((s) => !availableSizes || availableSizes.includes(s.value))
    .map((s) => ({
    value: s.value,
    label: s.label,
  }))

  const hasFilters = selectedTaskType || selectedAuthor || selectedSize || (search && search.trim())

  const clearAllFilters = () => {
    onTaskTypeChange(null)
    onAuthorChange(null)
    onSizeChange(null)
    onSearchChange?.("")
  }

  return (
    <div className={cn("flex flex-wrap items-end gap-4", className)}>
      <FilterSelect
        placeholder="Task Type"
        value={selectedTaskType}
        options={taskTypeOptions}
        onChange={onTaskTypeChange}
      />
      <FilterSelect
        placeholder="Author"
        value={selectedAuthor}
        options={authorOptions}
        onChange={onAuthorChange}
      />
      <FilterSelect
        placeholder="Model Size"
        value={selectedSize}
        options={sizeOptions}
        onChange={onSizeChange}
      />
      <AnimatePresence>
        {hasFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={clearAllFilters}
            className="p-2 mb-0.5 text-white/50 hover:text-white transition-colors"
          >
            <X className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export { SIZE_OPTIONS }
