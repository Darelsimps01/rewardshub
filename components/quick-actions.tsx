"use client"

interface QuickActionsProps {
  onSwap: () => void
  onSend: () => void
  onReceive: () => void
  onAddFunds: () => void
}

export default function QuickActions({ onSwap, onSend, onReceive, onAddFunds }: QuickActionsProps) {
  return (
    <>
      <h3 className="font-medium mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="quick-action card p-3 rounded text-center cursor-pointer" onClick={onSwap}>
          <div className="bg-blue-100 dark:bg-blue-900 h-10 w-10 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
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
          </div>
          <span>Swap</span>
        </div>
        <div className="quick-action card p-3 rounded text-center cursor-pointer" onClick={onSend}>
          <div className="bg-green-100 dark:bg-green-900 h-10 w-10 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
          <span>Send</span>
        </div>
        <div className="quick-action card p-3 rounded text-center cursor-pointer" onClick={onReceive}>
          <div className="bg-purple-100 dark:bg-purple-900 h-10 w-10 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </div>
          <span>Receive</span>
        </div>
        <div className="quick-action card p-3 rounded text-center cursor-pointer" onClick={onAddFunds}>
          <div className="bg-yellow-100 dark:bg-yellow-900 h-10 w-10 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <span>Add Funds</span>
        </div>
      </div>
    </>
  )
}
