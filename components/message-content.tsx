"use client"

import { useState, useEffect } from "react"
import { Copy, Check, FileCode, Terminal, Database, Globe, Cpu } from "lucide-react"
import type { JSX } from "react"

interface MessageContentProps {
  content: string
  isTyping?: boolean
}

interface CodeBlockProps {
  language: string
  code: string
  showLineNumbers?: boolean
}

// Modificar o CodeBlock para ser mais responsivo
function CodeBlock({ language, code, showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const getLanguageIcon = (lang: string) => {
    const icons: Record<string, JSX.Element> = {
      javascript: <FileCode className="w-3 h-3 text-yellow-400" />,
      typescript: <FileCode className="w-3 h-3 text-blue-400" />,
      python: <Cpu className="w-3 h-3 text-green-400" />,
      html: <Globe className="w-3 h-3 text-orange-400" />,
      css: <Globe className="w-3 h-3 text-blue-400" />,
      sql: <Database className="w-3 h-3 text-purple-400" />,
      bash: <Terminal className="w-3 h-3 text-green-400" />,
      shell: <Terminal className="w-3 h-3 text-green-400" />,
    }
    return icons[lang.toLowerCase()] || <FileCode className="w-3 h-3 text-gray-400" />
  }

  const highlightCode = (code: string, lang: string) => {
    const langLower = lang.toLowerCase()

    // Escape HTML first
    let escapedCode = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")

    // JavaScript/TypeScript - approach mais simples
    if (["javascript", "js", "typescript", "ts", "jsx", "tsx"].includes(langLower)) {
      // Apenas keywords básicas, sem regex complexos
      const keywords = [
        "function",
        "const",
        "let",
        "var",
        "if",
        "else",
        "for",
        "while",
        "return",
        "import",
        "export",
        "class",
        "extends",
        "async",
        "await",
        "try",
        "catch",
        "finally",
        "throw",
        "new",
        "this",
        "super",
      ]

      const booleans = ["true", "false", "null", "undefined"]
      const builtins = ["console", "document", "window", "Array", "Object", "String", "Number"]

      // Aplicar highlighting palavra por palavra
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "g")
        escapedCode = escapedCode.replace(regex, `${keyword}`)
      })

      booleans.forEach((bool) => {
        const regex = new RegExp(`\\b${bool}\\b`, "g")
        escapedCode = escapedCode.replace(regex, `${bool}`)
      })

      builtins.forEach((builtin) => {
        const regex = new RegExp(`\\b${builtin}\\b`, "g")
        escapedCode = escapedCode.replace(regex, `${builtin}`)
      })

      // Strings simples
      escapedCode = escapedCode.replace(/(&quot;[^&]*?&quot;)/g, '<span style="color: #fde047;">$1</span>')
      escapedCode = escapedCode.replace(/(&#39;[^&]*?&#39;)/g, '<span style="color: #fde047;">$1</span>')

      // Comentários simples
      escapedCode = escapedCode.replace(/(\/\/.*$)/gm, '<span style="color: #6b7280; font-style: italic;">$1</span>')

      // Números simples
      escapedCode = escapedCode.replace(/\b(\d+)\b/g, '<span style="color: #60a5fa;">$1</span>')
    }
    // Python - approach similar
    else if (["python", "py"].includes(langLower)) {
      const keywords = [
        "def",
        "class",
        "if",
        "elif",
        "else",
        "for",
        "while",
        "return",
        "import",
        "from",
        "try",
        "except",
        "finally",
        "with",
        "as",
      ]

      const booleans = ["True", "False", "None"]
      const builtins = ["print", "len", "range", "enumerate", "zip", "map", "filter"]

      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "g")
        escapedCode = escapedCode.replace(regex, `${keyword}`)
      })

      booleans.forEach((bool) => {
        const regex = new RegExp(`\\b${bool}\\b`, "g")
        escapedCode = escapedCode.replace(regex, `${bool}`)
      })

      builtins.forEach((builtin) => {
        const regex = new RegExp(`\\b${builtin}\\b`, "g")
        escapedCode = escapedCode.replace(regex, `${builtin}`)
      })

      // Comentários Python
      escapedCode = escapedCode.replace(/(#.*$)/gm, '<span style="color: #6b7280; font-style: italic;">$1</span>')

      // Números
      escapedCode = escapedCode.replace(/\b(\d+)\b/g, '<span style="color: #60a5fa;">$1</span>')
    }

    return escapedCode
  }

  const lines = code.split("\n")

  return (
    <div className="group my-4 sm:my-6 relative">
      {/* Code block header */}
      <div className="flex items-center justify-between bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-t-xl px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          {getLanguageIcon(language)}
          <span className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wider">{language}</span>
          <div className="h-3 sm:h-4 w-px bg-gray-600/50 hidden xs:block"></div>
          <span className="text-[10px] sm:text-xs text-gray-400 hidden xs:block">
            {lines.length} {lines.length === 1 ? "linha" : "linhas"}
          </span>
        </div>

        <button
          onClick={copyToClipboard}
          className="relative flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 group/btn active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />
              <span className="text-green-400">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Copiar</span>
            </>
          )}

          {/* Click glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg opacity-0 group-active/btn:opacity-100 transition-opacity duration-150"></div>
        </button>
      </div>

      {/* Code content */}
      <div className="relative bg-gray-900/90 backdrop-blur-sm border-x border-b border-gray-700/50 rounded-b-xl overflow-hidden">
        <div className="overflow-x-auto">
          <div className="flex min-w-full">
            {/* Line numbers */}
            {showLineNumbers && (
              <div className="flex-shrink-0 bg-gray-800/50 border-r border-gray-700/50 px-2 sm:px-3 py-2 sm:py-4 select-none">
                {lines.map((_, index) => (
                  <div
                    key={index}
                    className="text-[10px] sm:text-xs text-gray-500 leading-5 sm:leading-6 text-right font-mono"
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            )}

            {/* Code */}
            <div className="flex-1 p-2 sm:p-4">
              <pre className="text-xs sm:text-sm leading-5 sm:leading-6 font-mono">
                {lines.map((line, index) => (
                  <div
                    key={index}
                    className="hover:bg-white/5 transition-colors duration-150 -mx-2 sm:-mx-4 px-2 sm:px-4"
                  >
                    <code
                      dangerouslySetInnerHTML={{
                        __html: highlightCode(line || " ", language),
                      }}
                    />
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>

        {/* Code block glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  )
}

function TypingEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 20) // Velocidade da digitação

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text])

  return <span>{displayedText}</span>
}

// Modificar o processamento de markdown para ser mais responsivo
export default function MessageContent({ content, isTyping = false }: MessageContentProps) {
  const processMarkdown = (text: string) => {
    const elements: JSX.Element[] = []
    const lines = text.split("\n")
    let currentIndex = 0

    while (currentIndex < lines.length) {
      const line = lines[currentIndex]

      // Code blocks
      if (line.startsWith("```")) {
        const language = line.slice(3).trim() || "text"
        const codeLines: string[] = []
        currentIndex++

        while (currentIndex < lines.length && !lines[currentIndex].startsWith("```")) {
          codeLines.push(lines[currentIndex])
          currentIndex++
        }

        elements.push(<CodeBlock key={`code-${elements.length}`} language={language} code={codeLines.join("\n")} />)
        currentIndex++
        continue
      }

      // Headers
      if (line.startsWith("#")) {
        const level = line.match(/^#+/)?.[0].length || 1
        const text = line.replace(/^#+\s*/, "")

        const HeaderComponent = level === 1 ? "h1" : level === 2 ? "h2" : level === 3 ? "h3" : "h4"
        const className =
          level === 1
            ? "text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            : level === 2
              ? "text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-cyan-300 border-b border-cyan-500/30 pb-2"
              : level === 3
                ? "text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-purple-300"
                : "text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 text-blue-300"

        elements.push(
          <HeaderComponent key={`header-${elements.length}`} className={className}>
            {isTyping && elements.length === 0 ? <TypingEffect text={text} /> : processInlineFormatting(text)}
          </HeaderComponent>,
        )
        currentIndex++
        continue
      }

      // Lists
      if (line.match(/^[\s]*[-*+]\s/) || line.match(/^[\s]*\d+\.\s/)) {
        const listItems: string[] = []
        const isOrdered = line.match(/^[\s]*\d+\.\s/)

        while (
          currentIndex < lines.length &&
          (lines[currentIndex].match(/^[\s]*[-*+]\s/) ||
            lines[currentIndex].match(/^[\s]*\d+\.\s/) ||
            lines[currentIndex].trim() === "")
        ) {
          if (lines[currentIndex].trim() !== "") {
            listItems.push(lines[currentIndex].replace(/^[\s]*(?:[-*+]|\d+\.)\s/, ""))
          }
          currentIndex++
        }

        const ListComponent = isOrdered ? "ol" : "ul"
        const listClassName = isOrdered
          ? "list-decimal list-inside space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 pl-2 sm:pl-4"
          : "space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 pl-2 sm:pl-4"

        elements.push(
          <ListComponent key={`list-${elements.length}`} className={listClassName}>
            {listItems.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 sm:gap-3 text-white/90 text-sm sm:text-base animate-in slide-in-from-left-4 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {!isOrdered && <span className="text-cyan-400 mt-1 text-xs sm:text-sm">▸</span>}
                <span className="flex-1">{processInlineFormatting(item)}</span>
              </li>
            ))}
          </ListComponent>,
        )
        continue
      }

      // Blockquotes
      if (line.startsWith(">")) {
        const quoteLines: string[] = []

        while (
          currentIndex < lines.length &&
          (lines[currentIndex].startsWith(">") || lines[currentIndex].trim() === "")
        ) {
          if (lines[currentIndex].trim() !== "") {
            quoteLines.push(lines[currentIndex].replace(/^>\s?/, ""))
          }
          currentIndex++
        }

        elements.push(
          <blockquote
            key={`quote-${elements.length}`}
            className="border-l-4 border-purple-500/50 pl-3 sm:pl-6 py-2 sm:py-3 my-3 sm:my-4 bg-purple-500/5 rounded-r-xl backdrop-blur-sm animate-in slide-in-from-left-4 duration-500"
          >
            <div className="text-white/80 italic space-y-1.5 sm:space-y-2 text-sm sm:text-base">
              {quoteLines.map((quoteLine, index) => (
                <p key={index}>{processInlineFormatting(quoteLine)}</p>
              ))}
            </div>
          </blockquote>,
        )
        continue
      }

      // Regular paragraphs
      if (line.trim() !== "") {
        const paragraphLines: string[] = []

        while (
          currentIndex < lines.length &&
          lines[currentIndex].trim() !== "" &&
          !lines[currentIndex].startsWith("#") &&
          !lines[currentIndex].startsWith("```") &&
          !lines[currentIndex].match(/^[\s]*[-*+]\s/) &&
          !lines[currentIndex].match(/^[\s]*\d+\.\s/) &&
          !lines[currentIndex].startsWith(">")
        ) {
          paragraphLines.push(lines[currentIndex])
          currentIndex++
        }

        const paragraphText = paragraphLines.join(" ")
        elements.push(
          <p
            key={`paragraph-${elements.length}`}
            className="mb-3 sm:mb-4 text-white/90 text-sm sm:text-base leading-relaxed animate-in fade-in duration-500"
          >
            {isTyping && elements.length === 0 ? (
              <TypingEffect text={paragraphText} />
            ) : (
              processInlineFormatting(paragraphText)
            )}
          </p>,
        )
        continue
      }

      currentIndex++
    }

    return elements
  }

  const processInlineFormatting = (text: string) => {
    const parts: (string | JSX.Element)[] = []
    let currentText = text
    let keyCounter = 0

    // Process inline code first
    currentText = currentText.replace(/`([^`]+)`/g, (match, code) => {
      const placeholder = `__INLINE_CODE_${keyCounter}__`
      parts.push(
        <code
          key={`inline-${keyCounter}`}
          className="bg-gray-800/60 text-cyan-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm font-mono border border-gray-700/50 hover:bg-gray-700/60 transition-colors duration-200"
        >
          {code}
        </code>,
      )
      keyCounter++
      return placeholder
    })

    // Process bold
    currentText = currentText.replace(/\*\*([^*]+)\*\*/g, (match, text) => {
      const placeholder = `__BOLD_${keyCounter}__`
      parts.push(
        <strong key={`bold-${keyCounter}`} className="font-semibold text-cyan-300">
          {text}
        </strong>,
      )
      keyCounter++
      return placeholder
    })

    // Process italic
    currentText = currentText.replace(/\*([^*]+)\*/g, (match, text) => {
      const placeholder = `__ITALIC_${keyCounter}__`
      parts.push(
        <em key={`italic-${keyCounter}`} className="italic text-purple-300">
          {text}
        </em>,
      )
      keyCounter++
      return placeholder
    })

    // Split by placeholders and reconstruct
    const segments = currentText.split(/(__(?:INLINE_CODE|BOLD|ITALIC)_\d+__)/)
    const result: (string | JSX.Element)[] = []

    segments.forEach((segment, index) => {
      const match = segment.match(/__(\w+)_(\d+)__/)
      if (match) {
        const partIndex = Number.parseInt(match[2])
        result.push(parts[partIndex])
      } else if (segment) {
        result.push(segment)
      }
    })

    return result
  }

  return <div className="prose prose-invert max-w-none">{processMarkdown(content)}</div>
}
