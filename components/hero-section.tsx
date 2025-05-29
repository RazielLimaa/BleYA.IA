"use client"

import ASCIIText from "@/components/ascii-text"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="w-full max-w-6xl mx-auto">
        {/* Título principal com efeito ASCII */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-full h-64 md:h-80 lg:h-96 relative">
            <ASCIIText text="BleYa!!!" enableWaves={true} asciiFontSize={4} textFontSize={280} planeBaseHeight={6} />
          </div>

          {/* Subtítulo pequeno */}
          <div className="text-center">
            <p className="text-sm md:text-base text-white/60 font-light tracking-wide">
              Criando Experiências de Aprendizado Incríveis e Ferramentas de IA Poderosas Para Destacar a Educação em
              Programação
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
