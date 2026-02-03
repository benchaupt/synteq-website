"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { X, Search, ChevronDown } from "lucide-react"
import * as Select from "@radix-ui/react-select"
import { AnimatedButton } from "./animated-button"
import { AnimatedCard } from "./animated-card"
import { hardware, type Hardware, MANUFACTURERS } from "@/lib/hardware-data"

interface ComparisonModalProps {
  isOpen: boolean
  onClose: () => void
  initialSelected?: string[] // Hardware IDs
  onCompare?: (selectedIds: string[]) => void // Callback with selected hardware IDs
}

// Inner component that resets state when key changes
function ComparisonModalInner({
  onClose,
  initialSelected = [],
  onCompare,
}: Omit<ComparisonModalProps, "isOpen">) {
  const [search, setSearch] = useState("")
  const [manufacturerFilter, setManufacturerFilter] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>(() => [...initialSelected])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    }, 100)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const filteredHardware = useMemo(() => {
    let result = hardware

    // Filter by manufacturer
    if (manufacturerFilter) {
      result = result.filter((h) => h.manufacturer === manufacturerFilter)
    }

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(searchLower) ||
          h.manufacturer.toLowerCase().includes(searchLower) ||
          h.specs.some((s) => s.label.toLowerCase().includes(searchLower))
      )
    }

    return result
  }, [search, manufacturerFilter])

  const MAX_SELECTION = 3

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      // If already selected, remove it
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id)
      }
      // If at max, remove oldest (index 0) and add new one
      if (prev.length >= MAX_SELECTION) {
        return [...prev.slice(1), id]
      }
      // Otherwise just add
      return [...prev, id]
    })
  }, [])

  const handleCompare = useCallback(() => {
    if (selectedIds.length < 2) return
    onCompare?.(selectedIds)
    onClose()
  }, [selectedIds, onCompare, onClose])

  const selectedHardware = useMemo(
    () => hardware.filter((h) => selectedIds.includes(h.id)),
    [selectedIds]
  )

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl h-[90vh] mx-4 bg-background border border-white/10 rounded-xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-regular text-white">Compare Hardware</h2>
            <p className="text-white/50 mt-1">Select 2-3 products</p>
          </div>
          <button
            onClick={onClose}
            className="size-10 relative flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors group"
          >
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30 group-hover:border-accent transition-colors" />
            <span className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/30 group-hover:border-accent transition-colors" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/30 group-hover:border-accent transition-colors" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30 group-hover:border-accent transition-colors" />
            <X className="size-4 text-white" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hardware..."
              className="w-full bg-background-secondary border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          {/* Manufacturer Dropdown */}
          <Select.Root
            value={manufacturerFilter || "__all__"}
            onValueChange={(v) => setManufacturerFilter(v === "__all__" ? null : v)}
          >
            <Select.Trigger
              className={cn(
                "inline-flex items-center justify-between gap-2 px-4 py-3 min-w-[160px]",
                "bg-background-secondary border border-white/10 rounded-lg",
                "text-sm text-white/60 hover:text-white hover:border-white/20",
                "focus:outline-none focus:border-accent/50 transition-colors",
                "data-[state=open]:border-accent/50"
              )}
            >
              <Select.Value placeholder="Manufacturer" />
              <Select.Icon>
                <ChevronDown className="size-4" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                className="bg-background-dropdown border border-white/10 rounded-lg shadow-xl overflow-hidden z-[10000]"
                position="popper"
                sideOffset={4}
              >
                <Select.Viewport className="p-1">
                  <Select.Item
                    value="__all__"
                    className="relative flex items-center px-3 py-2 text-sm text-white/60 rounded cursor-pointer hover:bg-white/5 hover:text-white focus:outline-none focus:bg-white/5 data-[highlighted]:bg-white/5"
                  >
                    <Select.ItemText>All Manufacturers</Select.ItemText>
                  </Select.Item>
                  {MANUFACTURERS.map((m) => (
                    <Select.Item
                      key={m}
                      value={m}
                      className="relative flex items-center px-3 py-2 text-sm text-white/60 rounded cursor-pointer hover:bg-white/5 hover:text-white focus:outline-none focus:bg-white/5 data-[highlighted]:bg-white/5"
                    >
                      <Select.ItemText>{m}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Hardware Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHardware.map((item) => (
              <HardwareSelectCard
                key={item.id}
                hardware={item}
                isSelected={selectedIds.includes(item.id)}
                onToggle={() => toggleSelection(item.id)}
              />
            ))}
          </div>

          {filteredHardware.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-white/40">
              <p className="text-lg">No hardware found</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-background-secondary">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              {selectedHardware.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  <span className="text-white/50 text-sm mr-1">Selected:</span>
                  {selectedHardware.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => toggleSelection(h.id)}
                      className="px-2 py-1 bg-accent/10 text-accent text-sm rounded flex items-center gap-1 hover:bg-accent/20 hover:text-white transition-colors cursor-pointer"
                    >
                      {h.name}
                      <X className="size-3" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-white/40 text-sm">Select 2-3 products to compare</p>
              )}
            </div>
            <AnimatedButton
              background="primary"
              onClick={handleCompare}
              disabled={selectedIds.length < 2 || selectedIds.length > 3}
              className={cn((selectedIds.length < 2 || selectedIds.length > 3) && "opacity-50 cursor-not-allowed")}
            >
              Compare ({selectedIds.length}/3)
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  // Use portal to render outside the main element's stacking context
  if (!mounted) return null
  return createPortal(modalContent, document.body)
}

// Wrapper that uses key to reset state when modal opens
export function ComparisonModal({ isOpen, onClose, initialSelected = [], onCompare }: ComparisonModalProps) {
  const modalKey = useMemo(
    () => (isOpen ? `modal-${initialSelected.join("-")}-${Date.now()}` : "closed"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen]
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <ComparisonModalInner
          key={modalKey}
          onClose={onClose}
          initialSelected={initialSelected}
          onCompare={onCompare}
        />
      )}
    </AnimatePresence>
  )
}

interface HardwareSelectCardProps {
  hardware: Hardware
  isSelected: boolean
  onToggle: () => void
}

function HardwareSelectCard({ hardware, isSelected, onToggle }: HardwareSelectCardProps) {
  return (
    <button onClick={onToggle} className="w-full">
      <AnimatedCard className="h-full" isActive={isSelected} disableScale disableTextColor>
        <div className="flex flex-col gap-4 items-center">
          <div className="size-24 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hardware.image}
              alt={hardware.name}
              className="object-contain"
            />
          </div>
          <h3 className={cn(
            "font-mono text-sm md:text-base transition-colors text-center",
            isSelected ? "text-accent" : "text-white"
          )}>
            {hardware.name}
          </h3>
        </div>
      </AnimatedCard>
    </button>
  )
}
