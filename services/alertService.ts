import type { AlertSubscription } from "../types"

const ALERTS_STORAGE_KEY = "buffalo-float-alerts"

export class AlertService {
  private static instance: AlertService
  private subscriptions: AlertSubscription[] = []

  private constructor() {
    this.loadSubscriptions()
  }

  static getInstance(): AlertService {
    if (!AlertService.instance) {
      AlertService.instance = new AlertService()
    }
    return AlertService.instance
  }

  private loadSubscriptions() {
    try {
      const stored = localStorage.getItem(ALERTS_STORAGE_KEY)
      if (stored) {
        this.subscriptions = JSON.parse(stored)
      }
    } catch (error) {
      console.error("Failed to load alert subscriptions:", error)
    }
  }

  private saveSubscriptions() {
    try {
      localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(this.subscriptions))
    } catch (error) {
      console.error("Failed to save alert subscriptions:", error)
    }
  }

  async requestNotificationPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications")
      return false
    }

    if (Notification.permission === "granted") {
      return true
    }

    if (Notification.permission === "denied") {
      return false
    }

    const permission = await Notification.requestPermission()
    return permission === "granted"
  }

  createSubscription(subscription: Omit<AlertSubscription, "id" | "createdAt">): AlertSubscription {
    const newSubscription: AlertSubscription = {
      ...subscription,
      id: Date.now().toString(),
      createdAt: Date.now(),
    }

    this.subscriptions.push(newSubscription)
    this.saveSubscriptions()
    return newSubscription
  }

  getSubscriptions(): AlertSubscription[] {
    return [...this.subscriptions]
  }

  updateSubscription(id: string, updates: Partial<AlertSubscription>): boolean {
    const index = this.subscriptions.findIndex((sub) => sub.id === id)
    if (index === -1) return false

    this.subscriptions[index] = { ...this.subscriptions[index], ...updates }
    this.saveSubscriptions()
    return true
  }

  deleteSubscription(id: string): boolean {
    const index = this.subscriptions.findIndex((sub) => sub.id === id)
    if (index === -1) return false

    this.subscriptions.splice(index, 1)
    this.saveSubscriptions()
    return true
  }

  async checkConditions(currentLevels: Record<string, number>) {
    const hasPermission = await this.requestNotificationPermission()
    if (!hasPermission) return

    this.subscriptions
      .filter((sub) => sub.enabled)
      .forEach((subscription) => {
        const currentLevel = currentLevels[subscription.gaugeId]
        if (currentLevel === undefined) return

        const wasInRange = this.wasLevelInRange(subscription.gaugeId, subscription.minLevel, subscription.maxLevel)
        const isInRange = currentLevel >= subscription.minLevel && currentLevel <= subscription.maxLevel

        // Notify when conditions become favorable
        if (!wasInRange && isInRange) {
          this.sendNotification(
            "🌊 Buffalo River Alert",
            `Water level at ${subscription.gaugeId} is now ${currentLevel.toFixed(1)}ft - Perfect for floating!`,
          )
        }
        // Notify when conditions become unfavorable
        else if (wasInRange && !isInRange) {
          this.sendNotification(
            "⚠️ Buffalo River Alert",
            `Water level at ${subscription.gaugeId} is now ${currentLevel.toFixed(1)}ft - Outside your preferred range`,
          )
        }

        // Store the current level for next comparison
        this.storePreviousLevel(subscription.gaugeId, currentLevel)
      })
  }

  private wasLevelInRange(gaugeId: string, minLevel: number, maxLevel: number): boolean {
    try {
      const stored = localStorage.getItem(`previous-level-${gaugeId}`)
      if (!stored) return false

      const previousLevel = Number.parseFloat(stored)
      return previousLevel >= minLevel && previousLevel <= maxLevel
    } catch {
      return false
    }
  }

  private storePreviousLevel(gaugeId: string, level: number) {
    try {
      localStorage.setItem(`previous-level-${gaugeId}`, level.toString())
    } catch (error) {
      console.error("Failed to store previous level:", error)
    }
  }

  private sendNotification(title: string, body: string) {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: "buffalo-river-alert",
      })
    }
  }

  async testNotification(): Promise<boolean> {
    const hasPermission = await this.requestNotificationPermission()
    if (!hasPermission) return false

    this.sendNotification("🧪 Test Notification", "Buffalo Float Alert notifications are working!")
    return true
  }
}
