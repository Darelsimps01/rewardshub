"use client"

import { useState } from "react"
import Image from "next/image"

interface LoginScreenProps {
  onLogin: (method: "code" | "telegram") => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [code, setCode] = useState("")
  const [showError, setShowError] = useState(false)

  const handleSubmit = () => {
    if (code === "CRYPTO2025" || code === "CRYPTO2024" || code === "") {
      setShowError(false)
      onLogin("code")
    } else {
      setShowError(true)
    }
  }

  return (
    <div className="login-screen">
      <div className="max-w-md w-full mx-auto">
        {/* Logo */}
        <div className="mb-6 text-center">
          <Image
            src="/placeholder.svg?height=394&width=750"
            alt="Crypto Dashboard Logo"
            className="mx-auto w-64 mb-4"
            width={750}
            height={394}
          />
        </div>
        <div className="card rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2 text-center">Crypto Dashboard</h1>
          <p className="text-center mb-6">Enter your code to access your portfolio</p>

          <div className="mb-4">
            <label htmlFor="winningCode" className="block text-sm font-medium mb-1">
              Access Code
            </label>
            <input
              type="text"
              id="winningCode"
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-primary text-base"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {showError && <p className="text-red-500 text-sm mt-1">Invalid code. Please try again.</p>}
          </div>

          <button className="btn-primary w-full py-2 px-4 rounded text-white font-medium mb-4" onClick={handleSubmit}>
            Access Dashboard
          </button>

          <div className="relative py-3 flex items-center mb-4">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            <span className="flex-shrink mx-3 text-gray-600 dark:text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          </div>

          <button
            className="telegram-button w-full py-2 px-4 rounded font-medium mb-4"
            onClick={() => onLogin("telegram")}
          >
            Continue with Telegram
          </button>

          <p className="text-sm text-center mt-4">
            Need help? Contact support@cryptodashboard.com
            <br />
            or message @mexcrewardrobot on Telegram
          </p>
        </div>
      </div>
    </div>
  )
}
