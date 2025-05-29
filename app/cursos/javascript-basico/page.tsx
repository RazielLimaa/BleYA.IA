"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import LessonCard from "@/components/lesson-card"
import Aurora from "@/components/aurora"

gsap.registerPlugin(ScrollTrigger)

export default function JavaScriptCoursePage() {
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
      ".lesson-card",
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
        <Aurora colorStops={["#ffd700", "#ff8c00", "#ff4500"]} amplitude={1.5} blend={0.7} speed={1.0} />
      </div>

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/cursos" className="p-2 text-white/70 hover:text-white transition-colors duration-300">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-xl font-semibold">JavaScript Básico</h1>
            </div>
            <div className="text-sm text-white/50">3 lições • Iniciante</div>
          </div>
        </header>

        <main className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="page-title text-4xl md:text-5xl font-bold mb-4">JavaScript Básico</h1>
            <p className="text-white/70 mb-16 max-w-2xl">
              Aprenda os fundamentos do JavaScript através de jogos interativos e desafios práticos. Cada lição contém
              exercícios divertidos para testar seus conhecimentos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <LessonCard
                number={1}
                title="Jogo de Adivinhação"
                description="Aprenda variáveis e condicionais criando um jogo de adivinhação de números."
                duration="15 min"
                href="/cursos/javascript-basico/jogo-adivinhacao"
                concepts={["Variáveis", "Condicionais", "Funções"]}
              />

              <LessonCard
                number={2}
                title="Quiz de Programação"
                description="Pratique arrays e loops construindo um quiz interativo de programação."
                duration="20 min"
                href="/cursos/javascript-basico/quiz-programacao"
                concepts={["Arrays", "Loops", "Objetos"]}
              />

              <LessonCard
                number={3}
                title="Gerador de Histórias"
                description="Use strings e manipulação de texto para criar um gerador de histórias aleatórias."
                duration="25 min"
                href="/cursos/javascript-basico/gerador-historias"
                concepts={["Strings", "Template Literals", "Funções"]}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
