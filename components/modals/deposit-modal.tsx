"use client"

import { useState } from "react"

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
  onShowNotification: (message: string) => void
}

export default function DepositModal({ isOpen, onClose, onShowNotification }: DepositModalProps) {
  const [activeTab, setActiveTab] = useState("erc20")
  const [copySuccess, setCopySuccess] = useState(false)
  const [copyBep20Success, setCopyBep20Success] = useState(false)

  const depositAddress = "0xDAE362865300A5891005baeCbBcaF35786259a07"
  const bep20DepositAddress = "0xDAE362865300A5891005baeCbBcaF35786259a07"

  const handleCopyAddress = (address: string, isErc20: boolean) => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        if (isErc20) {
          setCopySuccess(true)
          setTimeout(() => setCopySuccess(false), 3000)
        } else {
          setCopyBep20Success(true)
          setTimeout(() => setCopyBep20Success(false), 3000)
        }
      })
      .catch((err) => {
        onShowNotification("Failed to copy address")
        console.error("Could not copy text: ", err)
      })
  }

  if (!isOpen) return null

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Deposit Crypto</h2>
          <button className="text-2xl" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="mb-6">
          <div className="flex mb-4">
            <button
              className={`px-4 py-2 mr-2 rounded ${activeTab === "erc20" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("erc20")}
            >
              ERC-20
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === "bep20" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("bep20")}
            >
              BEP-20
            </button>
          </div>

          <div className={`tab-content ${activeTab !== "erc20" ? "hidden" : ""}`}>
            <p className="mb-4">Send your crypto to the following address:</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-4 break-all">
              <span>{depositAddress}</span>
            </div>
            <button
              className="btn-primary text-white px-4 py-2 rounded mb-4 w-full"
              onClick={() => handleCopyAddress(depositAddress, true)}
            >
              Copy Address
            </button>
            <div className={`text-green-500 text-center mb-4 ${!copySuccess ? "hidden" : ""}`}>
              Address copied to clipboard!
            </div>

            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded">
              <h3 className="font-bold mb-2">Important:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>This address supports both ERC-20 (Ethereum) and BEP-20 (Binance Smart Chain) tokens</li>
                <li>Make sure you're sending on the correct network</li>
                <li>A deposit must be made before withdrawals can be processed</li>
                <li>Sending on the wrong network may result in permanent loss of funds</li>
              </ul>
            </div>
          </div>

          <div className={`tab-content ${activeTab !== "bep20" ? "hidden" : ""}`}>
            <p className="mb-4">Send your crypto to the following address:</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-4 break-all">
              <span>{bep20DepositAddress}</span>
            </div>
            <button
              className="btn-primary text-white px-4 py-2 rounded mb-4 w-full"
              onClick={() => handleCopyAddress(bep20DepositAddress, false)}
            >
              Copy Address
            </button>
            <div className={`text-green-500 text-center mb-4 ${!copyBep20Success ? "hidden" : ""}`}>
              Address copied to clipboard!
            </div>

            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded">
              <h3 className="font-bold mb-2">Important:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>This address supports both ERC-20 (Ethereum) and BEP-20 (Binance Smart Chain) tokens</li>
                <li>Make sure you're sending on the correct network</li>
                <li>A deposit must be made before withdrawals can be processed</li>
                <li>Sending on the wrong network may result in permanent loss of funds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
