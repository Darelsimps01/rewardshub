"use client"

import { useEffect, useState } from "react"

interface NotificationProps {
  message: string
}

export default function Notification({ message }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [message])

  return <div className={`notification ${isVisible ? "show" : ""}`}>{message}</div>
}
