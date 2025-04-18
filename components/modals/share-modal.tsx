"use client"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  onShowNotification: (message: string) => void
}

export default function ShareModal({ isOpen, onClose, onShowNotification }: ShareModalProps) {
  const handleShareToTelegram = () => {
    onClose()
    onShowNotification("Opening Telegram to share portfolio")
    // In a real app, this would open a Telegram share link
  }

  if (!isOpen) return null

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Share with Friends</h2>
          <button className="text-2xl" onClick={onClose}>
            ×
          </button>
        </div>

        <p className="mb-4">Share your crypto portfolio with friends on Telegram.</p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-4">
          <p>Check out my crypto portfolio! I currently have $67,014.00 worth of ETH!</p>
        </div>

        <button className="telegram-button w-full py-2 px-4 rounded font-medium" onClick={handleShareToTelegram}>
          Share to Telegram
        </button>
      </div>
    </div>
  )
}
