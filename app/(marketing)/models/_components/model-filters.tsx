"use client"

import { cn } from "@/lib/utils"
import * as Select from "@radix-ui/react-select"
import { ChevronDown, Check, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

interface ModelFiltersProps {
  taskTypes: string[]
  authors: string[]
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
  return (
    <Select.Root
      value={value || ALL_VALUE}
      onValueChange={(v) => onChange(v === ALL_VALUE ? null : v)}
    >
      <Select.Trigger
        className={cn(
          "inline-flex items-center justify-between gap-2 px-4 py-2.5 min-w-[140px]",
          "bg-background-secondary border border-white/10 rounded-lg",
          "text-sm text-white/60 hover:text-white hover:border-white/20",
          "focus:outline-none focus:border-accent/50 transition-colors",
          "data-[state=open]:border-accent/50"
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="size-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="bg-background-secondary border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
          position="popper"
          sideOffset={4}
        >
          <Select.Viewport className="p-1 max-h-[300px] overflow-y-auto">
            <Select.Item
              value={ALL_VALUE}
              className="relative flex items-center px-3 py-2 text-sm text-white/60 rounded cursor-pointer hover:bg-white/5 hover:text-white focus:outline-none focus:bg-white/5 data-[highlighted]:bg-white/5"
            >
              <Select.ItemText>All</Select.ItemText>
            </Select.Item>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex items-center px-3 py-2 pr-8 text-sm text-white/60 rounded cursor-pointer hover:bg-white/5 hover:text-white focus:outline-none focus:bg-white/5 data-[highlighted]:bg-white/5"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2">
                  <Check className="size-4 text-accent" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export function ModelFilters({
  taskTypes,
  authors,
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

  const sizeOptions = SIZE_OPTIONS.map((s) => ({
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
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
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
            className="p-2 text-white/50 hover:text-white transition-colors"
          >
            <X className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export { SIZE_OPTIONS }
