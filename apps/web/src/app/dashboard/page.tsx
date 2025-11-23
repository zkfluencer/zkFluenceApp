"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Zap,
  TrendingUp,
  Wallet,
  Clock,
  CheckCircle2,
  ArrowLeft,
  LinkIcon,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  Copy,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface SubmittedPost {
  id: string
  url: string
  status: "analyzing" | "approved" | "rejected"
  submittedAt: Date
}

interface CompletedCampaign {
  id: string
  title: string
  brand: string
  status: "completed" | "validated" | "claimed"
  performance: {
    views: number
    likes: number
    shares: number
    engagement: number
  }
  calculatedReward?: number
}

export default function DashboardPage() {
  const { toast } = useToast()
  const [submittingId, setSubmittingId] = useState<string | null>(null)
  const [newPostUrls, setNewPostUrls] = useState<Record<string, string>>({})
  const [submittedPosts, setSubmittedPosts] = useState<Record<string, SubmittedPost[]>>({
    "active-1": [],
    "active-2": [],
  })
  const [editingPostId, setEditingPostId] = useState<string | null>(null)
  const [editingUrl, setEditingUrl] = useState<string>("")

  const [validatingCampaignId, setValidatingCampaignId] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [claimDialogOpen, setClaimDialogOpen] = useState<CompletedCampaign | null>(null)
  const [isClaiming, setIsClaiming] = useState(false)

  const earnings = {
    totalEarned: 245.5,
    pendingPayment: 85.0,
    thisMonth: 120.5,
  }

  const activeCampaigns = [
    {
      id: "active-1",
      title: "Share Celo Mobile Wallet Experience",
      brand: "Celo",
      posts: [],
    },
    {
      id: "active-2",
      title: "DeFi Tutorial: Mint Your First NFT",
      brand: "Celo",
      posts: [],
    },
  ]

  const completedCampaigns = [
    {
      id: "1",
      title: "Share Celo Mobile Wallet Experience",
      brand: "Celo",
      status: "completed",
      performance: {
        views: 1000,
        likes: 200,
        shares: 150,
        engagement: 10,
      },
    },
    {
      id: "2",
      title: "DeFi Tutorial: Mint Your First NFT",
      brand: "Celo",
      status: "validated",
      performance: {
        views: 1500,
        likes: 300,
        shares: 250,
        engagement: 15,
      },
      calculatedReward: 40,
    },
    {
      id: "3",
      title: "Ecosystem Review: Your Favorite Celo dApp",
      brand: "Celo",
      status: "claimed",
      performance: {
        views: 2000,
        likes: 400,
        shares: 350,
        engagement: 20,
      },
      calculatedReward: 50,
    },
  ]

  const userData = {
    avatar: "/diverse-user-avatars.png",
    farcasterID: "@creator.eth",
    walletAddress: "0x742d...8f3a",
  }

  const handleCopyWallet = () => {
    navigator.clipboard.writeText("0x742d35d4f6a0f8e9c2b1d5a8e3f9b7c4d2a1e8f3a")
    toast({
      title: "Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  const handleAddPost = async (campaignId: string) => {
    console.log("[v0] handleAddPost called for campaign:", campaignId)
    const url = newPostUrls[campaignId]
    console.log("[v0] Current URL:", url)
    console.log("[v0] All newPostUrls:", newPostUrls)

    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter your TikTok post URL",
        variant: "destructive",
      })
      return
    }

    if (!url.includes("tiktok.com")) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid TikTok URL",
        variant: "destructive",
      })
      return
    }

    setSubmittingId(campaignId)
    console.log("[v0] Starting submission process")

    try {
      // Simulate API call for content analysis
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newPost: SubmittedPost = {
        id: `post-${Date.now()}`,
        url,
        status: "analyzing",
        submittedAt: new Date(),
      }

      console.log("[v0] New post created:", newPost)

      setSubmittedPosts((prev) => ({
        ...prev,
        [campaignId]: [...(prev[campaignId] || []), newPost],
      }))

      toast({
        title: "Post Submitted Successfully",
        description: "Your content is being analyzed. Results will be available soon.",
      })

      // Clear the input
      setNewPostUrls((prev) => ({ ...prev, [campaignId]: "" }))
      console.log("[v0] Post submitted successfully")
    } catch (error) {
      console.log("[v0] Error submitting post:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmittingId(null)
    }
  }

  const handleDeletePost = (campaignId: string, postId: string) => {
    setSubmittedPosts((prev) => ({
      ...prev,
      [campaignId]: prev[campaignId].filter((post) => post.id !== postId),
    }))
    toast({
      title: "Post Removed",
      description: "The post has been removed from your submissions.",
    })
  }

  const handleEditPost = (postId: string, currentUrl: string) => {
    setEditingPostId(postId)
    setEditingUrl(currentUrl)
  }

  const handleCancelEdit = () => {
    setEditingPostId(null)
    setEditingUrl("")
  }

  const handleSaveEdit = (campaignId: string, postId: string) => {
    if (!editingUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a valid TikTok URL",
        variant: "destructive",
      })
      return
    }

    if (!editingUrl.includes("tiktok.com")) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid TikTok URL",
        variant: "destructive",
      })
      return
    }

    setSubmittedPosts((prev) => ({
      ...prev,
      [campaignId]: prev[campaignId].map((post) =>
        post.id === postId ? { ...post, url: editingUrl, status: "analyzing" as const } : post,
      ),
    }))

    toast({
      title: "Post Updated",
      description: "Your post URL has been updated and is being re-analyzed.",
    })

    setEditingPostId(null)
    setEditingUrl("")
  }

  const handleValidate = async (campaignId: string) => {
    setValidatingCampaignId(campaignId)
    setIsValidating(true)

    try {
      // Simulate TikTok OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate fetching TikTok analytics and calculating reward
      const calculatedReward = Math.floor(Math.random() * 20) + 30 // Random between 30-50 CELO

      // Update campaign status to validated with claimable amount
      const updatedCampaigns = completedCampaigns.map((campaign) =>
        campaign.id === campaignId ? { ...campaign, status: "validated", calculatedReward } : campaign,
      )

      toast({
        title: "Validation Successful",
        description: `Your content has been validated. You can now claim ${calculatedReward} CELO!`,
      })
    } catch (error) {
      toast({
        title: "Validation Failed",
        description: "There was an error validating with TikTok. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsValidating(false)
      setValidatingCampaignId(null)
    }
  }

  const handleClaim = async (campaignId: string | undefined) => {
    if (!campaignId) return

    setIsClaiming(true)

    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2500))

      // Update campaign status to claimed
      const updatedCampaigns = completedCampaigns.map((campaign) =>
        campaign.id === campaignId ? { ...campaign, status: "claimed" } : campaign,
      )
      setClaimDialogOpen(null)

      toast({
        title: "Reward Claimed Successfully",
        description: `${(completedCampaigns.find((c) => c.id === campaignId)?.calculatedReward || 0) - 0.01} CELO has been transferred to your wallet!`,
      })
    } catch (error) {
      toast({
        title: "Claim Failed",
        description: "There was an error claiming your reward. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsClaiming(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-[#635949]/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 px-2 sm:px-3">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">Dashboard</h1>
          </div>
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm font-medium px-2 sm:px-3">
              Profile
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-8 sm:mb-12 -mx-4 sm:-mx-6 px-4 sm:px-6 py-6 sm:py-8 bg-[#635949] text-white relative">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3 tracking-tight">Your Earnings</h2>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                Track your rewards and campaign performance
              </p>
            </div>

            <Card className="w-full lg:w-auto bg-white/10 backdrop-blur-sm border-white/20 p-4 lg:min-w-[280px]">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-12 h-12 border-2 border-white/20 flex-shrink-0">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt="User" />
                  <AvatarFallback>CR</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{userData.farcasterID}</div>
                  <div className="text-xs text-white/60">Farcaster ID</div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 bg-white/5 rounded-lg p-2 group cursor-pointer"
                onClick={handleCopyWallet}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/60 mb-0.5">Wallet Address</div>
                  <div className="text-sm font-mono text-white truncate">{userData.walletAddress}</div>
                </div>
                <Copy className="w-4 h-4 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
          <Card className="p-5 sm:p-6 bg-[#1a0329] text-white border-[#1a0329]">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-white/70 text-sm font-medium">Total Earned</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold">{earnings.totalEarned}</span>
              <span className="text-white/70 text-base sm:text-lg">CELO</span>
            </div>
          </Card>

          <Card className="p-5 sm:p-6 bg-card-alt">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-muted-foreground text-sm font-medium">Pending Payment</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-foreground">{earnings.pendingPayment}</span>
              <span className="text-muted-foreground text-base sm:text-lg">CELO</span>
            </div>
          </Card>

          <Card className="p-5 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-sm font-medium">This Month</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-foreground">{earnings.thisMonth}</span>
              <span className="text-muted-foreground text-base sm:text-lg">CELO</span>
            </div>
          </Card>
        </div>

        <Card className="p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-primary flex-shrink-0" />
            Active Campaigns - Submit Your Posts
          </h3>
          <div className="space-y-5">
            {activeCampaigns.map((campaign) => (
              <div key={campaign.id} className="border-t border-border pt-4 sm:pt-6 first:border-0 first:pt-0">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-4">
                  <div className="flex-1 min-w-0 w-full sm:w-auto">
                    <h4 className="font-semibold text-base sm:text-lg mb-1">{campaign.title}</h4>
                    <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-0 whitespace-nowrap">
                    {campaign.posts.length} posts submitted
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  {campaign.posts.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-secondary/30 rounded-lg"
                    >
                      {editingPostId === post.id ? (
                        <>
                          <Input
                            value={editingUrl}
                            onChange={(e) => setEditingUrl(e.target.value)}
                            placeholder="https://tiktok.com/@user/video/..."
                            className="flex-1 text-sm"
                          />
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleSaveEdit(campaign.id, post.id)}
                              className="flex-1 sm:flex-none"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleCancelEdit}
                              className="flex-1 sm:flex-none"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex-1 min-w-0 w-full sm:w-auto">
                            <a
                              href={post.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline block truncate"
                            >
                              {post.url}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Badge
                              variant={
                                post.status === "approved"
                                  ? "default"
                                  : post.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className="whitespace-nowrap"
                            >
                              {post.status}
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditPost(post.id, post.url)}
                              className="flex-shrink-0"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeletePost(campaign.id, post.id)}
                              className="text-destructive hover:text-destructive flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="https://tiktok.com/@user/video/..."
                    value={newPostUrls[campaign.id] || ""}
                    onChange={(e) => setNewPostUrls({ ...newPostUrls, [campaign.id]: e.target.value })}
                    className="flex-1 text-sm"
                  />
                  <Button
                    onClick={() => handleAddPost(campaign.id)}
                    disabled={!newPostUrls[campaign.id]?.trim()}
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Post
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
            Completed Campaigns
          </h3>
          <div className="space-y-4 sm:space-y-6">
            {completedCampaigns.map((campaign) => (
              <div key={campaign.id} className="border-t border-border pt-4 sm:pt-6 first:border-0 first:pt-0">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0 w-full lg:w-auto">
                    <h4 className="font-semibold text-base sm:text-lg mb-1">{campaign.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{campaign.brand}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      <div className="bg-secondary/30 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Views</div>
                        <div className="text-base sm:text-lg font-semibold">{campaign.performance.views}</div>
                      </div>
                      <div className="bg-secondary/30 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Likes</div>
                        <div className="text-base sm:text-lg font-semibold">{campaign.performance.likes}</div>
                      </div>
                      <div className="bg-secondary/30 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Shares</div>
                        <div className="text-base sm:text-lg font-semibold">{campaign.performance.shares}</div>
                      </div>
                      <div className="bg-secondary/30 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Engagement</div>
                        <div className="text-base sm:text-lg font-semibold">{campaign.performance.engagement}%</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-auto flex flex-col gap-3 min-w-[200px]">
                    {campaign.status === "completed" && (
                      <Button onClick={() => handleValidate(campaign.id)} className="w-full" variant="outline">
                        <Shield className="w-4 h-4 mr-2" />
                        Validate
                      </Button>
                    )}
                    {campaign.status === "validated" && (
                      <div className="space-y-3">
                        <div className="bg-primary/10 rounded-lg p-3 text-center mb-6">
                          <div className="text-sm text-muted-foreground mb-2">Reward Calculated</div>
                          <div className="text-xl sm:text-2xl font-bold text-primary">
                            {campaign.calculatedReward} CELO
                          </div>
                        </div>
                        <Button onClick={() => setClaimDialogOpen(campaign)} className="w-full">
                          <Wallet className="w-4 h-4 mr-2" />
                          Claim Reward
                        </Button>
                      </div>
                    )}
                    {campaign.status === "claimed" && (
                      <Badge className="bg-primary text-white w-full justify-center py-2">
                        <Check className="w-4 h-4 mr-2" />
                        Claimed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      <Dialog open={!!claimDialogOpen} onOpenChange={() => setClaimDialogOpen(null)}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">Claim Your Reward</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              You are about to claim your campaign reward. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="bg-primary/10 rounded-xl p-6 text-center mb-6">
              <div className="text-sm text-muted-foreground mb-2">Total Reward</div>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                {claimDialogOpen?.calculatedReward} CELO
              </div>
              <div className="text-sm text-muted-foreground">Campaign: {claimDialogOpen?.title}</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network Fee:</span>
                <span className="font-medium">~0.01 CELO</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">You will receive:</span>
                <span className="font-semibold text-primary">
                  {claimDialogOpen ? (claimDialogOpen.calculatedReward - 0.01).toFixed(2) : 0} CELO
                </span>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setClaimDialogOpen(null)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              onClick={() => handleClaim(claimDialogOpen?.id)}
              disabled={isClaiming}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
            >
              {isClaiming ? "Processing..." : "Confirm Claim"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
