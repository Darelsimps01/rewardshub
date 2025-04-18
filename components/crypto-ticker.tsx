"use client"

import { useRef } from "react"

export default function CryptoTicker() {
  const tickerWrapRef = useRef<HTMLDivElement>(null)

  // Remove the useEffect that clones the ticker item

  return (
    <div className="overflow-hidden w-full mb-4 card rounded-md p-1">
      <div ref={tickerWrapRef} className="ticker-wrap" style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
        <div className="ticker-item animate-ticker-scroll">
          <span className="inline-flex items-center px-3">
            <span className="font-bold mr-1">BTC:</span> $95,219.45 <span className="text-green-500 ml-1">+1.2%</span>
          </span>
          <span className="inline-flex items-center px-3">
            <span className="font-bold mr-1">ETH:</span> $3,453.80 <span className="text-green-500 ml-1">+0.8%</span>
          </span>
          <span className="inline-flex items-center px-3">
            <span className="font-bold mr-1">SOL:</span> $226.12 <span className="text-green-500 ml-1">+0.7%</span>
          </span>
          <span className="inline-flex items-center px-3">
            <span className="font-bold mr-1">USDT:</span> $1.00 <span className="text-gray-500 ml-1">0.0%</span>
          </span>
          <span className="inline-flex items-center px-3">
            <span className="font-bold mr-1">ADA:</span> $0.86 <span className="text-green-500 ml-1">+1.5%</span>
          </span>
          <span className="inline-flex items-center px-3">
            <span className="font-bold mr-1">DOT:</span> $9.76 <span className="text-green-500 ml-1">+2.3%</span>
          </span>
          <span className="inline-flex items-center px-3">
            <span className="font-bold mr-1">AVAX:</span> $35.41 <span className="text-red-500 ml-1">-0.5%</span>
          </span>
          <span className="inline-flex items-center px-3">
            <span className="font-bold mr-1">SHIB:</span> $0.00002812 <span className="text-green-500 ml-1">+4.2%</span>
          </span>
        </div>
      </div>
    </div>
  )
}
