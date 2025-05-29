"use client"

import { Code2, Palette, Zap, Github, Linkedin, Mail } from "lucide-react"
import PixelCard from "@/components/pixel-card"

export default function DeveloperSection() {
  return (
    <section className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-20">
          <div className="text-5xl md:text-6xl font-bold mb-6">Sobre o Projeto</div>
          <div className="text-2xl md:text-3xl text-cyan-400 mb-8">Desenvolvido por Raziel</div>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Este projeto nasceu da paixão por educação e tecnologia, combinando design moderno com funcionalidades
            avançadas de IA para criar uma experiência de aprendizado única e envolvente.
          </p>
        </div>

        {/* Developer info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <PixelCard
            variant="blue"
            className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">A Visão</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                A ideia por trás do BleYa era criar uma plataforma que tornasse o aprendizado de programação mais
                acessível e divertido. Combinando elementos visuais impressionantes com inteligência artificial, o
                objetivo é proporcionar uma experiência educacional que inspire e motive estudantes de todas as idades.
              </p>
              <p className="text-white/80 leading-relaxed">
                Cada detalhe foi pensado para criar uma jornada de aprendizado envolvente, desde os efeitos visuais até
                a integração com IA para suporte personalizado.
              </p>
            </div>
          </PixelCard>

          <PixelCard
            variant="blue"
            className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">O Desenvolvedor</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                <strong>Raziel</strong> é um desenvolvedor apaixonado por criar experiências digitais inovadoras. Com
                expertise em desenvolvimento full-stack e design de interfaces, ele combina conhecimento técnico com
                criatividade para construir aplicações que fazem a diferença.
              </p>
              <p className="text-white/80 leading-relaxed mb-6">
                Especializado em tecnologias modernas e sempre em busca de novas formas de aplicar IA para resolver
                problemas reais e melhorar a experiência do usuário.
              </p>

              {/* Social links */}
              <div className="flex gap-4">
                <a href="https://github.com/RazielLimaa" className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Github size={20} className="text-white/70 hover:text-white" />
                </a>
                <a href="https://www.linkedin.com/in/raziel-freitas-lima-ab3592332/" className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Linkedin size={20} className="text-white/70 hover:text-white" />
                </a>
                <a href="mailto:eurael30215@gmail.com" className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Mail size={20} className="text-white/70 hover:text-white" />
                </a>
              </div>
            </div>
          </PixelCard>
        </div>

        {/* Technologies used */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-8">Tecnologias Utilizadas</h3>
          <p className="text-white/70 mb-12 max-w-2xl mx-auto">
            Este projeto foi construído utilizando as mais modernas tecnologias web, garantindo performance,
            escalabilidade e uma experiência de usuário excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <PixelCard
            variant="blue"
            className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
          >
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Code2 className="w-12 h-12 text-cyan-400" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Frontend</h4>
              <ul className="text-white/70 space-y-2 text-sm">
                <li>
                  <strong>Next.js 14</strong> - Framework React
                </li>
                <li>
                  <strong>TypeScript</strong> - Tipagem estática
                </li>
                <li>
                  <strong>Tailwind CSS</strong> - Estilização
                </li>
                <li>
                  <strong>GSAP</strong> - Animações avançadas
                </li>
                <li>
                  <strong>Three.js</strong> - Gráficos 3D
                </li>
                <li>
                  <strong>WebGL</strong> - Efeitos visuais
                </li>
              </ul>
            </div>
          </PixelCard>

          <PixelCard
            variant="blue"
            className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
          >
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Zap className="w-12 h-12 text-cyan-400" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Inteligência Artificial</h4>
              <ul className="text-white/70 space-y-2 text-sm">
                <li>
                  <strong>Google Gemini AI</strong> - Modelo de linguagem
                </li>
                <li>
                  <strong>Vercel AI SDK</strong> - Integração de IA
                </li>
                <li>
                  <strong>Streaming</strong> - Respostas em tempo real
                </li>
                <li>
                  <strong>Context Aware</strong> - IA contextual
                </li>
                <li>
                  <strong>Personalization</strong> - Aprendizado adaptativo
                </li>
              </ul>
            </div>
          </PixelCard>

          <PixelCard
            variant="blue"
            className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
          >
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Palette className="w-12 h-12 text-cyan-400" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Design & UX</h4>
              <ul className="text-white/70 space-y-2 text-sm">
                <li>
                  <strong>Responsive Design</strong> - Mobile-first
                </li>
                <li>
                  <strong>Dark Theme</strong> - Interface moderna
                </li>
                <li>
                  <strong>Micro-interactions</strong> - Feedback visual
                </li>
                <li>
                  <strong>Accessibility</strong> - Inclusivo
                </li>
                <li>
                  <strong>Performance</strong> - Otimizado
                </li>
              </ul>
            </div>
          </PixelCard>
        </div>

        {/* Technical highlights */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Destaques Técnicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-cyan-400">Efeitos Visuais Avançados</h4>
              <ul className="text-white/70 space-y-2">
                <li>• Sistema de partículas interativo com WebGL</li>
                <li>• Efeitos Aurora Borealis em tempo real</li>
                <li>• Animações fluidas com GSAP e ScrollTrigger</li>
                <li>• Texto ASCII 3D com Three.js</li>
                <li>• Cursor splash com simulação de fluidos</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-cyan-400">Funcionalidades Inteligentes</h4>
              <ul className="text-white/70 space-y-2">
                <li>• Chat AI integrado com Google Gemini</li>
                <li>• Sistema de lições interativas</li>
                <li>• Editor de código com syntax highlighting</li>
                <li>• Validação automática de exercícios</li>
                <li>• Assistente YA contextual por lição</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
