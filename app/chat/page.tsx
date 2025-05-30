"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Bot, User, Send, Zap, Code2 } from "lucide-react"
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
          '# Olá! Eu sou o **BleYa**\n\n> *Sua assistente de programação com IA de última geração*\n\nEstou equipado com conhecimento avançado em:\n\n- **JavaScript & TypeScript** - Desenvolvimento web moderno\n- **Python & Machine Learning** - IA e ciência de dados  \n- **React & Next.js** - Frameworks frontend\n- **Algoritmos & Estruturas de Dados** - Fundamentos CS\n- **DevOps & Cloud** - Infraestrutura e deploy\n- **Databases & APIs** - Backend e integração\n\n```javascript\nconst pergunta = "O que você gostaria de aprender hoje?"\nconsole.log(pergunta)\n```\n\n*Estou pronto para te ajudar a dominar a programação! 💻✨*',
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
        <Aurora colorStops={["#00d8ff", "#7c3aed", "#06b6d4", "#8b5cf6"]} amplitude={2} blend={0.6} speed={0.8} />
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-0"></div>

      {/* Animated Grid */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,216,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,216,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-cyan-500/20">
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-2 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40 delay-1000"></div>
          <div className="absolute bottom-1 left-2/3 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-50 delay-500"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 relative">
          <div className="flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => (window.location.href = "/")}
                className="group p-2 text-white/70 hover:text-cyan-400 transition-all duration-300 hover:bg-cyan-500/10 rounded-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                <ArrowLeft size={18} className="sm:w-5 sm:h-5 relative z-10" />
              </button>

              <div className="flex items-center gap-3 sm:gap-4">
                {/* AI Avatar with hologram effect */}
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 relative overflow-hidden">
                    <Bot size={18} className="sm:w-6 sm:h-6 text-white relative z-10" />

                    {/* Hologram scanning effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent h-full w-full translate-y-[-100%] animate-pulse duration-2000"></div>

                    {/* Rotating border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30 animate-spin duration-3000"></div>
                  </div>

                  {/* Status indicator */}
                  <div className="absolute -top-1 -right-1 flex items-center gap-1">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Neural network lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-full w-8 h-px bg-gradient-to-r from-cyan-400/50 to-transparent animate-pulse delay-300"></div>
                    <div className="absolute top-1/3 left-full w-6 h-px bg-gradient-to-r from-purple-400/30 to-transparent animate-pulse delay-700"></div>
                  </div>
                </div>

                {/* AI Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      BleYa
                    </h1>
                    <div className="px-2 py-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full">
                      <span className="text-xs font-medium text-cyan-300">AI v2.0</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 hidden sm:block font-mono">Neural Programming Assistant</p>
                </div>
              </div>
            </div>

            {/* Right section - Status indicators */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Connection status */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-sm">
                <div className="relative">
                  <Zap size={14} className="text-green-400" />
                  <div className="absolute inset-0 animate-ping">
                    <Zap size={14} className="text-green-400 opacity-30" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-green-400 font-medium block">Online</span>
                  <span className="text-xs text-green-300/70 font-mono">99.9%</span>
                </div>
              </div>

              {/* AI Model indicator */}
              <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl backdrop-blur-sm">
                <div className="relative">
                  <Code2 size={14} className="text-purple-400" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <div className="hidden sm:block space-y-0.5">
                  <span className="text-xs text-purple-400 font-medium block">Gemini</span>
                  <span className="text-xs text-purple-300/70 font-mono">Pro</span>
                </div>
              </div>

              {/* Performance indicator */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl backdrop-blur-sm">
                <div className="flex flex-col gap-0.5">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-1 h-4 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                    <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-cyan-400 font-medium block">Speed</span>
                  <span className="text-xs text-cyan-300/70 font-mono">Fast</span>
                </div>
              </div>
            </div>
          </div>

          {/* Animated border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="pt-16 sm:pt-20 pb-24 sm:pb-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-4 duration-500`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg relative ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-cyan-500/25"
                          : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 shadow-purple-500/25"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User size={14} className="sm:w-4 sm:h-4 text-white" />
                      ) : (
                        <Bot size={14} className="sm:w-4 sm:h-4 text-white" />
                      )}

                      {/* Pulse effect for AI */}
                      {message.role === "assistant" && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 animate-ping opacity-20"></div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`relative p-3 sm:p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-400/20 hover:border-cyan-400/40 shadow-cyan-500/10"
                          : "bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-white/20 shadow-purple-500/10"
                      }`}
                    >
                      {/* Message header */}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-medium ${
                            message.role === "user" ? "text-cyan-400" : "text-purple-400"
                          }`}
                        >
                          {message.role === "user" ? "Você" : "BleYa"}
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-current to-transparent opacity-20"></div>
                      </div>

                      {/* Message content */}
                      <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                        <MessageContent content={message.content} />
                      </div>

                      {/* Glow effect */}
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
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-lg shadow-purple-500/25 relative">
                    <Bot size={14} className="sm:w-4 sm:h-4 text-white" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 animate-ping opacity-20"></div>
                  </div>
                  <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-3 sm:p-4 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-sm text-white/70 ml-2">Processando...</span>
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
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <form onSubmit={onSubmit} className="flex gap-3 sm:gap-4 items-end">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Pergunte sobre programação, algoritmos, frameworks..."
                className="relative bg-white/5 border-white/20 text-white placeholder:text-white/50 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-16 focus:border-cyan-400/50 focus:ring-cyan-400/20 resize-none min-h-[48px] sm:min-h-[56px] transition-all duration-300 hover:bg-white/10"
                disabled={isLoading}
              />

              {/* Input glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl p-3 sm:p-4 transition-all duration-300 flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-[48px] sm:h-[56px] shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Send size={18} className="sm:w-5 sm:h-5 relative z-10" />
            </button>
          </form>

          <div className="text-center mt-3 sm:mt-4">
            <p className="text-white/40 text-xs sm:text-sm">
              Powered by <span className="text-cyan-400 font-medium">Google Gemini AI</span> •
              <span className="text-purple-400 font-medium"> BleYa</span> está pronto para ensinar! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
// This code is a Next.js page that implements a chat interface with an AI assistant named BleYa.
// It features a visually appealing design with an animated aurora background, gradient overlays, and a responsive layout.
// The chat interface allows users to send messages and receive responses from the AI assistant, with a focus on programming topics.
// The page uses the `useChat` hook from the `ai/react` library to manage chat state and handle message submissions.
// The chat messages are displayed with a modern design, including user and AI avatars, message bubbles, and loading indicators.
// The page also includes a header with AI model information and connection status, enhancing the user experience.
// The chat input form is styled with a gradient background and includes a send button with an animated effect.
// The overall design is optimized for both desktop and mobile devices, ensuring a smooth user experience across different screen sizes.  