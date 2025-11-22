"use client"

import { redirect } from "next/navigation"

// Feed page redirects to main page (TikTok-style campaign feed)
export default function FeedPage() {
  redirect("/")
}
