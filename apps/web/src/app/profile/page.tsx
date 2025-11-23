"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Zap,
  User,
  Mail,
  Globe,
  Instagram,
  Twitter,
  Youtube,
  Edit2,
  ArrowLeft,
  Video,
  Check,
  Shield,
  Copy,
  QrCode,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [tiktokConnected, setTiktokConnected] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [selfVerified, setSelfVerified] = useState(false)
  const [showSelfVerify, setShowSelfVerify] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const contractAddress = "0x5c36cfc25dce95976ce947daaea260b131776d2c"
  const network = "Celo Mainnet"
  const estimatedGas = "~0.01 CELO"

  const userProfile = {
    name: "Alex Creator",
    email: "alex@example.com",
    bio: "Content creator passionate about Web3, DeFi, and blockchain technology. Helping others navigate the Celo ecosystem.",
    wallet: "0x742d...3a9f",
    joinedDate: "January 2024",
    totalCampaigns: 12,
    successRate: 95,
  }

  const socialLinks = {
    website: "alexcreator.com",
    twitter: "@alexcreator",
    instagram: "@alexcreator",
    youtube: "AlexCreator",
  }

  const achievements = [
    { title: "Early Adopter", description: "Joined in the first month", icon: "🌟" },
    { title: "Top Performer", description: "95% campaign success rate", icon: "🏆" },
    { title: "Community Leader", description: "10+ completed campaigns", icon: "👑" },
  ]

  const handleTikTokConnect = () => {
    setShowOnboarding(true)
  }

  const completeOnboarding = () => {
    setTiktokConnected(true)
    setShowOnboarding(false)
  }

  const handleSelfVerification = () => {
    setShowSelfVerify(true)
  }

  const handleVerifyWithSelf = () => {
    // Initiate Self.xyz verification flow
    console.log("[v0] Starting Self.xyz verification...")
    setSelfVerified(true)
    setShowSelfVerify(false)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://self.xyz/verify/${contractAddress}`)
    console.log("[v0] Verification link copied")
  }

  if (showSelfVerify) {
    return (
      <Dialog open={showSelfVerify} onOpenChange={setShowSelfVerify}>
        <DialogContent className="max-w-2xl mx-4">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              On-Chain Verification
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Verification stored on Celo blockchain for decentralized access.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* On-Chain Verification Info */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">On-Chain Verification</h3>
                  <p className="text-sm text-blue-700">
                    Verification stored on Celo blockchain for decentralized access.
                  </p>
                </div>
              </div>
            </Card>

            {/* Gas Fees Warning */}
            <Card className="p-6 bg-yellow-50 border-yellow-300">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-2">Gas Fees Required</h3>
                  <p className="text-sm text-yellow-800 leading-relaxed">
                    You need CELO tokens in your wallet to pay for gas fees when storing verification on-chain.
                    <br />
                    <span className="font-semibold mt-1 inline-block">Estimated cost: {estimatedGas}</span>
                  </p>
                </div>
              </div>
            </Card>

            {/* Verify Button */}
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg py-5 sm:py-6"
              onClick={handleVerifyWithSelf}
            >
              <Shield className="w-5 h-5 mr-2" />
              Verify with Self
            </Button>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleCopyLink} className="h-12 bg-transparent">
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button variant="outline" onClick={() => setShowQR(!showQR)} className="h-12">
                <QrCode className="w-4 h-4 mr-2" />
                Show QR
              </Button>
            </div>

            {/* QR Code placeholder */}
            {showQR && (
              <Card className="p-8 bg-secondary/30">
                <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center border-2 border-border">
                  <QrCode className="w-24 h-24 text-muted-foreground" />
                </div>
              </Card>
            )}

            {/* Contract Details */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">Contract:</Label>
                <div className="p-3 bg-secondary/30 rounded-lg font-mono text-sm break-all">{contractAddress}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Network:</Label>
                <span className="ml-2 text-sm font-medium">{network}</span>
              </div>
            </div>

            {/* Cancel Button */}
            <Button variant="outline" onClick={() => setShowSelfVerify(false)} className="w-full">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-[#635949]/5 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">zkFluencer</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-2xl px-6 py-12">
          <Card className="p-8 border-border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Complete Your TikTok Profile</h2>
              <p className="text-muted-foreground">Tell us about your TikTok presence and content style</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tiktok-username">TikTok Username</Label>
                <Input id="tiktok-username" placeholder="@yourusername" className="border-border" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="followers">Follower Count</Label>
                <Input id="followers" type="number" placeholder="e.g. 10000" className="border-border" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-bio">Content Description</Label>
                <Textarea
                  id="content-bio"
                  placeholder="Tell us about your TikTok content and what makes you unique..."
                  className="border-border min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Content Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {["Lifestyle", "Tech", "Finance", "Education", "Entertainment", "Gaming", "Beauty", "Fitness"].map(
                    (category) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors"
                      >
                        {category}
                      </Badge>
                    ),
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={completeOnboarding} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                  Complete Setup
                </Button>
                <Button variant="outline" onClick={() => setShowOnboarding(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-[#635949]/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Profile</h1>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-sm font-medium">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-6 py-12">
        <div className="mb-12 -mx-6 px-6 py-8 bg-[#635949] text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-3 tracking-tight">Your Profile</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Manage your creator identity and showcase your work
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/10 hover:bg-white/20 text-white border-0"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
          <Card className="p-5 sm:p-6 text-center bg-card-alt">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{userProfile.totalCampaigns}</div>
            <div className="text-sm text-muted-foreground">Campaigns Completed</div>
          </Card>
          <Card className="p-5 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{userProfile.successRate}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </Card>
          <Card className="p-5 sm:p-6 text-center bg-card-alt sm:col-span-2 lg:col-span-1">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">245.5</div>
            <div className="text-sm text-muted-foreground">CELO Earned</div>
          </Card>
        </div>

        <Card className="p-8 mb-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-24 h-24 rounded-2xl bg-[#1a0329] flex items-center justify-center flex-shrink-0">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold">{userProfile.name}</h3>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                  Verified Creator
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span>Joined {userProfile.joinedDate}</span>
                <span>•</span>
                <span className="font-mono text-xs">{userProfile.wallet}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{userProfile.bio}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={userProfile.email}
                disabled={!isEditing}
                className="bg-secondary/30"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-sm font-medium mb-2 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-accent" />
                Bio
              </Label>
              <Textarea
                id="bio"
                defaultValue={userProfile.bio}
                disabled={!isEditing}
                rows={3}
                className="bg-secondary/30"
              />
            </div>

            <div className="pt-4 border-t border-border">
              <Label className="text-sm font-medium mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                Self.xyz Verification
              </Label>
              {!selfVerified ? (
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium mb-1">Verify your identity on-chain</p>
                    <p className="text-xs text-muted-foreground">
                      Store verification on Celo blockchain for decentralized access
                    </p>
                  </div>
                  <Button
                    onClick={handleSelfVerification}
                    size="sm"
                    className="bg-[#4E74F8] hover:bg-[#4E74F8]/90 text-white"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Verify
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Identity Verified</span>
                          <Badge className="bg-primary/10 text-primary border-0">
                            <Check className="w-3 h-3 mr-1" />
                            On-Chain
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground font-mono text-xs">{contractAddress}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSelfVerification}>
                      Update
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => setSelfVerified(false)}
                  >
                    Revoke Verification
                  </Button>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-border">
              <Label className="text-sm font-medium mb-3 flex items-center gap-2">
                <Video className="w-4 h-4 text-accent" />
                TikTok Account
              </Label>
              {!tiktokConnected ? (
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium mb-1">Connect your TikTok account</p>
                    <p className="text-xs text-muted-foreground">
                      Link your TikTok to participate in campaigns and track performance
                    </p>
                  </div>
                  <Button onClick={handleTikTokConnect} size="sm" className="bg-primary hover:bg-primary/90 text-white">
                    <Video className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Video className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">@creator_username</span>
                          <Badge className="bg-primary/10 text-primary border-0">
                            <Check className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">25.4K followers</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleTikTokConnect}>
                      Update
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => setTiktokConnected(false)}
                  >
                    Disconnect TikTok
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website" className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" />
                  Website
                </Label>
                <Input
                  id="website"
                  defaultValue={socialLinks.website}
                  disabled={!isEditing}
                  className="bg-secondary/30"
                />
              </div>
              <div>
                <Label htmlFor="twitter" className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-accent" />
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  defaultValue={socialLinks.twitter}
                  disabled={!isEditing}
                  className="bg-secondary/30"
                />
              </div>
              <div>
                <Label htmlFor="instagram" className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-accent" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  defaultValue={socialLinks.instagram}
                  disabled={!isEditing}
                  className="bg-secondary/30"
                />
              </div>
              <div>
                <Label htmlFor="youtube" className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-accent" />
                  YouTube
                </Label>
                <Input
                  id="youtube"
                  defaultValue={socialLinks.youtube}
                  disabled={!isEditing}
                  className="bg-secondary/30"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <Button className="bg-primary hover:bg-primary/90 text-white flex-1">Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-8 bg-[#1a0329] border-[#1a0329] text-white">
          <h3 className="text-2xl font-bold mb-6">Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-5 rounded-xl bg-white/10 hover:bg-white/15 transition-colors">
                <div className="text-3xl mb-3">{achievement.icon}</div>
                <h4 className="font-semibold mb-1">{achievement.title}</h4>
                <p className="text-sm text-white/70">{achievement.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
