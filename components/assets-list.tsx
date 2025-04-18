export default function AssetsList() {
  return (
    <>
      <h2 className="text-xl font-medium mb-4">Your Assets</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 h-10 w-10 rounded-full flex items-center justify-center mr-3">
              <span className="font-bold text-blue-500">Ξ</span>
            </div>
            <div>
              <h3 className="font-medium">Ethereum</h3>
              <div className="text-sm opacity-75">ETH</div>
            </div>
          </div>
          <div className="text-right">
            <div id="ethAmount">19.55 ETH</div>
            <div className="text-green-500 text-sm">$67,014.00</div>
          </div>
        </div>
      </div>
    </>
  )
}
