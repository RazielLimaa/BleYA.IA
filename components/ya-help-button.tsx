"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "ai/react"
import { MessageSquare, X, Bot, Send } from "lucide-react"

interface YaHelpButtonProps {
  lessonTitle: string
}

export default function YaHelpButton({ lessonTitle }: YaHelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/ya-help",
    body: {
      lessonTitle,
    },
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: `Olá! 👋 Sou YA, sua assistente para a lição "${lessonTitle}". 

Estou aqui para ajudar você com qualquer dúvida sobre:
• Conceitos de programação
• Problemas no código
• Como completar os desafios
• Explicações mais detalhadas

Como posso ajudar você hoje? 😊`,
      },
    ],
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 py-3 px-5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-medium rounded-full shadow-lg transition-all duration-300 group hover:scale-105"
      >
        <MessageSquare size={20} />
        <span>Pedir ajuda para YA</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </button>

      {/* Chat modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          {/* Chat container */}
          <div className="relative bg-gray-900/95 border border-yellow-500/30 rounded-xl w-full max-w-lg h-[600px] flex flex-col z-10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Bot size={20} className="text-black" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white">YA</h3>
                  <p className="text-xs text-white/60">Assistente de Programação</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <X size={20} className="text-white/70 hover:text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="flex gap-3 max-w-[85%]">
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                          <Bot size={14} className="text-black" />
                        </div>
                      )}

                      <div
                        className={`p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-yellow-500/20 border border-yellow-500/30 text-white ml-auto"
                            : "bg-white/10 border border-white/20 text-white"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <Bot size={14} className="text-black" />
                      </div>
                      <div className="bg-white/10 border border-white/20 text-white p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                          <span className="text-sm text-white/70 ml-2">YA está pensando...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-yellow-500/20 bg-gray-900/50">
              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Digite sua dúvida aqui..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-medium rounded-lg transition-all duration-300 flex items-center justify-center min-w-[48px]"
                >
                  <Send size={16} />
                </button>
              </form>

              <div className="mt-2 text-center">
                <p className="text-xs text-white/40">Powered by Google Gemini AI • YA está aqui para ajudar! 🚀</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
