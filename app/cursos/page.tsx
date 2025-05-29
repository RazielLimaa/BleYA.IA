"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navigation from "@/components/navigation"
import CourseCard from "@/components/course-card"
import Aurora from "@/components/aurora"
import SplashCursor from "@/components/splash-cursor"

gsap.registerPlugin(ScrollTrigger)

export default function CoursesPage() {
  useEffect(() => {
    // Animações de entrada
    gsap.fromTo(
      ".page-title",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
    )

    gsap.fromTo(
      ".course-card",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
      },
    )
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#00d8ff", "#7cff67", "#ff6b6b"]} amplitude={1.5} blend={0.7} speed={1.0} />
      </div>

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/40 z-0"></div>

      {/* Splash Cursor Effect */}
      <SplashCursor />

      {/* Content */}
      <div className="relative z-10">
        <Navigation />

        <main className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="page-title text-4xl md:text-5xl font-bold mb-4 text-center">Cursos de Programação</h1>
            <p className="text-center text-white/70 mb-16 max-w-2xl mx-auto">
              Aprenda programação através de lições interativas e jogos divertidos. Escolha um curso abaixo para começar
              sua jornada.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CourseCard
                title="JavaScript Básico"
                description="Aprenda os fundamentos do JavaScript através de jogos interativos e desafios práticos."
                image="/placeholder.svg?height=200&width=400"
                lessons={3}
                level="Iniciante"
                href="/cursos/javascript-basico"
                color="from-yellow-400 to-orange-500"
                icon="code"
              />

              <CourseCard
                title="Python para Iniciantes"
                description="Descubra o mundo da programação Python com exercícios divertidos e projetos simples."
                image="/placeholder.svg?height=200&width=400"
                lessons={3}
                level="Iniciante"
                href="#"
                color="from-blue-400 to-indigo-500"
                icon="terminal"
                comingSoon
              />

              <CourseCard
                title="HTML & CSS Fundamentos"
                description="Crie suas primeiras páginas web e aprenda a estilizá-las com CSS."
                image="/placeholder.svg?height=200&width=400"
                lessons={3}
                level="Iniciante"
                href="#"
                color="from-pink-400 to-purple-500"
                icon="layout"
                comingSoon
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
