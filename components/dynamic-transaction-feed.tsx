"use client"

import { useState, useEffect } from "react"

interface Transaction {
  id: string
  type: string
  date: string
  amount: string
  amountUsd: string
  status: "Completed" | "Pending" | "Failed"
}

interface DynamicTransactionFeedProps {
  remainingFee?: number
}

export default function DynamicTransactionFeed({ remainingFee = 10 }: DynamicTransactionFeedProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx1",
      type: "Remaining Withdrawal Fee",
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      amount: `+0.0029 ETH`,
      amountUsd: `$${remainingFee}.00`,
      status: "Pending",
    },
    {
      id: "tx2",
      type: "Withdrawal Fee",
      date: "March 22, 2025 • 2:30 PM",
      amount: "+0.0056 ETH",
      amountUsd: "$19.46",
      status: "Completed",
    },
    {
      id: "tx3",
      type: "Send Fee Remaining",
      date: "March 22, 2025 • 11:20 AM",
      amount: "+0.0132 ETH",
      amountUsd: "$45.54",
      status: "Completed",
    },
  ])

  const [newTransactionId, setNewTransactionId] = useState<string | null>(null)

  // Generate a random transaction
  const generateRandomTransaction = () => {
    const types = ["ETH Transfer", "Fee Deposit", "Withdrawal", "Swap Fee", "Network Fee"]
    const statuses: ("Completed" | "Pending" | "Failed")[] = ["Completed", "Pending", "Failed"]

    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomAmount = (Math.random() * 0.1).toFixed(4)
    const randomAmountUsd = (Number.parseFloat(randomAmount) * 3453.8).toFixed(2)
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    const today = new Date()
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    return {
      id: `tx${Date.now()}`,
      type: randomType,
      date: formattedDate,
      amount: `+${randomAmount} ETH`,
      amountUsd: `$${randomAmountUsd}`,
      status: randomStatus,
    }
  }

  // Add a new transaction periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction = generateRandomTransaction()
      setTransactions((prev) => {
        // Limit to 10 transactions
        const updatedTransactions = [newTransaction, ...prev.slice(0, 9)]
        return updatedTransactions
      })
      setNewTransactionId(newTransaction.id)

      // Clear the animation class after animation completes
      setTimeout(() => {
        setNewTransactionId(null)
      }, 1000)
    }, 30000) // Add a new transaction every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Withdrawal Activity</h2>
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded text-sm">
          Remaining Fee: ${remainingFee}.00
        </div>
      </div>
      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <div
            key={tx.id}
            className={`flex items-center justify-between py-3 ${
              index < transactions.length - 1 ? "border-b dark:border-gray-700" : ""
            } ${newTransactionId === tx.id ? "transaction-new" : ""}`}
          >
            <div>
              <h3 className="font-medium">{tx.type}</h3>
              <div className="text-sm opacity-75">{tx.date}</div>
              <div
                className={`text-xs mt-1 ${
                  tx.status === "Completed"
                    ? "text-green-500"
                    : tx.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              >
                {tx.status}
              </div>
            </div>
            <div className="text-right">
              <div className={tx.amount.startsWith("+") ? "text-green-500" : "text-red-500"}>{tx.amount}</div>
              <div className="text-sm">{tx.amountUsd}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
