"use client"

interface MessageContentProps {
  content: string
}

interface CodeBlockProps {
  language: string
  code: string
}

function CodeBlock({ language, code }: CodeBlockProps) {
  // Função simples para highlight de sintaxe básica
  const highlightCode = (code: string, lang: string) => {
    if (lang === "javascript" || lang === "js" || lang === "typescript" || lang === "ts") {
      return code
        .replace(
          /(function|const|let|var|if|else|for|while|return|import|export|class|extends|async|await|try|catch|finally)/g,
          '<span class="keyword">$1</span>',
        )
        .replace(/(true|false|null|undefined)/g, '<span class="boolean">$1</span>')
        .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="string">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
        .replace(/(\d+)/g, '<span class="number">$1</span>')
    } else if (lang === "python" || lang === "py") {
      return code
        .replace(
          /(def|class|if|elif|else|for|while|return|import|from|try|except|finally|with|as|lambda|yield)/g,
          '<span class="keyword">$1</span>',
        )
        .replace(/(True|False|None)/g, '<span class="boolean">$1</span>')
        .replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|".*?"|'.*?')/g, '<span class="string">$1</span>')
        .replace(/(#.*$)/gm, '<span class="comment">$1</span>')
        .replace(/(\d+)/g, '<span class="number">$1</span>')
    } else if (lang === "html") {
      return code
        .replace(/(&lt;\/?\w+(?:\s+\w+(?:=(?:".*?"|'.*?'))?)*\s*\/?&gt;)/g, '<span class="tag">$1</span>')
        .replace(/(=)(".*?"|'.*?')/g, '$1<span class="string">$2</span>')
    } else if (lang === "css") {
      return code
        .replace(/([.#]?[\w-]+)\s*{/g, '<span class="selector">$1</span> {')
        .replace(/([\w-]+)(\s*:)/g, '<span class="property">$1</span>$2')
        .replace(/(:)(\s*[^;]+)/g, '$1<span class="value">$2</span>')
    }

    return code
  }

  return (
    <div className="my-4">
      <div className="bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
        <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs text-white/60 font-mono uppercase tracking-wide">{language}</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-400/60"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400/60"></div>
            <div className="w-2 h-2 rounded-full bg-green-400/60"></div>
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm leading-relaxed">
            <code
              className="syntax-highlight"
              dangerouslySetInnerHTML={{
                __html: highlightCode(code, language),
              }}
            />
          </pre>
        </div>
      </div>

      <style jsx>{`
        .syntax-highlight .keyword {
          color: #ff79c6;
          font-weight: 600;
        }
        .syntax-highlight .string {
          color: #f1fa8c;
        }
        .syntax-highlight .comment {
          color: #6272a4;
          font-style: italic;
        }
        .syntax-highlight .number {
          color: #bd93f9;
        }
        .syntax-highlight .boolean {
          color: #ff79c6;
        }
        .syntax-highlight .tag {
          color: #ff79c6;
        }
        .syntax-highlight .selector {
          color: #50fa7b;
        }
        .syntax-highlight .property {
          color: #8be9fd;
        }
        .syntax-highlight .value {
          color: #f1fa8c;
        }
      `}</style>
    </div>
  )
}

export default function MessageContent({ content }: MessageContentProps) {
  // Função para processar o conteúdo e identificar blocos de código
  const processContent = (text: string) => {
    const parts = []
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    let lastIndex = 0
    let match

    // Processar blocos de código
    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Adicionar texto antes do bloco de código
      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index)
        parts.push(
          <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
            {processInlineCode(beforeText)}
          </span>,
        )
      }

      // Adicionar bloco de código
      const language = match[1] || "text"
      const code = match[2].trim()

      parts.push(<CodeBlock key={`code-${match.index}`} language={language} code={code} />)

      lastIndex = codeBlockRegex.lastIndex
    }

    // Adicionar texto restante
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex)
      parts.push(
        <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
          {processInlineCode(remainingText)}
        </span>,
      )
    }

    return parts.length > 0
      ? parts
      : [
          <span key="full-text" className="whitespace-pre-wrap">
            {processInlineCode(text)}
          </span>,
        ]
  }

  // Função para processar código inline
  const processInlineCode = (text: string) => {
    const parts = []
    const inlineCodeRegex = /`([^`]+)`/g
    let lastIndex = 0
    let match

    while ((match = inlineCodeRegex.exec(text)) !== null) {
      // Adicionar texto antes do código inline
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }

      // Adicionar código inline
      parts.push(
        <code
          key={`inline-${match.index}`}
          className="bg-white/10 text-cyan-300 px-2 py-1 rounded-md text-sm font-mono border border-white/20"
        >
          {match[1]}
        </code>,
      )

      lastIndex = inlineCodeRegex.lastIndex
    }

    // Adicionar texto restante
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts
  }

  return <div className="prose prose-invert max-w-none">{processContent(content)}</div>
}
