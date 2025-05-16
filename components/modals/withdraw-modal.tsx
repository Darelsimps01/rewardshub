"use client"

import { useState } from "react"

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
  onShowNotification: (message: string) => void
}

export default function WithdrawModal({ isOpen, onClose, onShowNotification }: WithdrawModalProps) {
  const [asset, setAsset] = useState("ETH")
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = () => {
    if (!address || !amount) {
      onShowNotification("Please fill in all fields")
      return
    }

    onClose()

    // Show loading
    onShowNotification("Processing withdrawal...")

    // Simulate withdrawal processing
    setTimeout(() => {
      onShowNotification(`Withdrawal of $${amount} worth of ${asset} completed`)
    }, 2000)
  }

  const handleMaxAmount = () => {
    setAmount("0.00") // Balance is now 0
  }

  if (!isOpen) return null

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Withdraw Crypto</h2>
          <button className="text-2xl" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Asset</label>
          <select
            className="w-full p-2 border rounded text-base bg-white dark:bg-gray-800"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
          >
            <option value="ETH">Ethereum (ETH)</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="USDT">Tether (USDT)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Withdrawal Address</label>
          <input
            type="text"
            className="w-full p-2 border rounded text-base"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Amount</label>
          <div className="relative">
            <input
              type="number"
              className="w-full p-2 border rounded text-base"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={true}
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <span className="px-3 text-gray-500">USD</span>
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-500">Fee: $65.00</span>
            <span className="text-sm text-gray-500">Available: 0.00 ETH ($0.00)</span>
          </div>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded mb-6">
          <h3 className="font-bold mb-2">Important:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>A withdrawal fee of $65.00 applies</li>
            <li>Your current balance is 0.00 ETH ($0.00)</li>
            <li>Insufficient funds for withdrawal</li>
            <li>Please deposit funds before attempting to withdraw</li>
          </ul>
        </div>

        <button className="btn-primary text-white px-4 py-2 rounded w-full" onClick={handleSubmit} disabled={true}>
          Withdraw
        </button>
      </div>
    </div>
  )
}
