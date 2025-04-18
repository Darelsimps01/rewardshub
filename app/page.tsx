"use client"

import { useState } from "react"
import LoginScreen from "@/components/login-screen"
import DashboardScreen from "@/components/dashboard-screen"
import Notification from "@/components/notification"
import TelegramBadge from "@/components/telegram-badge"
import DepositModal from "@/components/modals/deposit-modal"
import WithdrawModal from "@/components/modals/withdraw-modal"
import SwapModal from "@/components/modals/swap-modal"
import ShareModal from "@/components/modals/share-modal"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showTelegramBadge, setShowTelegramBadge] = useState(false)
  const [notification, setNotification] = useState("")
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  // Handle login
  const handleLogin = (method: "code" | "telegram") => {
    setIsLoggedIn(true)
    if (method === "telegram") {
      setShowTelegramBadge(true)
    }

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  // Show notification
  const showNotificationMessage = (message: string) => {
    setNotification(message)
    setTimeout(() => {
      setNotification("")
    }, 3000)
  }

  return (
    <main>
      {notification && <Notification message={notification} />}
      {showTelegramBadge && <TelegramBadge />}

      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <DashboardScreen
          isLoading={isLoading}
          onShowNotification={showNotificationMessage}
          onOpenDepositModal={() => setShowDepositModal(true)}
          onOpenWithdrawModal={() => setShowWithdrawModal(true)}
          onOpenSwapModal={() => setShowSwapModal(true)}
          onOpenShareModal={() => setShowShareModal(true)}
        />
      )}

      {/* Modals */}
      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onShowNotification={showNotificationMessage}
      />

      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onShowNotification={showNotificationMessage}
      />

      <SwapModal
        isOpen={showSwapModal}
        onClose={() => setShowSwapModal(false)}
        onShowNotification={showNotificationMessage}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShowNotification={showNotificationMessage}
      />
    </main>
  )
}
