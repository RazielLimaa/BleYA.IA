"use client"

import { Code, Brain, Rocket } from "lucide-react"
import ShinyText from "@/components/shiny-text"
import PixelCard from "@/components/pixel-card"

export default function AboutSection() {
  return (
    <section className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-20">
          <div className="text-5xl md:text-6xl font-bold mb-6">Aprenda Programação</div>

          <div className="text-5xl md:text-6xl font-bold text-cyan-400">Com o Poder da IA</div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <PixelCard
            variant="blue"
            className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
          >
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <Code className="w-12 h-12 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-xl font-semibold mb-4">Programação Interativa</div>
              <p className="text-white/70 leading-relaxed">
                Aprenda programação através de exercícios práticos com feedback e orientação em tempo real da IA.
              </p>
            </div>
          </PixelCard>

          <PixelCard
            variant="blue"
            className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
          >
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <Brain className="w-12 h-12 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-xl font-semibold mb-4">Aprendizado com IA</div>
              <p className="text-white/70 leading-relaxed">
                Caminhos de aprendizado personalizados, alimentados por IA avançada que se adapta ao seu estilo e ritmo
                de programação.
              </p>
            </div>
          </PixelCard>

          <PixelCard
            variant="blue"
            className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
          >
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <Rocket className="w-12 h-12 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-xl font-semibold mb-4">Habilidades para o Futuro</div>
              <p className="text-white/70 leading-relaxed">
                Domine tecnologias e frameworks de ponta que moldarão o futuro do desenvolvimento de software.
              </p>
            </div>
          </PixelCard>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-semibold mb-8 text-white/90">
            Pronto para Iniciar sua Jornada de Programação?
          </div>

          <div
            onClick={() => (window.location.href = "/chat")}
            className="cursor-pointer mx-auto inline-block py-3 px-8 rounded-full bg-transparent border border-white/30 hover:border-cyan-400/70 transition-all duration-300"
          >
            <ShinyText text="Comece a Aprender Agora" speed={3} className="text-white font-semibold" />
          </div>
        </div>
      </div>
    </section>
  )
}
