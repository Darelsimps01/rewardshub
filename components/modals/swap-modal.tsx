"use client"

import { useState, useEffect } from "react"

interface SwapModalProps {
  isOpen: boolean
  onClose: () => void
  onShowNotification: (message: string) => void
}

export default function SwapModal({ isOpen, onClose, onShowNotification }: SwapModalProps) {
  const [fromAsset, setFromAsset] = useState("ETH")
  const [toAsset, setToAsset] = useState("BTC")
  const [fromAmount, setFromAmount] = useState("1")
  const [toAmount, setToAmount] = useState("0.036")

  // Conversion rates
  const conversionRates = {
    "ETH-BTC": 0.036,
    "ETH-USDT": 3453.8,
    "BTC-ETH": 27.78,
    "BTC-USDT": 95219.45,
    "USDT-ETH": 0.00029,
    "USDT-BTC": 0.0000105,
  }

  // Calculate swap conversion
  const calculateSwapAmount = () => {
    const amount = Number.parseFloat(fromAmount) || 0
    const rate = conversionRates[`${fromAsset}-${toAsset}` as keyof typeof conversionRates] || 0
    const convertedAmount = amount * rate * 0.995 // Apply 0.5% fee

    setToAmount(convertedAmount.toFixed(6))
  }

  useEffect(() => {
    calculateSwapAmount()
  }, [fromAsset, toAsset, fromAmount])

  const handleSwapDirection = () => {
    // Can only swap if from is not ETH or to is not ETH
    if (fromAsset !== "ETH" || toAsset !== "ETH") {
      onShowNotification("Currently you can only swap from ETH to other assets")
      return
    }
  }

  const handleConfirmSwap = () => {
    const amountFrom = Number.parseFloat(fromAmount)
    const amountTo = Number.parseFloat(toAmount)

    if (!amountFrom || amountFrom <= 0) {
      onShowNotification("Please enter a valid amount to swap")
      return
    }

    // Close swap modal
    onClose()

    // Show loading
    onShowNotification("Processing swap...")

    // Simulate swap processing
    setTimeout(() => {
      onShowNotification(`Successfully swapped ${amountFrom} ${fromAsset} to ${amountTo.toFixed(6)} ${toAsset}`)
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Swap Cryptocurrency</h2>
          <button className="text-2xl" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">From</label>
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded p-3">
            <div className="flex-1">
              <select
                className="w-full bg-transparent border-none focus:outline-none text-base"
                value={fromAsset}
                onChange={(e) => setFromAsset(e.target.value)}
              >
                <option value="ETH">Ethereum (ETH)</option>
              </select>
            </div>
            <div className="w-1/3">
              <input
                type="number"
                className="w-full bg-transparent border-none text-right focus:outline-none text-base"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="text-right text-sm text-gray-500 mt-1">
            <span>Balance: 19.55 ETH ($67,014.00)</span>
          </div>
        </div>

        <div className="flex justify-center my-3">
          <button className="bg-gray-200 dark:bg-gray-700 rounded-full p-2" onClick={handleSwapDirection}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              ></path>
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">To</label>
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded p-3">
            <div className="flex-1">
              <select
                className="w-full bg-transparent border-none focus:outline-none text-base"
                value={toAsset}
                onChange={(e) => setToAsset(e.target.value)}
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="USDT">Tether (USDT)</option>
              </select>
            </div>
            <div className="w-1/3">
              <input
                type="number"
                className="w-full bg-transparent border-none text-right focus:outline-none text-base"
                value={toAmount}
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>
              1 {fromAsset} ≈ {conversionRates[`${fromAsset}-${toAsset}` as keyof typeof conversionRates]} {toAsset}
            </span>
            <span>Fee: 0.5%</span>
          </div>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-3 rounded mb-4 text-sm">
          Swapping is subject to market rates and network fees. The final amount may vary slightly due to price
          fluctuations.
        </div>

        <button className="btn-primary text-white px-4 py-2 rounded w-full" onClick={handleConfirmSwap}>
          Swap Now
        </button>
      </div>
    </div>
  )
}
