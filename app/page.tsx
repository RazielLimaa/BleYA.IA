"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import DeveloperSection from "@/components/developer-section"
import Aurora from "@/components/aurora"
import SplashCursor from "@/components/splash-cursor"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Registrar o plugin só no cliente
    gsap.registerPlugin(ScrollTrigger)

    // Initialize scroll animations
    gsap.fromTo(
      ".hero-content",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5,
      },
    )

    gsap.fromTo(
      ".hero-buttons",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.2,
      },
    )
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Splash Cursor Effect */}
      <SplashCursor />

      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#00d8ff", "#7cff67", "#ff6b6b"]} amplitude={2.0} blend={0.9} speed={1.5} />
      </div>

      {/* Dark overlay to make text more readable */}
      <div className="fixed inset-0 bg-black/30 z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <DeveloperSection />
      </div>
    </div>
  )
}
