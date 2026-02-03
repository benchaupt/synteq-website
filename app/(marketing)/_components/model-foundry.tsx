/* eslint-disable @next/next/no-img-element */
"use client"

import { AnimatedCard } from "@/app/_components/animated-card"
import { Marquee } from "@/app/_components/marquee"
import { getModelLogo } from "@/lib/model-logos"
import Link from "next/link"
import { useEffect, useState } from "react"

interface FeaturedModel {
  id: number
  name: string
  author: string
}

export function ModelFoundry() {
  const [models, setModels] = useState<FeaturedModel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedModels() {
      try {
        const response = await fetch("/api/models?featured=true&limit=12")
        if (response.ok) {
          const data = await response.json() as { models: FeaturedModel[] }
          setModels(data.models)
        }
      } catch (err) {
        console.error("Failed to fetch featured models:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedModels()
  }, [])

  // Show placeholder while loading
  if (isLoading || models.length === 0) {
    return (
      <div className="relative grid gap-4 w-full">
        <div className="absolute top-0 left-0 w-[25px] sm:w-[200px] h-full bg-linear-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-[25px] sm:w-[200px] h-full bg-linear-to-l from-background to-transparent pointer-events-none z-10" />
        <div className="flex gap-6 overflow-hidden py-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="mx-6 shrink-0 flex flex-row gap-4 items-center p-4 px-6 bg-background-secondary/50 rounded-xl border border-white/5 animate-pulse"
            >
              <div className="size-10 rounded-lg bg-white/10" />
              <div className="h-5 w-32 bg-white/10 rounded" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <p className="font-mono text-sm text-accent uppercase tracking-tight text-center">
            A curated foundry of top performing models for training, fine-tuning, and production inference
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative grid gap-4 w-full">
      <div className="absolute top-0 left-0 w-[25px] sm:w-[200px] h-full bg-linear-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-[25px] sm:w-[200px] h-full bg-linear-to-l from-background to-transparent pointer-events-none z-10" />
      <Marquee pauseOnHover disableGradient className="[--duration:100s]">
        {models.map((model) => {
          const logo = getModelLogo(model.author)
          return (
            <Link key={model.id} href={`/models?selected=${model.id}`}>
              <AnimatedCard className="mx-6 shrink-0 flex flex-row gap-4 items-center md:p-4 md:pl-6 md:pr-8 p-4 px-4 h-[72px]">
                <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  {logo && <img src={logo} alt={model.author} className="size-6 object-contain" />}
                </div>
                <p className="text-lg tracking-tight whitespace-nowrap">{model.name}</p>
              </AnimatedCard>
            </Link>
          )
        })}
      </Marquee>
      <div className="flex items-center justify-center">
        <p className="font-mono text-sm text-accent uppercase tracking-tight text-center">
          A curated foundry of top performing models for training, fine-tuning, and production inference
        </p>
      </div>
    </div>
  )
}
