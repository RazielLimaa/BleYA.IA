"use client"

import Link from "next/link"
import { Code, Terminal, Layout, Lock } from "lucide-react"

interface CourseCardProps {
  title: string
  description: string
  image: string
  lessons: number
  level: string
  href: string
  color: string
  icon: "code" | "terminal" | "layout"
  comingSoon?: boolean
}

export default function CourseCard({
  title,
  description,
  image,
  lessons,
  level,
  href,
  color,
  icon,
  comingSoon = false,
}: CourseCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "code":
        return <Code className="w-6 h-6" />
      case "terminal":
        return <Terminal className="w-6 h-6" />
      case "layout":
        return <Layout className="w-6 h-6" />
      default:
        return <Code className="w-6 h-6" />
    }
  }

  return (
    <div className="course-card group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
      {/* Imagem de fundo */}
      <div className="h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20`}></div>
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Conteúdo */}
      <div className="p-6 relative z-20">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white`}>{getIcon()}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        <p className="text-white/70 mb-6 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">{lessons} lições</span>
            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
            <span className="text-sm text-white/60">{level}</span>
          </div>
        </div>

        {comingSoon ? (
          <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/10 text-white/50 cursor-not-allowed">
            <Lock size={16} />
            <span>Em breve</span>
          </div>
        ) : (
          <Link
            href={href}
            className="block text-center py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white transition-all duration-300"
          >
            Começar Curso
          </Link>
        )}

        {/* Efeito de hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  )
}
