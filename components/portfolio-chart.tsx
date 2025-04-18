"use client"

import { useState, useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

export default function PortfolioChart() {
  const [activeTimeframe, setActiveTimeframe] = useState("1D")
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  // Generate data for a realistic portfolio chart
  const generateData = (count: number) => {
    const data = []
    let value = 67014

    for (let i = 0; i < count; i++) {
      // Small variations for a realistic chart
      value = value * (1 + (Math.random() - 0.48) * 0.01)
      data.push(value)
    }

    return data
  }

  // Generate labels
  const generateLabels = (count: number, type: string) => {
    const labels = []
    const date = new Date(2025, 2, 20) // March 20, 2025

    if (type === "1D") {
      for (let i = 0; i < count; i++) {
        const hour = (date.getHours() - (count - 1 - i)) % 24
        labels.push(`${hour < 0 ? hour + 24 : hour}:00`)
      }
    } else if (type === "1W") {
      for (let i = 0; i < count; i++) {
        const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][(date.getDay() - (count - 1 - i) + 7) % 7]
        labels.push(day)
      }
    } else if (type === "1M") {
      for (let i = 0; i < count; i++) {
        const dayOfMonth = date.getDate() - (count - 1 - i)
        const prevMonth = new Date(2025, 2, dayOfMonth)
        labels.push(`${prevMonth.getDate()}`)
      }
    } else {
      for (let i = 0; i < count; i++) {
        const monthIndex = (date.getMonth() - (count - 1 - i) + 12) % 12
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][monthIndex]
        labels.push(month)
      }
    }

    return labels
  }

  useEffect(() => {
    if (!chartRef.current) return

    Chart.register(...registerables)

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Determine count based on timeframe
    let count
    switch (activeTimeframe) {
      case "1D":
        count = 24
        break
      case "1W":
        count = 7
        break
      case "1M":
        count = 30
        break
      case "1Y":
        count = 12
        break
      default:
        count = 24
    }

    // Create chart
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: generateLabels(count, activeTimeframe),
        datasets: [
          {
            label: "Portfolio Value (USD)",
            data: generateData(count),
            backgroundColor: "rgba(93, 92, 222, 0.1)",
            borderColor: "rgba(93, 92, 222, 1)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(93, 92, 222, 1)",
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#333",
            bodyColor: "#333",
            borderColor: "#ddd",
            borderWidth: 1,
            padding: 10,
            cornerRadius: 4,
            displayColors: false,
            callbacks: {
              label: (context: any) => `$${context.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: false,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [activeTimeframe])

  return (
    <>
      <h2 className="text-xl font-medium mb-4">Portfolio Overview</h2>
      <div className="flex mb-4">
        <button
          className={`px-3 py-1 mr-2 rounded ${activeTimeframe === "1D" ? "tab-active" : ""}`}
          onClick={() => setActiveTimeframe("1D")}
        >
          1D
        </button>
        <button
          className={`px-3 py-1 mr-2 rounded ${activeTimeframe === "1W" ? "tab-active" : ""}`}
          onClick={() => setActiveTimeframe("1W")}
        >
          1W
        </button>
        <button
          className={`px-3 py-1 mr-2 rounded ${activeTimeframe === "1M" ? "tab-active" : ""}`}
          onClick={() => setActiveTimeframe("1M")}
        >
          1M
        </button>
        <button
          className={`px-3 py-1 rounded ${activeTimeframe === "1Y" ? "tab-active" : ""}`}
          onClick={() => setActiveTimeframe("1Y")}
        >
          1Y
        </button>
      </div>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </>
  )
}
