"use client"

import Link from "next/link"
import { Clock, ChevronRight } from "lucide-react"

interface LessonCardProps {
  number: number
  title: string
  description: string
  duration: string
  href: string
  concepts: string[]
}

export default function LessonCard({ number, title, description, duration, href, concepts }: LessonCardProps) {
  return (
    <div className="lesson-card group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-400/50 transition-all duration-300">
      {/* Número da lição */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold">
        {number}
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-white/70 mb-6">{description}</p>

        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-yellow-400" />
          <span className="text-sm text-white/60">{duration}</span>
        </div>

        <div className="mb-6">
          <p className="text-sm text-white/60 mb-2">Conceitos:</p>
          <div className="flex flex-wrap gap-2">
            {concepts.map((concept, index) => (
              <span
                key={index}
                className="text-xs py-1 px-2 rounded-full bg-white/10 border border-white/20 text-white/80"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={href}
          className="flex items-center justify-between py-2 px-4 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black transition-all duration-300"
        >
          <span>Iniciar Lição</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* Efeito de hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}
