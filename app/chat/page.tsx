"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Bot, User, Send } from "lucide-react"
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
          "Olá! Eu sou o BleYa, seu assistente de programação com IA. O que você gostaria de aprender hoje? Posso ajudar com JavaScript, Python, React, algoritmos, estruturas de dados e muito mais!",
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
    handleSubmit(e)
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#00d8ff", "#7cff67", "#ff6b6b"]} amplitude={1.5} blend={0.7} speed={1.0} />
      </div>

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/40 z-0"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="p-2 text-white/70 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <h1 className="text-xl font-semibold">BleYa</h1>
            </div>
          </div>
          <div className="text-sm text-white/50 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Conectado
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="pt-20 pb-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                        : "bg-gradient-to-r from-purple-500 to-pink-500"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-white" />
                    )}
                  </div>

                  {/* Message */}
                  <div
                    className={`p-4 rounded-2xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30"
                        : "bg-white/5 backdrop-blur-sm border border-white/10"
                    }`}
                  >
                    <MessageContent content={message.content} />
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                      <span className="text-sm text-white/70 ml-2">Pensando...</span>
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
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10">
        <div className="max-w-4xl mx-auto p-6">
          <form onSubmit={onSubmit} className="flex gap-4 items-end">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Pergunte-me qualquer coisa sobre programação..."
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 rounded-2xl px-6 py-4 pr-16 focus:border-cyan-400/50 focus:ring-cyan-400/20 resize-none min-h-[56px]"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl p-4 transition-all duration-300 flex items-center justify-center min-w-[56px] h-[56px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Send size={20} className="relative z-10" />
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-4">
            Powered by Google Gemini AI • BleYa está pronto para ensinar!
          </p>
        </div>
      </div>
    </div>
  )
}
