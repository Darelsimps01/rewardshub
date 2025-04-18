"use client"

interface MarketTrendsProps {
  onShowNotification: (message: string) => void
}

export default function MarketTrends({ onShowNotification }: MarketTrendsProps) {
  const handleBuyClick = () => {
    onShowNotification("Buy feature coming soon")
  }

  return (
    <>
      <h2 className="text-xl font-medium mb-4">Market Trends</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left py-3">Asset</th>
              <th className="text-right py-3">Price</th>
              <th className="text-right py-3">24h Change</th>
              <th className="text-right py-3">Market Cap</th>
              <th className="text-right py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-gray-700">
              <td className="py-3">
                <div className="flex items-center">
                  <div className="mr-2 font-bold text-orange-500">₿</div>
                  <div>
                    <div>Bitcoin</div>
                    <div className="text-xs opacity-75">BTC</div>
                  </div>
                </div>
              </td>
              <td className="text-right py-3">$95,219.45</td>
              <td className="text-right py-3 text-green-500">+1.2%</td>
              <td className="text-right py-3">$1.87T</td>
              <td className="text-right py-3">
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm" onClick={handleBuyClick}>
                  Buy
                </button>
              </td>
            </tr>

            <tr className="border-b dark:border-gray-700">
              <td className="py-3">
                <div className="flex items-center">
                  <div className="mr-2 font-bold text-blue-500">Ξ</div>
                  <div>
                    <div>Ethereum</div>
                    <div className="text-xs opacity-75">ETH</div>
                  </div>
                </div>
              </td>
              <td className="text-right py-3">$3,453.80</td>
              <td className="text-right py-3 text-green-500">+0.8%</td>
              <td className="text-right py-3">$415.6B</td>
              <td className="text-right py-3">
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm" onClick={handleBuyClick}>
                  Buy
                </button>
              </td>
            </tr>

            <tr className="border-b dark:border-gray-700">
              <td className="py-3">
                <div className="flex items-center">
                  <div className="mr-2 font-bold text-purple-500">◎</div>
                  <div>
                    <div>Solana</div>
                    <div className="text-xs opacity-75">SOL</div>
                  </div>
                </div>
              </td>
              <td className="text-right py-3">$226.12</td>
              <td className="text-right py-3 text-green-500">+0.7%</td>
              <td className="text-right py-3">$109.1B</td>
              <td className="text-right py-3">
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm" onClick={handleBuyClick}>
                  Buy
                </button>
              </td>
            </tr>

            <tr>
              <td className="py-3">
                <div className="flex items-center">
                  <div className="mr-2 font-bold text-green-500">₮</div>
                  <div>
                    <div>Tether</div>
                    <div className="text-xs opacity-75">USDT</div>
                  </div>
                </div>
              </td>
              <td className="text-right py-3">$1.00</td>
              <td className="text-right py-3 text-gray-500">0.0%</td>
              <td className="text-right py-3">$105.4B</td>
              <td className="text-right py-3">
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm" onClick={handleBuyClick}>
                  Buy
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
