"use client"
import { useState, useEffect, useRef } from "react"
import CryptoTicker from "./crypto-ticker"
import PortfolioChart from "./portfolio-chart"
import AssetsList from "./assets-list"
import MarketTrends from "./market-trends"
import QuickActions from "./quick-actions"

interface DashboardScreenProps {
  isLoading: boolean
  onShowNotification: (message: string) => void
  onOpenDepositModal: () => void
  onOpenWithdrawModal: () => void
  onOpenSwapModal: () => void
  onOpenShareModal: () => void
}

interface Transaction {
  id: string
  type: string
  date: string
  amount: string
  amountUsd: string
  status: "Completed" | "Pending" | "Failed"
  isEth?: boolean
  isNew?: boolean
}

export default function DashboardScreen({
  isLoading,
  onShowNotification,
  onOpenDepositModal,
  onOpenWithdrawModal,
  onOpenSwapModal,
  onOpenShareModal,
}: DashboardScreenProps) {
  const [remainingFee, setRemainingFee] = useState(10)
  const [lastDepositTime, setLastDepositTime] = useState("2 hours ago")
  const [liveTransactions, setLiveTransactions] = useState<Transaction[]>([
    {
      id: "tx-eth-highlight",
      type: "New ETH Deposit",
      date: "March 24, 2025",
      amount: "+0.0052 ETH",
      amountUsd: "$18.00",
      status: "Completed",
      isEth: true,
    },
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
      amount: "+0.0029 ETH",
      amountUsd: "$10.00",
      status: "Pending",
      isEth: true,
    },
    {
      id: "tx2",
      type: "Withdrawal Fee",
      date: "March 22, 2025 • 2:30 PM",
      amount: "+0.0056 ETH",
      amountUsd: "$19.46",
      status: "Completed",
      isEth: true,
    },
  ])

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Generate a random transaction
  const generateRandomTransaction = () => {
    const types = [
      "ETH Transfer",
      "Fee Deposit",
      "Withdrawal",
      "Swap Fee",
      "Network Fee",
      "BTC Transfer",
      "USDT Transfer",
    ]
    const statuses: ("Completed" | "Pending" | "Failed")[] = ["Completed", "Pending", "Failed"]
    const cryptos = ["ETH", "BTC", "USDT"]

    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomCrypto = cryptos[Math.floor(Math.random() * cryptos.length)]
    const isEth = randomCrypto === "ETH"
    const randomAmount = (Math.random() * 0.1).toFixed(4)

    // Calculate USD amount based on crypto type
    let usdAmount = 0
    if (randomCrypto === "ETH") {
      usdAmount = Number.parseFloat(randomAmount) * 3453.8
    } else if (randomCrypto === "BTC") {
      usdAmount = Number.parseFloat(randomAmount) * 95219.45
    } else {
      usdAmount = Number.parseFloat(randomAmount) * 1.0
    }

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
      type: `${randomType}`,
      date: formattedDate,
      amount: `+${randomAmount} ${randomCrypto}`,
      amountUsd: `$${usdAmount.toFixed(2)}`,
      status: randomStatus,
      isEth,
      isNew: true,
    }
  }

  // Schedule next transaction update
  const scheduleNextUpdate = () => {
    // Random time between 2-5 seconds
    const nextUpdateTime = Math.floor(Math.random() * 3000) + 2000

    timerRef.current = setTimeout(() => {
      const newTransaction = generateRandomTransaction()
      setLiveTransactions((prev) => {
        // Limit to 10 transactions
        const updatedTransactions = [newTransaction, ...prev.slice(0, 9)]
        return updatedTransactions
      })

      // Remove isNew flag after animation completes
      setTimeout(() => {
        setLiveTransactions((prev) => prev.map((tx) => (tx.id === newTransaction.id ? { ...tx, isNew: false } : tx)))
      }, 1000)

      // Schedule next update
      scheduleNextUpdate()
    }, nextUpdateTime)
  }

  // Start and cleanup transaction updates
  useEffect(() => {
    scheduleNextUpdate()

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // Update the time interval periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const minutes = Math.floor(Math.random() * 10) + 1
      setLastDepositTime(`${minutes} minutes ago`)
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dashboard-screen" style={{ display: "block" }}>
      <div className="max-w-7xl mx-auto">
        {/* Crypto Ticker */}
        <CryptoTicker />

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Crypto Dashboard</h1>
            <p className="text-lg">Welcome to your portfolio</p>
          </div>
          <div className="flex mt-4 md:mt-0">
            <button className="btn-primary text-white px-4 py-2 rounded mr-3" onClick={onOpenDepositModal}>
              Deposit
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded" onClick={onOpenWithdrawModal}>
              Withdraw
            </button>
          </div>
        </header>

        {/* Loading state */}
        {isLoading ? (
          <div className="loading">
            <div className="spinner mb-4"></div>
            <p className="text-lg">Loading your crypto data...</p>
          </div>
        ) : (
          <div>
            {/* Balance Card */}
            <div className="card rounded-lg shadow p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                  <h2 className="text-lg font-medium mb-2">Total Balance</h2>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold" id="totalBalanceAmount">
                      $0
                    </span>
                  </div>
                  <div className="text-red-500 mt-1">$0.00 today</div>
                  <button
                    className="mt-3 bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded"
                    onClick={onOpenShareModal}
                  >
                    Share
                  </button>
                </div>

                <div className="col-span-2">
                  <QuickActions
                    onSwap={onOpenSwapModal}
                    onSend={onOpenWithdrawModal}
                    onReceive={onOpenDepositModal}
                    onAddFunds={onOpenDepositModal}
                  />
                </div>
              </div>
            </div>

            {/* Portfolio and Assets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Portfolio Chart */}
              <div className="lg:col-span-2 card rounded-lg shadow p-6">
                <PortfolioChart />
              </div>

              {/* Assets List */}
              <div className="card rounded-lg shadow p-6">
                <AssetsList />
              </div>
            </div>

            {/* Transactions and Market Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Regular Transaction History */}
              <div className="card rounded-lg shadow p-6">
                <h2 className="text-xl font-medium mb-4">Recent Transactions</h2>
                <div className="text-sm text-blue-500 mb-3">
                  Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b dark:border-gray-700 bg-red-50 dark:bg-red-900/20 rounded-md px-3">
                    <div>
                      <h3 className="font-medium">ETH Reversal</h3>
                      <div className="text-sm opacity-75">
                        {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </div>
                      <div className="text-xs text-green-500 mt-1">Completed</div>
                      <div className="text-xs mt-1 truncate max-w-[200px]">
                        To: 0xaf575af37b582b0573a92afc77bd4708f00a758c
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-red-500">20.038 ETH</div>
                      <div className="text-sm">$72,656.46</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b dark:border-gray-700 bg-green-50 dark:bg-green-900/20 rounded-md px-3">
                    <div>
                      <h3 className="font-medium">Fee Deposit</h3>
                      <div className="text-sm opacity-75">
                        {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </div>
                      <div className="text-xs text-green-500 mt-1">Completed</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-500">+0.0191 ETH</div>
                      <div className="text-sm">$66.00</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b dark:border-gray-700 bg-green-50 dark:bg-green-900/20 rounded-md px-3">
                    <div>
                      <h3 className="font-medium">ETH Deposit</h3>
                      <div className="text-sm opacity-75">April 18, 2025</div>
                      <div className="text-xs text-green-500 mt-1">Completed</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-500">+0.0052 ETH</div>
                      <div className="text-sm">$18.00</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                    <div>
                      <h3 className="font-medium">Fee Deposit ($20)</h3>
                      <div className="text-sm opacity-75">March 23, 2025</div>
                      <div className="text-xs text-green-500 mt-1">Completed</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-500">+0.0058 ETH</div>
                      <div className="text-sm">$20.00</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                    <div>
                      <h3 className="font-medium">Fee Deposit ($30)</h3>
                      <div className="text-sm opacity-75">March 23, 2025</div>
                      <div className="text-xs text-green-500 mt-1">Completed</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-500">+0.0087 ETH</div>
                      <div className="text-sm">$30.00</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Trends */}
              <div className="card rounded-lg shadow p-6">
                <MarketTrends onShowNotification={onShowNotification} />
              </div>
            </div>

            {/* Users Overall Withdrawal */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Users Overall Withdrawal</h2>
              <div className="card rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium">Live Transaction Feed</h2>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                    <span className="text-sm text-green-500">Live Updates</span>
                  </div>
                </div>

                <style jsx>{`
                  @keyframes pulse-eth {
                    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                  }
                  
                  .eth-transaction {
                    animation: pulse-eth 2s infinite;
                  }
                  
                  @keyframes slide-in {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                  }
                  
                  .transaction-new {
                    animation: slide-in 0.5s ease-out forwards;
                  }
                `}</style>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {liveTransactions.map((tx, index) => (
                    <div
                      key={tx.id}
                      className={`
                        flex items-center justify-between py-3 px-3 rounded-md
                        ${index < liveTransactions.length - 1 ? "border-b dark:border-gray-700" : ""}
                        ${tx.isNew ? "transaction-new" : ""}
                        ${tx.isEth ? "eth-transaction bg-green-50 dark:bg-green-900/20" : ""}
                      `}
                    >
                      <div>
                        <h3 className="font-medium flex items-center">
                          {tx.type}
                          {tx.isEth && (
                            <span className="ml-2 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-2 py-0.5 rounded-full">
                              ETH
                            </span>
                          )}
                        </h3>
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
              </div>
            </div>

            <footer className="text-center text-sm opacity-75 mt-8">
              © 2025 Crypto Dashboard. All rights reserved.
            </footer>
          </div>
        )}
      </div>
    </div>
  )
}
