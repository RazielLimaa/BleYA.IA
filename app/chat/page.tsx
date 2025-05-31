"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Bot, User, Send, Code2 } from "lucide-react"
import Aurora from "@/components/aurora"
import MessageContent from "@/components/message-content"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          '# 🚀 Olá! Eu sou a **BleYa**\n\n> *Sua assistente de programação com IA de última geração*\n\nEstou equipado com conhecimento avançado em:\n\n- **JavaScript & TypeScript** - Desenvolvimento web moderno\n- **Python & Machine Learning** - IA e ciência de dados  \n- **React & Next.js** - Frameworks frontend\n- **Algoritmos & Estruturas de Dados** - Fundamentos CS\n- **DevOps & Cloud** - Infraestrutura e deploy\n- **Databases & APIs** - Backend e integração\n\n```javascript\nconst pergunta = "O que você gostaria de aprender hoje?"\nconsole.log(pergunta)\n```\n\n*Estou pronto para te ajudar a dominar a programação! 💻✨*',
      },
    ],
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    handleSubmit(e)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#00d8ff", "#7c3aed", "#06b6d4"]} amplitude={1.2} blend={0.4} speed={0.6} />
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 z-0"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => (window.location.href = "/")}
                className="group p-1.5 sm:p-2 text-white/70 hover:text-cyan-400 transition-all duration-300 hover:bg-white/5 rounded-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                <ArrowLeft size={18} className="relative z-10" />
              </button>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* AI Avatar */}
                <div className="relative">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Bot size={16} className="text-white sm:hidden" />
                    <Bot size={20} className="text-white hidden sm:block" />
                  </div>
                </div>

                {/* AI Info */}
                <div>
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    BleYa
                  </h1>
                  <p className="text-[10px] sm:text-xs text-white/50">AI Programming Assistant</p>
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <Code2 size={14} className="text-cyan-400" />
                <span className="text-xs sm:text-sm text-white/80 hidden xs:inline">Gemini Pro</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="pt-16 sm:pt-20 pb-28 sm:pb-32 px-2 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-4 duration-500`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`flex gap-2 sm:gap-3 max-w-[92%] sm:max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg relative ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-cyan-500/25"
                          : "bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/25"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User size={14} className="text-white sm:hidden" />
                      ) : (
                        <Bot size={14} className="text-white sm:hidden" />
                      )}
                      {message.role === "user" ? (
                        <User size={16} className="text-white hidden sm:block" />
                      ) : (
                        <Bot size={16} className="text-white hidden sm:block" />
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`relative p-3 sm:p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg ${
                        message.role === "user"
                          ? "bg-white/5 border-cyan-400/20 hover:border-cyan-400/40 hover:shadow-cyan-500/10"
                          : "bg-white/5 border-white/10 hover:border-white/20 hover:shadow-purple-500/10"
                      }`}
                    >
                      {/* Message header */}
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <span
                          className={`text-xs font-medium ${
                            message.role === "user" ? "text-cyan-400" : "text-purple-400"
                          }`}
                        >
                          {message.role === "user" ? "Você" : "BleYa"}
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-current to-transparent opacity-20"></div>
                      </div>

                      {/* Message content with typing effect */}
                      <MessageContent content={message.content} isTyping={isLoading && index === messages.length - 1} />

                      {/* Glow effect on hover */}
                      <div
                        className={`absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                          message.role === "user"
                            ? "bg-gradient-to-br from-cyan-500/5 to-blue-500/5"
                            : "bg-gradient-to-br from-purple-500/5 to-pink-500/5"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Bot size={14} className="text-white sm:hidden" />
                    <Bot size={16} className="text-white hidden sm:block" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 sm:p-4 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-xs sm:text-sm text-white/70 ml-2">Processando...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-4xl mx-auto p-3 sm:p-6">
          <form onSubmit={onSubmit} className="flex gap-2 sm:gap-4 items-end">
            <div className="flex-1 relative group">
              {/* Glow effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500"></div>

              {/* Click glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 rounded-2xl blur-lg opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>

              <div className="relative overflow-hidden rounded-2xl">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Pergunte sobre programação..."
                  className="relative bg-white/5 border-white/20 text-white placeholder:text-white/50 rounded-2xl px-3 sm:px-6 py-3 sm:py-4 focus:border-cyan-400/50 focus:ring-cyan-400/20 min-h-[46px] sm:min-h-[56px] transition-all duration-300 hover:bg-white/10 focus:bg-white/10 group-focus-within:shadow-lg group-focus-within:shadow-cyan-500/20 text-sm sm:text-base"
                  disabled={isLoading}
                />

                {/* Shimmer effect - INSIDE the input container */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-focus-within:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl p-3 sm:p-4 transition-all duration-300 flex items-center justify-center min-w-[46px] sm:min-w-[56px] h-[46px] sm:h-[56px] shadow-lg hover:scale-105 hover:shadow-cyan-500/30 active:scale-95"
            >
              {/* Button shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

              {/* Click glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/20 rounded-2xl opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>

              <Send size={18} className="relative z-10 sm:hidden" />
              <Send size={20} className="relative z-10 hidden sm:block" />
            </button>
          </form>

          <div className="text-center mt-2 sm:mt-4">
            <p className="text-white/40 text-xs sm:text-sm">
              Powered by <span className="text-cyan-400 font-medium">Google Gemini AI</span> • BleYa está pronto para
              ensinar! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
