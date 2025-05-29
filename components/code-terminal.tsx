"use client"

import { useState, useEffect, useRef } from "react"
import { Play, RefreshCw, CheckCircle, XCircle } from "lucide-react"

interface CodeTerminalProps {
  initialCode?: string
  challenge?: {
    description: string
    expectedOutput?: string
    validator?: (code: string, output: string) => boolean
  }
  height?: string
}

export default function CodeTerminal({ initialCode = "", challenge, height = "300px" }: CodeTerminalProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  const handleRun = () => {
    setIsRunning(true)
    setError(null)
    setOutput("")
    setIsSuccess(null)

    // Simular console.log
    const originalConsoleLog = console.log
    const logs: string[] = []

    console.log = (...args) => {
      logs.push(args.map((arg) => String(arg)).join(" "))
    }

    try {
      // Executar o código com segurança
      const safeEval = new Function(
        "return " +
          `
        (function() {
          try {
            ${code}
            return { success: true, output: "" };
          } catch (error) {
            return { success: false, error: error.message };
          }
        })()
      `,
      )

      const result = safeEval()

      if (!result.success) {
        setError(result.error)
      }

      // Restaurar console.log
      console.log = originalConsoleLog

      // Mostrar output
      const outputText = logs.join("\n")
      setOutput(outputText)

      // Verificar desafio
      if (challenge && challenge.validator) {
        const success = challenge.validator(code, outputText)
        setIsSuccess(success)
      } else if (challenge && challenge.expectedOutput) {
        const success = outputText.trim() === challenge.expectedOutput.trim()
        setIsSuccess(success)
      }
    } catch (err: any) {
      console.log = originalConsoleLog
      setError(err.message)
    } finally {
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    setCode(initialCode)
    setOutput("")
    setError(null)
    setIsSuccess(null)
  }

  // Tab key handling
  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === "Tab" && document.activeElement === editorRef.current) {
        e.preventDefault()
        const start = editorRef.current!.selectionStart
        const end = editorRef.current!.selectionEnd

        // Insert tab at cursor position
        const newCode = code.substring(0, start) + "  " + code.substring(end)
        setCode(newCode)

        // Move cursor after tab
        setTimeout(() => {
          editorRef.current!.selectionStart = editorRef.current!.selectionEnd = start + 2
        }, 0)
      }
    }

    document.addEventListener("keydown", handleTabKey)
    return () => document.removeEventListener("keydown", handleTabKey)
  }, [code])

  return (
    <div className="bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
      {/* Desafio */}
      {challenge && (
        <div className="bg-white/5 p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold mb-2">Desafio:</h3>
          <p className="text-white/80">{challenge.description}</p>
        </div>
      )}

      {/* Editor */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-400/60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400/60"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/60"></div>
          </div>
          <div className="text-xs text-white/50">editor.js</div>
        </div>
        <textarea
          ref={editorRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-gray-900/50 text-white/90 font-mono text-sm p-4 rounded-md border border-white/10 focus:border-yellow-400/50 focus:outline-none resize-none"
          style={{ height }}
          spellCheck="false"
          placeholder="Digite seu código JavaScript aqui..."
        />
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 py-2 px-4 rounded-md bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white transition-all duration-300 disabled:opacity-50"
          >
            <Play size={16} />
            <span>Executar</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 py-2 px-4 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
          >
            <RefreshCw size={16} />
            <span>Resetar</span>
          </button>
        </div>

        {isSuccess !== null && (
          <div
            className={`flex items-center gap-2 py-2 px-4 rounded-md ${
              isSuccess
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            {isSuccess ? <CheckCircle size={16} /> : <XCircle size={16} />}
            <span>{isSuccess ? "Desafio concluído!" : "Tente novamente!"}</span>
          </div>
        )}
      </div>

      {/* Output */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-white/70">Console:</div>
        </div>
        <div className="bg-black/50 text-white/90 font-mono text-sm p-4 rounded-md border border-white/10 min-h-[100px] max-h-[200px] overflow-auto">
          {isRunning ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
              <span>Executando...</span>
            </div>
          ) : error ? (
            <div className="text-red-400">Erro: {error}</div>
          ) : output ? (
            <pre className="whitespace-pre-wrap">{output}</pre>
          ) : (
            <div className="text-white/50">O resultado aparecerá aqui...</div>
          )}
        </div>
      </div>
    </div>
  )
}
