"use client"

import { useState } from "react"
import { Copy, Check, FileCode, Terminal, Database, Globe, Cpu } from "lucide-react"
import type { JSX } from "react"

interface MessageContentProps {
  content: string
}

interface CodeBlockProps {
  language: string
  code: string
  showLineNumbers?: boolean
}

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

    // JavaScript/TypeScript
    if (["javascript", "js", "typescript", "ts", "jsx", "tsx"].includes(langLower)) {
      return code
        .replace(
          /\b(function|const|let|var|if|else|for|while|return|import|export|class|extends|async|await|try|catch|finally|throw|new|this|super|static|public|private|protected|interface|type|enum|namespace)\b/g,
          '<span class="keyword">$1</span>',
        )
        .replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, '<span class="boolean">$1</span>')
        .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
        .replace(
          /\b(console|document|window|Array|Object|String|Number|Boolean|Date|Math|JSON|Promise|Set|Map)\b/g,
          '<span class="builtin">$1</span>',
        )
    }
    // Python
    else if (["python", "py"].includes(langLower)) {
      return code
        .replace(
          /\b(def|class|if|elif|else|for|while|return|import|from|try|except|finally|with|as|lambda|yield|async|await|global|nonlocal|pass|break|continue|raise|assert|del|in|is|not|and|or)\b/g,
          '<span class="keyword">$1</span>',
        )
        .replace(/\b(True|False|None)\b/g, '<span class="boolean">$1</span>')
        .replace(/(["']{3}[\s\S]*?["']{3}|["'](?:\\.|[^"'\\])*?["'])/g, '<span class="string">$1</span>')
        .replace(/(#.*$)/gm, '<span class="comment">$1</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
        .replace(
          /\b(print|len|range|enumerate|zip|map|filter|sorted|sum|max|min|abs|round|type|isinstance|str|int|float|list|dict|set|tuple)\b/g,
          '<span class="builtin">$1</span>',
        )
    }
    // HTML
    else if (langLower === "html") {
      return code
        .replace(
          /(&lt;\/?)(\w+)((?:\s+\w+(?:=(?:"[^"]*"|'[^']*'))?)*\s*)(\/?)(&gt;)/g,
          '<span class="tag">$1</span><span class="tag-name">$2</span><span class="attr">$3</span><span class="tag">$4$5</span>',
        )
        .replace(
          /(\w+)(=)(["'])([^"']*)\3/g,
          '<span class="attr-name">$1</span><span class="operator">$2</span><span class="string">$3$4$3</span>',
        )
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="comment">$1</span>')
    }
    // CSS
    else if (langLower === "css") {
      return code
        .replace(/([.#]?[\w-]+)(\s*{)/g, '<span class="selector">$1</span>$2')
        .replace(/([\w-]+)(\s*:)/g, '<span class="property">$1</span><span class="operator">$2</span>')
        .replace(/(:)(\s*)([^;{}]+)/g, '$1$2<span class="value">$3</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
        .replace(/\b(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|deg|s|ms))\b/g, '<span class="number">$1</span>')
    }
    // SQL
    else if (langLower === "sql") {
      return code
        .replace(
          /\b(SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|ON|GROUP|BY|ORDER|HAVING|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DATABASE|INDEX|ALTER|DROP|TRUNCATE|UNION|DISTINCT|AS|AND|OR|NOT|NULL|IS|LIKE|IN|BETWEEN|EXISTS|CASE|WHEN|THEN|ELSE|END)\b/gi,
          '<span class="keyword">$1</span>',
        )
        .replace(
          /\b(VARCHAR|INT|INTEGER|BIGINT|SMALLINT|DECIMAL|FLOAT|DOUBLE|BOOLEAN|DATE|TIME|TIMESTAMP|TEXT|BLOB)\b/gi,
          '<span class="type">$1</span>',
        )
        .replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
        .replace(/(--.*$)/gm, '<span class="comment">$1</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
    }
    // Bash/Shell
    else if (["bash", "shell", "sh", "zsh"].includes(langLower)) {
      return code
        .replace(
          /\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|break|continue|local|export|source|alias|unset|readonly|declare)\b/g,
          '<span class="keyword">$1</span>',
        )
        .replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
        .replace(/(#.*$)/gm, '<span class="comment">$1</span>')
        .replace(/(\$\w+|\$\{[^}]+\})/g, '<span class="variable">$1</span>')
        .replace(
          /\b(echo|cat|ls|cd|pwd|mkdir|rmdir|rm|cp|mv|grep|sed|awk|sort|uniq|head|tail|wc|find|chmod|chown|ps|kill|top|df|du|tar|gzip|curl|wget|ssh|scp|rsync)\b/g,
          '<span class="builtin">$1</span>',
        )
    }
    // JSON
    else if (langLower === "json") {
      return code
        .replace(/(["'])([^"']*?)\1(\s*:)/g, '<span class="property">$1$2$1</span>$3')
        .replace(/(:)(\s*)(["'])([^"']*?)\3/g, '$1$2<span class="string">$3$4$3</span>')
        .replace(/\b(true|false|null)\b/g, '<span class="boolean">$1</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
    }

    return code
  }

  const lines = code.split("\n")

  return (
    <div className="group my-6 relative">
      {/* Code block header */}
      <div className="flex items-center justify-between bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-t-xl px-4 py-3">
        <div className="flex items-center gap-3">
          {getLanguageIcon(language)}
          <span className="text-sm font-medium text-white/80 uppercase tracking-wider">{language}</span>
          <div className="h-4 w-px bg-gray-600/50"></div>
          <span className="text-xs text-gray-400">
            {lines.length} {lines.length === 1 ? "linha" : "linhas"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/70 hover:bg-red-400 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400/70 hover:bg-yellow-400 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/70 hover:bg-green-400 transition-colors"></div>
          </div>

          <div className="h-4 w-px bg-gray-600/50 mx-2"></div>

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-green-400" />
                <span className="text-green-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="relative bg-gray-900/95 backdrop-blur-sm border-x border-b border-gray-700/50 rounded-b-xl overflow-hidden">
        <div className="overflow-x-auto">
          <div className="flex min-w-full">
            {/* Line numbers */}
            {showLineNumbers && (
              <div className="flex-shrink-0 bg-gray-800/50 border-r border-gray-700/50 px-3 py-4 select-none">
                {lines.map((_, index) => (
                  <div key={index} className="text-xs text-gray-500 leading-6 text-right font-mono">
                    {index + 1}
                  </div>
                ))}
              </div>
            )}

            {/* Code */}
            <div className="flex-1 p-4">
              <pre className="text-sm leading-6 font-mono">
                {lines.map((line, index) => (
                  <div key={index} className="hover:bg-white/5 transition-colors duration-150 -mx-4 px-4">
                    <code
                      className="syntax-highlight"
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

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyan-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <style jsx>{`
        .syntax-highlight .keyword { color: #ff79c6; font-weight: 600; }
        .syntax-highlight .string { color: #f1fa8c; }
        .syntax-highlight .comment { color: #6272a4; font-style: italic; opacity: 0.8; }
        .syntax-highlight .number { color: #bd93f9; }
        .syntax-highlight .boolean { color: #ff79c6; font-weight: 500; }
        .syntax-highlight .builtin { color: #8be9fd; font-weight: 500; }
        .syntax-highlight .tag { color: #ff79c6; }
        .syntax-highlight .tag-name { color: #ff79c6; font-weight: 600; }
        .syntax-highlight .attr { color: #50fa7b; }
        .syntax-highlight .attr-name { color: #50fa7b; }
        .syntax-highlight .selector { color: #50fa7b; font-weight: 500; }
        .syntax-highlight .property { color: #8be9fd; }
        .syntax-highlight .value { color: #f1fa8c; }
        .syntax-highlight .operator { color: #ff79c6; }
        .syntax-highlight .type { color: #8be9fd; font-weight: 500; }
        .syntax-highlight .variable { color: #ffb86c; }
      `}</style>
    </div>
  )
}

export default function MessageContent({ content }: MessageContentProps) {
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
            ? "text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            : level === 2
              ? "text-xl sm:text-2xl font-semibold mb-4 text-cyan-300 border-b border-cyan-500/30 pb-2"
              : level === 3
                ? "text-lg sm:text-xl font-semibold mb-3 text-purple-300"
                : "text-base sm:text-lg font-semibold mb-2 text-blue-300"

        elements.push(
          <HeaderComponent key={`header-${elements.length}`} className={className}>
            {processInlineFormatting(text)}
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
        const listClassName = isOrdered ? "list-decimal list-inside space-y-2 mb-4 pl-4" : "space-y-2 mb-4 pl-4"

        elements.push(
          <ListComponent key={`list-${elements.length}`} className={listClassName}>
            {listItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-white/90">
                {!isOrdered && <span className="text-cyan-400 mt-1 text-sm">▸</span>}
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
            className="border-l-4 border-purple-500/50 pl-6 py-3 my-4 bg-purple-500/5 rounded-r-xl backdrop-blur-sm"
          >
            <div className="text-white/80 italic space-y-2">
              {quoteLines.map((quoteLine, index) => (
                <p key={index}>{processInlineFormatting(quoteLine)}</p>
              ))}
            </div>
          </blockquote>,
        )
        continue
      }

      // Tables
      if (line.includes("|") && lines[currentIndex + 1]?.includes("|")) {
        const tableLines: string[] = []

        while (currentIndex < lines.length && lines[currentIndex].includes("|")) {
          tableLines.push(lines[currentIndex])
          currentIndex++
        }

        if (tableLines.length > 1) {
          const headers = tableLines[0]
            .split("|")
            .map((h) => h.trim())
            .filter((h) => h)
          const rows = tableLines.slice(2).map((row) =>
            row
              .split("|")
              .map((cell) => cell.trim())
              .filter((cell) => cell),
          )

          elements.push(
            <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
                <thead>
                  <tr className="bg-gray-800/50">
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="border border-gray-700/50 px-4 py-3 text-cyan-300 font-semibold text-left"
                      >
                        {processInlineFormatting(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-white/5 transition-colors">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-700/50 px-4 py-3 text-white/90">
                          {processInlineFormatting(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>,
          )
          continue
        }
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

        elements.push(
          <p key={`paragraph-${elements.length}`} className="mb-4 text-white/90 leading-relaxed">
            {processInlineFormatting(paragraphLines.join(" "))}
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
          className="bg-gray-800/60 text-cyan-300 px-2 py-1 rounded-md text-sm font-mono border border-gray-700/50"
        >
          {code}
        </code>,
      )
      keyCounter++
      return placeholder
    })

    // Process links
    currentText = currentText.replace(/\[([^\]]+)\]$$([^)]+)$$/g, (match, text, url) => {
      const placeholder = `__LINK_${keyCounter}__`
      parts.push(
        <a
          key={`link-${keyCounter}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors duration-200"
        >
          {text}
        </a>,
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
    const segments = currentText.split(/(__(?:INLINE_CODE|LINK|BOLD|ITALIC)_\d+__)/)
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
