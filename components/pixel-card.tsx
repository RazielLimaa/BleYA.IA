"use client"

import type React from "react"
import { JSX, useEffect, useRef } from "react"
import "./pixel-card.css"

class Pixel {
  width: number
  height: number
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  color: string
  speed: number
  size: number
  sizeStep: number
  minSize: number
  maxSizeInteger: number
  maxSize: number
  delay: number
  counter: number
  counterStep: number
  isIdle: boolean
  isReverse: boolean
  isShimmer: boolean

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width
    this.height = canvas.height
    this.ctx = context
    this.x = x
    this.y = y
    this.color = color
    this.speed = this.getRandomValue(0.1, 0.9) * speed
    this.size = 0
    this.sizeStep = Math.random() * 0.4
    this.minSize = 0.5
    this.maxSizeInteger = 2
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger)
    this.delay = delay
    this.counter = 0
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01
    this.isIdle = false
    this.isReverse = false
    this.isShimmer = false
  }

  private getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  private draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size)
  }

  appear() {
    this.isIdle = false
    if (this.counter <= this.delay) {
      this.counter += this.counterStep
      return
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true
    }
    if (this.isShimmer) {
      this.shimmer()
    } else {
      this.size += this.sizeStep
    }
    this.draw()
  }

  disappear() {
    this.isShimmer = false
    this.counter = 0
    if (this.size <= 0) {
      this.isIdle = true
      return
    }
    this.size -= 0.1
    this.draw()
  }

  private shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true
    } else if (this.size <= this.minSize) {
      this.isReverse = false
    }
    this.size += this.isReverse ? -this.speed : this.speed
  }
}

function getEffectiveSpeed(value: number, reducedMotion: boolean) {
  const min = 0
  const max = 100
  const throttle = 0.001
  if (value <= min || reducedMotion) {
    return min
  } else if (value >= max) {
    return max * throttle
  } else {
    return value * throttle
  }
}

const VARIANTS = {
  default: {
    activeColor: null,
    gap: 5,
    speed: 35,
    colors: "#f8fafc,#f1f5f9,#cbd5e1",
    noFocus: false,
  },
  blue: {
    activeColor: "#e0f2fe",
    gap: 10,
    speed: 25,
    colors: "#00d8ff,#7cff67,#ff6b6b",
    noFocus: false,
  },
  yellow: {
    activeColor: "#fef08a",
    gap: 3,
    speed: 20,
    colors: "#fef08a,#fde047,#eab308",
    noFocus: false,
  },
  pink: {
    activeColor: "#fecdd3",
    gap: 6,
    speed: 80,
    colors: "#fecdd3,#fda4af,#e11d48",
    noFocus: true,
  },
} as const

type VariantType = keyof typeof VARIANTS

interface PixelCardProps {
  variant?: VariantType
  gap?: number
  speed?: number
  colors?: string
  noFocus?: boolean
  className?: string
  children: React.ReactNode
}

export default function PixelCard({
  variant = "blue",
  gap,
  speed,
  colors,
  noFocus,
  className = "",
  children,
}: PixelCardProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const animationRef = useRef<number | null>(null)
  const timePreviousRef = useRef(performance.now())
  const reducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current

  const variantCfg = VARIANTS[variant]
  const finalGap = gap ?? variantCfg.gap
  const finalSpeed = speed ?? variantCfg.speed
  const finalColors = colors ?? variantCfg.colors
  const finalNoFocus = noFocus ?? variantCfg.noFocus

  const initPixels = () => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const rect = container.getBoundingClientRect()
    const width = Math.floor(rect.width)
    const height = Math.floor(rect.height)
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const colorsArray = finalColors.split(",")
    const pxs: Pixel[] = []

    for (let x = 0; x < width; x += finalGap) {
      for (let y = 0; y < height; y += finalGap) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)]
        const dx = x - width / 2
        const dy = y - height / 2
        const distance = Math.sqrt(dx * dx + dy * dy)
        const delay = reducedMotion ? 0 : distance
        pxs.push(new Pixel(canvas, ctx, x, y, color, getEffectiveSpeed(finalSpeed, reducedMotion), delay))
      }
    }
    pixelsRef.current = pxs
  }

  const doAnimate = (fnName: 'appear' | 'disappear') => {
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName))

    const now = performance.now()
    const elapsed = now - timePreviousRef.current
    const interval = 1000 / 1000 // ~60 FPS

    if (elapsed < interval) return
    timePreviousRef.current = now - (elapsed % interval)

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let allIdle = true
    for (const pixel of pixelsRef.current) {
      pixel[fnName]()
      if (!pixel.isIdle) {
        allIdle = false
      }
    }
    if (allIdle && animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }

  const handleAnimation = (name: 'appear' | 'disappear') => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
    }
    animationRef.current = requestAnimationFrame(() => doAnimate(name))
  }

  const onMouseEnter = () => handleAnimation("appear")
  const onMouseLeave = () => handleAnimation("disappear")
  const onFocus: React.FocusEventHandler<HTMLDivElement> = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleAnimation("appear")
    }
  }
  const onBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleAnimation("disappear")
    }
  }

  useEffect(() => {
    initPixels()
    const observer = new ResizeObserver(() => {
      initPixels()
    })
    const container = containerRef.current
    if (container) {
      observer.observe(container)
    }
    return () => {
      observer.disconnect()
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [finalGap, finalSpeed, finalColors, finalNoFocus])

  return (
    <div
      ref={containerRef}
      className={`pixel-card ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={finalNoFocus ? undefined : onFocus}
      onBlur={finalNoFocus ? undefined : onBlur}
      tabIndex={finalNoFocus ? -1 : 0}
    >
      <canvas className="pixel-canvas" ref={canvasRef} />
      {children}
    </div>
  )
}
