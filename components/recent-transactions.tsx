export default function RecentTransactions() {
  return (
    <>
      <h2 className="text-xl font-medium mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
          <div>
            <h3 className="font-medium">Fee Deposit ($20)</h3>
            <div className="text-sm opacity-75">March 23, 2025 • 10:45 AM</div>
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
            <div className="text-sm opacity-75">March 23, 2025 • 9:15 AM</div>
            <div className="text-xs text-green-500 mt-1">Completed</div>
          </div>
          <div className="text-right">
            <div className="text-green-500">+0.0087 ETH</div>
            <div className="text-sm">$30.00</div>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
          <div>
            <h3 className="font-medium">Withdrawal Fee</h3>
            <div className="text-sm opacity-75">March 22, 2025 • 2:30 PM</div>
            <div className="text-xs text-green-500 mt-1">Completed</div>
          </div>
          <div className="text-right">
            <div className="text-green-500">+0.0056 ETH</div>
            <div className="text-sm">$19.46</div>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
          <div>
            <h3 className="font-medium">Send Fee Remaining</h3>
            <div className="text-sm opacity-75">March 22, 2025 • 11:20 AM</div>
            <div className="text-xs text-green-500 mt-1">Completed</div>
          </div>
          <div className="text-right">
            <div className="text-green-500">+0.0132 ETH</div>
            <div className="text-sm">$45.54</div>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
          <div>
            <h3 className="font-medium">Fee Transaction</h3>
            <div className="text-sm opacity-75">March 21, 2025 • 4:15 PM</div>
            <div className="text-xs text-green-500 mt-1">Completed</div>
          </div>
          <div className="text-right">
            <div className="text-green-500">+0.0116 ETH</div>
            <div className="text-sm">$40.00</div>
          </div>
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <h3 className="font-medium">ETH Deposit</h3>
            <div className="text-sm opacity-75">March 19, 2025 • 9:30 AM</div>
            <div className="text-xs text-green-500 mt-1">Completed</div>
          </div>
          <div className="text-right">
            <div className="text-green-500">+19.55 ETH</div>
            <div className="text-sm">$66,989.00</div>
          </div>
        </div>
      </div>
    </>
  )
}
