"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"

interface DesktopCampaignCardProps {
  id: string
  title: string
  company: string
  companyLogo: string
  reward: number
  rewardToken: string
  deadline: string
  spotsLeft: number
  minCVS: number
  backgroundImage: string
  duration: string
  description: string
  tags: string[]
  premium?: boolean
}

export function DesktopCampaignCard({
  id,
  title,
  company,
  companyLogo,
  reward,
  rewardToken,
  spotsLeft,
  minCVS,
  backgroundImage,
  duration,
  description,
  tags,
  premium,
}: DesktopCampaignCardProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Background Image */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 transition-transform"
          >
            <svg
              className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : "text-white"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 transition-transform"
          >
            <svg
              className={`w-5 h-5 ${saved ? "fill-yellow-400 text-yellow-400" : "text-white"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>

        {/* Company Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <img
            src={companyLogo || "/placeholder.svg"}
            alt={company}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div className="text-white">
            <p className="font-semibold text-sm drop-shadow-lg">{company}</p>
            {premium && (
              <Badge className="bg-yellow-400 text-black text-xs mt-0.5 font-semibold border-0 h-5">Premium</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-accent text-foreground font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4 mt-auto">
          <div className="flex items-center gap-1.5 bg-accent/50 rounded-md px-2 py-1.5">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-semibold">
              ${reward} {rewardToken}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-accent/50 rounded-md px-2 py-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="text-sm font-semibold">{spotsLeft} spots</span>
          </div>
          <div className="flex items-center gap-1.5 bg-accent/50 rounded-md px-2 py-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-accent/50 rounded-md px-2 py-1.5">
            <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <span className="text-sm">CVS {minCVS}+</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <Link href={`/creator/campaigns/${id}`} className="flex-1">
            <Button size="sm" variant="outline" className="w-full bg-transparent">
              Details
            </Button>
          </Link>
          <Link href={`/creator/campaigns/${id}/submit`} className="flex-1">
            <Button size="sm" className="w-full">
              Apply
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
