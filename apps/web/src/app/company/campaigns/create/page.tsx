"use client"

import { useMiniApp } from "@/contexts/miniapp-context"
import { useAccount } from "wagmi"
import { CompanyHeader } from "@/components/company-header"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateCampaignPage() {
  const { context, isMiniAppReady } = useMiniApp()
  const { address, isConnected } = useAccount()
  const router = useRouter()

  // Extract Farcaster user data
  const user = context?.user
  const companyName = user?.displayName || "Web3 Company"

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "wallet",
    reward: "",
    maxCreators: "",
    minCVS: "70",
    deadline: "",
    duration: "30-90s",
    guidelines: "",
    tags: "",
    imageUrl: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Category options
  const categories = [
    { value: "wallet", label: "Wallet & Payments", icon: "💳" },
    { value: "defi", label: "DeFi & Trading", icon: "📈" },
    { value: "nft", label: "NFTs & Digital Art", icon: "🎨" },
    { value: "gaming", label: "Web3 Gaming", icon: "🎮" },
    { value: "social", label: "Social & Community", icon: "👥" },
    { value: "infrastructure", label: "Infrastructure", icon: "🏗️" },
  ]

  // Duration options
  const durations = [
    { value: "15-30s", label: "15-30 seconds" },
    { value: "30-90s", label: "30-90 seconds" },
    { value: "45-120s", label: "45-120 seconds" },
    { value: "60-180s", label: "60-180 seconds" },
  ]

  // CVS score options
  const cvsScores = [
    { value: "60", label: "60+ (Entry Level)" },
    { value: "70", label: "70+ (Standard)" },
    { value: "80", label: "80+ (High Quality)" },
    { value: "90", label: "90+ (Premium)" },
  ]

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.reward || parseFloat(formData.reward) <= 0) newErrors.reward = "Valid reward amount is required"
    if (!formData.maxCreators || parseInt(formData.maxCreators) <= 0) newErrors.maxCreators = "Valid max creators is required"
    if (!formData.deadline) newErrors.deadline = "Deadline is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return
    if (!isConnected) {
      alert("Please connect your wallet to create a campaign")
      return
    }

    setIsSubmitting(true)

    // TODO: Replace with actual smart contract interaction
    // 1. Approve USDC spending
    // 2. Create campaign on-chain
    // 3. Store metadata on backend

    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/company/dashboard")
    }, 2000)
  }

  // Calculate total budget
  const totalBudget = formData.reward && formData.maxCreators
    ? (parseFloat(formData.reward) * parseInt(formData.maxCreators)).toFixed(2)
    : "0.00"

  // Loading state
  if (!isMiniAppReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CompanyHeader companyName={companyName} />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Campaign</h1>
            <p className="text-muted-foreground">Launch a new creator campaign to promote your Web3 project</p>
          </div>

          {/* Wallet Warning */}
          {!isConnected && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">Wallet Required</h3>
                  <p className="text-sm text-muted-foreground">Connect your wallet to fund and create campaigns</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Basic Information</h2>

              {/* Title */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Celo Wallet Mobile App Launch"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe what creators should showcase in their content..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Campaign Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Reward */}
                <div>
                  <label htmlFor="reward" className="block text-sm font-medium text-foreground mb-2">
                    Reward per Creator (USDC) *
                  </label>
                  <input
                    type="number"
                    id="reward"
                    name="reward"
                    value={formData.reward}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="50.00"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.reward && <p className="text-red-500 text-sm mt-1">{errors.reward}</p>}
                </div>

                {/* Max Creators */}
                <div>
                  <label htmlFor="maxCreators" className="block text-sm font-medium text-foreground mb-2">
                    Max Creators *
                  </label>
                  <input
                    type="number"
                    id="maxCreators"
                    name="maxCreators"
                    value={formData.maxCreators}
                    onChange={handleChange}
                    min="1"
                    placeholder="20"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.maxCreators && <p className="text-red-500 text-sm mt-1">{errors.maxCreators}</p>}
                </div>

                {/* Min CVS Score */}
                <div>
                  <label htmlFor="minCVS" className="block text-sm font-medium text-foreground mb-2">
                    Minimum CVS Score
                  </label>
                  <select
                    id="minCVS"
                    name="minCVS"
                    value={formData.minCVS}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {cvsScores.map((score) => (
                      <option key={score.value} value={score.value}>
                        {score.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Deadline */}
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-foreground mb-2">
                    Deadline *
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
                </div>

                {/* Video Duration */}
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-foreground mb-2">
                    Video Duration
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {durations.map((dur) => (
                      <option key={dur.value} value={dur.value}>
                        {dur.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Budget Summary */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-6 border border-primary/20">
              <h2 className="text-xl font-bold text-foreground mb-4">Budget Summary</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Campaign Budget</p>
                  <p className="text-3xl font-bold text-primary">${totalBudget} USDC</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formData.reward && formData.maxCreators ? `${formData.reward} USDC × ${formData.maxCreators} creators` : "Enter reward and max creators"}
                  </p>
                </div>
                {isConnected && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Your Wallet</p>
                    <p className="text-lg font-mono text-foreground">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-4 bg-card border border-border text-foreground rounded-xl font-bold hover:border-primary/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isConnected}
                className="flex-1 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
