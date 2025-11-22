"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, Bookmark, Clock, Users, Star, DollarSign } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface TikTokCampaignCardProps {
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

export function TikTokCampaignCard({
  id,
  title,
  company,
  companyLogo,
  reward,
  rewardToken,
  deadline,
  spotsLeft,
  minCVS,
  backgroundImage,
  duration,
  description,
  tags,
  premium,
}: TikTokCampaignCardProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className="h-screen w-full snap-start relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-4 pb-32 text-white">
        {/* Top Info */}
        <div className="absolute top-20 right-3 flex flex-col items-center gap-5">
          <button
            onClick={() => setLiked(!liked)}
            className="flex flex-col items-center gap-1 transition-transform active:scale-90"
          >
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Heart className={`h-7 w-7 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            </div>
            <span className="text-sm font-semibold drop-shadow-lg">{liked ? "324" : "323"}</span>
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className="flex flex-col items-center gap-1 transition-transform active:scale-90"
          >
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Bookmark className={`h-7 w-7 ${saved ? "fill-yellow-400 text-yellow-400" : ""}`} />
            </div>
            <span className="text-sm font-semibold drop-shadow-lg">Save</span>
          </button>

          <button className="flex flex-col items-center gap-1 transition-transform active:scale-90">
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Share2 className="h-7 w-7" />
            </div>
            <span className="text-sm font-semibold drop-shadow-lg">Share</span>
          </button>
        </div>

        {/* Campaign Info */}
        <div className="space-y-3 pr-20">
          {/* Company Badge */}
          <div className="flex items-center gap-3">
            <img
              src={companyLogo || "/placeholder.svg"}
              alt={company}
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
            />
            <div>
              <p className="font-bold text-base drop-shadow-lg">{company}</p>
              {premium && (
                <Badge className="bg-yellow-400 text-black text-xs mt-1 font-semibold border-0">Premium</Badge>
              )}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold text-balance leading-tight drop-shadow-lg">{title}</h2>

          {/* Description */}
          <p className="text-base text-white/95 line-clamp-2 text-balance drop-shadow-md leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md font-medium border border-white/20"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
              <DollarSign className="h-5 w-5 text-[#B2EBA1] flex-shrink-0" />
              <div>
                <span className="font-bold text-lg text-[#B2EBA1]">${reward}</span>
                <span className="text-xs ml-1 text-white/80">{rewardToken}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
              <Users className="h-5 w-5 flex-shrink-0" />
              <div>
                <span className="font-bold text-lg">{spotsLeft}</span>
                <span className="text-xs ml-1 text-white/80">spots</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
              <Clock className="h-5 w-5 flex-shrink-0" />
              <div>
                <span className="font-bold text-base">{duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
              <Star className="h-5 w-5 text-yellow-400 flex-shrink-0" />
              <div>
                <span className="text-xs text-white/80">CVS </span>
                <span className="font-bold text-lg">{minCVS}+</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-3">
            <Link href={`/creator/campaigns/${id}`} className="flex-1">
              <Button size="lg" className="w-full font-bold text-base h-14 bg-primary hover:bg-primary/90 shadow-lg">
                View Details
              </Button>
            </Link>
            <Link href={`/creator/campaigns/${id}/submit`} className="flex-1">
              <Button
                size="lg"
                variant="outline"
                className="w-full font-bold text-base h-14 bg-white/95 backdrop-blur-sm border-2 border-white text-black hover:bg-white shadow-lg"
              >
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
