"use client"

import type React from "react"

import { useEffect } from "react"
import { X, BookOpen } from "lucide-react"

interface LessonModalProps {
  title: string
  content: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function LessonModal({ title, content, isOpen, onClose }: LessonModalProps) {
  // Prevenir scroll quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-gray-900/90 border border-yellow-500/30 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-yellow-500/20">
          <div className="flex items-center gap-2">
            <BookOpen className="text-yellow-400" size={20} />
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-colors">
            <X size={20} className="text-white/70 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">{content}</div>

        {/* Footer */}
        <div className="p-4 border-t border-yellow-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-colors"
          >
            Entendi!
          </button>
        </div>
      </div>
    </div>
  )
}
