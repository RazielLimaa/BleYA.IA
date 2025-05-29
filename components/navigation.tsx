"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import ShinyText from "@/components/shiny-text"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Controle do scroll para mudar o background da nav
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Controla o overflow do body quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  // Alterna o menu mobile
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Links desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/cursos"
                className="text-white/70 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium"
              >
                Cursos
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium"
              >
                Biblioteca
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium"
              >
                Recursos
              </a>
            </div>

            {/* Logo central */}
            <div className="flex-1 flex justify-center">
              <a href="/" className="text-white text-lg font-bold">
                <ShinyText text="BleYA" className="text-white text-xl" />
              </a>
            </div>

            {/* Botão chat desktop */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => (window.location.href = "/chat")}
                className="bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-full px-4 py-1.5 cursor-pointer"
                aria-label="Abrir chat"
              >
                <ShinyText
                  text="Vamos Conversar!"
                  speed={3}
                  className="text-white text-sm"
                />
              </button>
            </div>

            {/* Botão menu mobile */}
            <button
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white focus:outline-none md:hidden"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Fechar menu mobile" : "Abrir menu mobile"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu
                size={20}
                className={cn(
                  "transform transition-transform duration-300",
                  isMobileMenuOpen ? "rotate-90" : "rotate-0"
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 bg-black/90 backdrop-blur-lg z-50 transition-transform duration-300 transform md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col h-full p-6">
          {/* Cabeçalho menu mobile */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
              aria-label="Fechar menu mobile"
            >
              <Menu size={20} className="transform rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Links mobile */}
          <nav className="flex flex-col space-y-6">
            {[
              { href: "/cursos", label: "Cursos" },
              { href: "#", label: "Biblioteca" },
              { href: "#", label: "Recursos" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="text-white/70 text-lg font-medium border-b border-white/10 pb-2 hover:text-cyan-400 transition-colors duration-300"
                onClick={toggleMobileMenu}
              >
                {label}
              </a>
            ))}
            <button
              className="bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-full px-4 py-2 cursor-pointer text-center mt-4 text-white text-lg"
              onClick={() => {
                window.location.href = "/chat"
                toggleMobileMenu()
              }}
            >
              <ShinyText text="Vamos Conversar!" speed={3} className="text-white text-lg" />
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}
