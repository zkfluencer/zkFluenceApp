import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { contentPitch, agreedToTerms, agreedToGuidelines } = body

    // Validate input
    if (!contentPitch || contentPitch.length < 50) {
      return NextResponse.json({ error: "Content pitch must be at least 50 characters" }, { status: 400 })
    }

    if (!agreedToTerms || !agreedToGuidelines) {
      return NextResponse.json({ error: "You must agree to terms and guidelines" }, { status: 400 })
    }

    // TODO: Here you would:
    // 1. Store the campaign participation in database
    // 2. Save the content pitch
    // 3. Update user's active campaigns
    // 4. Send notifications
    // 5. Record on-chain if needed

    // Simulated database operation
    const campaignParticipation = {
      campaignId: id,
      userId: "user123", // Replace with actual user ID from session
      contentPitch,
      status: "active",
      joinedAt: new Date().toISOString(),
      agreedToTerms,
      agreedToGuidelines,
    }

    console.log("[v0] Campaign joined:", campaignParticipation)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Successfully joined campaign",
      data: campaignParticipation,
    })
  } catch (error) {
    console.error("[v0] Error in campaign join:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
