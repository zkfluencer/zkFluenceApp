// Hook for managing Farcaster notifications

import { useState, useEffect } from "react"
import { FarcasterNotifications } from "@/lib/farcaster/notifications"

export function useFarcasterNotifications() {
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [permissionRequested, setPermissionRequested] = useState(false)

  useEffect(() => {
    // Check if permission was previously requested
    const requested = localStorage.getItem("farcaster_notification_requested")
    if (requested) {
      setPermissionRequested(true)
    }
  }, [])

  const requestPermission = async (): Promise<boolean> => {
    const granted = await FarcasterNotifications.requestPermission()
    setPermissionGranted(granted)
    setPermissionRequested(true)
    localStorage.setItem("farcaster_notification_requested", "true")
    return granted
  }

  const sendNotification = async (config: {
    title: string
    body: string
    targetUrl?: string
  }): Promise<boolean> => {
    if (!permissionGranted) {
      console.warn("Notification permission not granted")
      return false
    }

    return await FarcasterNotifications.sendNotification(config)
  }

  return {
    permissionGranted,
    permissionRequested,
    requestPermission,
    sendNotification,
    // Helper methods
    notifyCampaignMatch: FarcasterNotifications.notifyCampaignMatch,
    notifySubmissionApproved: FarcasterNotifications.notifySubmissionApproved,
    notifySubmissionRejected: FarcasterNotifications.notifySubmissionRejected,
    notifyPaymentReceived: FarcasterNotifications.notifyPaymentReceived,
    notifyCampaignEnding: FarcasterNotifications.notifyCampaignEnding,
    notifyCVSUpdate: FarcasterNotifications.notifyCVSUpdate,
  }
}
