"use client"

import type React from "react"
import { useState, useEffect, useRef, type RefObject } from "react"
import "./variable-proximity.css"

interface VariableProximityProps {
  label: string
  className?: string
  fromFontVariationSettings: string
  toFontVariationSettings: string
  containerRef: RefObject<HTMLElement>
  radius: number
  falloff?: "linear" | "exponential" | "inverse-exponential"
}

const VariableProximity: React.FC<VariableProximityProps> = ({
  label,
  className = "",
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius,
  falloff = "linear",
}) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseLeave = () => {
      setMousePosition(null)
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [containerRef])

  useEffect(() => {
    const element = elementRef.current
    if (!element || !mousePosition) {
      if (element) {
        element.style.fontVariationSettings = fromFontVariationSettings
      }
      return
    }

    const rect = element.getBoundingClientRect()
    const elementCenterX = rect.left + rect.width / 2
    const elementCenterY = rect.top + rect.height / 2

    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return

    const elementPositionX = rect.left - containerRect.left + rect.width / 2
    const elementPositionY = rect.top - containerRect.top + rect.height / 2

    const distance = Math.sqrt(
      Math.pow(mousePosition.x - elementPositionX, 2) + Math.pow(mousePosition.y - elementPositionY, 2),
    )

    let proximityFactor = 0
    if (distance < radius) {
      if (falloff === "linear") {
        proximityFactor = 1 - distance / radius
      } else if (falloff === "exponential") {
        proximityFactor = Math.pow(1 - distance / radius, 2)
      } else if (falloff === "inverse-exponential") {
        proximityFactor = Math.sqrt(1 - distance / radius)
      }
    }

    // Parse variation settings
    const fromSettings = parseVariationSettings(fromFontVariationSettings)
    const toSettings = parseVariationSettings(toFontVariationSettings)

    // Interpolate between from and to settings
    const interpolatedSettings = interpolateSettings(fromSettings, toSettings, proximityFactor)

    // Apply interpolated settings
    element.style.fontVariationSettings = formatVariationSettings(interpolatedSettings)
  }, [mousePosition, fromFontVariationSettings, toFontVariationSettings, radius, falloff, containerRef])

  // Helper functions for parsing and formatting font variation settings
  const parseVariationSettings = (settings: string) => {
    const result: Record<string, number> = {}
    const parts = settings.split(",").map((part) => part.trim())

    parts.forEach((part) => {
      const match = part.match(/'([^']+)'\s+(\d+)/)
      if (match) {
        const [, tag, value] = match
        result[tag] = Number.parseInt(value, 10)
      }
    })

    return result
  }

  const interpolateSettings = (
    from: Record<string, number>,
    to: Record<string, number>,
    factor: number,
  ): Record<string, number> => {
    const result: Record<string, number> = {}

    // Combine all keys from both objects
    const allKeys = new Set([...Object.keys(from), ...Object.keys(to)])

    allKeys.forEach((key) => {
      const fromValue = from[key] || 0
      const toValue = to[key] || 0
      result[key] = fromValue + (toValue - fromValue) * factor
    })

    return result
  }

  const formatVariationSettings = (settings: Record<string, number>): string => {
    return Object.entries(settings)
      .map(([tag, value]) => `'${tag}' ${Math.round(value)}`)
      .join(", ")
  }

  return (
    <div ref={elementRef} className={`variable-proximity ${className}`}>
      {label}
    </div>
  )
}

export default VariableProximity
