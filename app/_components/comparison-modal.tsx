"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X, Search, ChevronDown, Check } from "lucide-react"
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
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownOpenRef = useRef(false)

  useEffect(() => {
    dropdownOpenRef.current = dropdownOpen
  }, [dropdownOpen])

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    }, 100)
  }, [])

  // Close on escape, and block all page scroll while modal is open.
  // stopPropagation → blocks Lenis (listens on window).
  // preventDefault → blocks native scroll, except inside the modal's scrollable area or dropdowns.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()

      if (dropdownOpenRef.current && !(e.target as HTMLElement).closest('[data-radix-popper-content-wrapper]')) {
        setDropdownOpen(false)
      }

      const target = e.target as HTMLElement
      const inPopper = target.closest('[data-radix-popper-content-wrapper]')
      if (inPopper) return

      const scrollable = target.closest('[data-modal-scroll]') as HTMLElement | null
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable
        const atTop = scrollTop <= 0
        const atBottom = scrollTop >= scrollHeight - clientHeight - 1
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return
      }

      e.preventDefault()
    }
    const handleTouch = (e: TouchEvent) => {
      e.stopPropagation()
      if (dropdownOpenRef.current) setDropdownOpen(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('touchmove', handleTouch)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchmove', handleTouch)
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
    <div className="fixed inset-0 z-[9999]">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 flex items-center justify-center"
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
        <div className="px-6 pt-4 flex flex-wrap items-end gap-6">
          <div className="group/field relative flex-1 max-w-md">
            <div className="flex items-center gap-3 px-2 py-3">
              <Search className="size-5 shrink-0 text-white/40 group-focus-within/field:text-accent transition-colors duration-300" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hardware..."
                className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
              />
              {search && (
                <button onClick={() => setSearch("")} className="shrink-0 text-white/40 hover:text-white transition-colors">
                  <X className="size-4" />
                </button>
              )}
            </div>
            <span className="absolute bottom-0 left-0 w-full h-px bg-white/25" />
            <span className="absolute bottom-0 left-0 w-full h-px bg-accent origin-left scale-x-0 group-focus-within/field:scale-x-100 transition-transform duration-300" />
          </div>

          {/* Manufacturer Dropdown */}
          <div className="group/field relative">
            <Select.Root
              open={dropdownOpen}
              onOpenChange={setDropdownOpen}
              value={manufacturerFilter || "__all__"}
              onValueChange={(v) => setManufacturerFilter(v === "__all__" ? null : v)}
            >
              <Select.Trigger
                className="inline-flex items-center justify-between gap-2 px-2 py-2.5 min-w-[160px] text-sm text-white/50 hover:text-white focus:outline-none transition-colors group"
              >
                <Select.Value placeholder="Manufacturer" />
                <Select.Icon className="transition-transform duration-200 group-data-[state=open]:rotate-180">
                  <ChevronDown className="size-4" />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content
                  className="bg-background-secondary overflow-hidden z-[10000] border border-white/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-1 data-[state=closed]:slide-out-to-top-1 duration-150"
                  position="popper"
                  sideOffset={8}
                >
                  <Select.Viewport>
                    <Select.Item
                      value="__all__"
                      className="px-4 py-2.5 text-sm text-white/60 outline-none cursor-pointer hover:bg-white/5 data-highlighted:bg-white/5 border-b border-white/5"
                    >
                      <Select.ItemText>All Manufacturers</Select.ItemText>
                    </Select.Item>
                    {MANUFACTURERS.map((m, i) => (
                      <Select.Item
                        key={m}
                        value={m}
                        className={cn(
                          "relative flex items-center px-4 py-2.5 pr-8 text-sm text-white/60 outline-none cursor-pointer hover:bg-white/5 data-highlighted:bg-white/5",
                          i > 0 && "border-t border-white/5"
                        )}
                        onPointerUp={() => {
                          if (m === manufacturerFilter) {
                            setManufacturerFilter(null)
                          }
                        }}
                      >
                        <Select.ItemText>{m}</Select.ItemText>
                        <Select.ItemIndicator className="absolute right-3">
                          <Check className="size-4 text-accent" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            <span className="absolute bottom-0 left-0 w-full h-px bg-white/25" />
            <span className="absolute bottom-0 left-0 w-full h-px bg-accent origin-left scale-x-0 group-focus-within/field:scale-x-100 transition-transform duration-300" />
          </div>

          {/* Clear all filters */}
          <AnimatePresence>
            {(search || manufacturerFilter) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={() => { setSearch(""); setManufacturerFilter(null) }}
                className="p-2 mb-0.5 text-white/50 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Hardware Grid */}
        <div className="flex-1 overflow-y-auto p-6" data-modal-scroll>
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
                <div className="flex flex-wrap gap-2 items-center">
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
    </div>
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
