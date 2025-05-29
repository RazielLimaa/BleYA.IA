"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, ChevronLeft, BookOpen, Brain } from "lucide-react"
import Aurora from "@/components/aurora"
import YaHelpButton from "@/components/ya-help-button"

export default function GuessingGamePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)

  const steps = [
    {
      title: "Introdução às Variáveis em JavaScript",
      type: "content",
      content: (
        <div className="prose prose-invert max-w-none">
          <h3 className="text-2xl font-bold mb-6 text-yellow-400">O que são Variáveis?</h3>

          <p className="text-lg mb-6 leading-relaxed">
            Imagine que você tem várias caixas em seu quarto, cada uma com uma etiqueta diferente. Uma caixa pode ter a
            etiqueta "Livros", outra "Roupas", e assim por diante. As <strong>variáveis</strong> em programação
            funcionam exatamente como essas caixas etiquetadas!
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold mb-3 text-yellow-400">Definição</h4>
            <p className="text-white/90">
              Uma <strong>variável</strong> é um espaço na memória do computador onde podemos armazenar dados. Cada
              variável tem um nome (como a etiqueta da caixa) e um valor (como o conteúdo da caixa).
            </p>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Como Declarar Variáveis em JavaScript</h4>

          <p className="mb-4">Em JavaScript, temos três palavras-chave para criar variáveis:</p>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-green-400 mb-2">1. let - Para valores que podem mudar</h5>
              <pre className="text-sm">
                <code>let idade = 25; let nome = "Maria"; idade = 26; // Podemos alterar o valor</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-blue-400 mb-2">2. const - Para valores constantes</h5>
              <pre className="text-sm">
                <code>const PI = 3.14159; const meuNome = "João"; // PI = 3.14; // ERRO! Não podemos alterar</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-red-400 mb-2">3. var - Forma antiga (evite usar)</h5>
              <pre className="text-sm">
                <code>var cidade = "São Paulo"; // Tem comportamento diferente, melhor usar let</code>
              </pre>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Tipos de Dados</h4>

          <p className="mb-4">As variáveis podem armazenar diferentes tipos de informação:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-cyan-400 mb-2">Números</h5>
              <pre className="text-sm">
                <code>let idade = 25; let altura = 1.75; let temperatura = -5;</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-pink-400 mb-2">Textos (Strings)</h5>
              <pre className="text-sm">
                <code>let nome = "Ana"; let cidade = 'Rio de Janeiro'; let frase = `Olá, mundo!`;</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-green-400 mb-2">Booleanos</h5>
              <pre className="text-sm">
                <code>let estaChovendo = true; let temSol = false;</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-orange-400 mb-2">Valores Especiais</h5>
              <pre className="text-sm">
                <code>let valorVazio = null; let naoDefinido = undefined;</code>
              </pre>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Exemplo Prático: Jogo de Adivinhação</h4>

          <p className="mb-4">
            Vamos ver como usar variáveis em um jogo simples. Imagine que queremos criar um jogo onde o computador
            "pensa" em um número e o jogador tenta adivinhar:
          </p>

          <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
            <pre className="text-sm">
              <code>{`// Criando as variáveis do nosso jogo
let numeroSecreto = 7;        // O número que queremos adivinhar
let palpiteJogador = 5;       // O palpite do jogador
let tentativas = 1;           // Quantas tentativas já foram feitas
let acertou = false;          // Se o jogador acertou ou não

// Exibindo as informações
console.log("Número secreto:", numeroSecreto);
console.log("Seu palpite:", palpiteJogador);
console.log("Tentativas:", tentativas);`}</code>
            </pre>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <h5 className="font-semibold text-blue-400 mb-3">💡 Dica Importante</h5>
            <p className="text-white/90">
              Sempre escolha nomes descritivos para suas variáveis! Em vez de usar <code>x</code> ou <code>a</code>, use
              nomes como <code>numeroSecreto</code> ou <code>idadeUsuario</code>. Isso torna seu código muito mais fácil
              de entender!
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Quiz: Variáveis em JavaScript",
      type: "quiz",
      questions: [
        {
          question: "Qual palavra-chave devemos usar para criar uma variável que pode ter seu valor alterado?",
          options: ["var", "let", "const", "variable"],
          correct: 1,
          explanation:
            "A palavra-chave 'let' é usada para criar variáveis que podem ter seus valores alterados durante a execução do programa.",
        },
        {
          question: "Qual é a forma correta de declarar uma constante em JavaScript?",
          options: ["let PI = 3.14", "const PI = 3.14", "var PI = 3.14", "constant PI = 3.14"],
          correct: 1,
          explanation:
            "A palavra-chave 'const' é usada para declarar constantes, valores que não podem ser alterados após a declaração.",
        },
        {
          question: "Que tipo de dado representa o valor 'true' em JavaScript?",
          options: ["String", "Number", "Boolean", "Object"],
          correct: 2,
          explanation:
            "O valor 'true' (assim como 'false') é do tipo Boolean, que representa valores verdadeiro ou falso.",
        },
        {
          question: "Qual destas é uma boa prática para nomear variáveis?",
          options: [
            "usar nomes curtos como 'x'",
            "usar nomes descritivos como 'idadeUsuario'",
            "usar apenas números",
            "usar espaços no nome",
          ],
          correct: 1,
          explanation:
            "Usar nomes descritivos torna o código mais legível e fácil de manter. É uma das melhores práticas em programação.",
        },
        {
          question: "O que acontece se tentarmos alterar o valor de uma variável declarada com 'const'?",
          options: [
            "O valor é alterado normalmente",
            "O JavaScript ignora a alteração",
            "Ocorre um erro",
            "A variável se torna 'let'",
          ],
          correct: 2,
          explanation:
            "Tentar alterar uma constante resulta em um erro, pois constantes não podem ter seus valores modificados após a declaração.",
        },
      ],
    },
  ]

  const currentStepData = steps[currentStep - 1]

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }))
  }

  const calculateScore = () => {
    if (currentStepData.type !== "quiz") return 0
    const questions = currentStepData.questions || []
    let correct = 0
    questions.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correct++
      }
    })
    return correct
  }

  const renderQuizResults = () => {
    if (currentStepData.type !== "quiz") return null
    const questions = currentStepData.questions || []
    const score = calculateScore()
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="text-4xl font-bold mb-2">
            {score}/{questions.length}
          </div>
          <div className="text-xl text-yellow-400">{percentage}% de acertos</div>
          <div className="text-white/70 mt-2">
            {percentage >= 80
              ? "Excelente trabalho! 🎉"
              : percentage >= 60
                ? "Bom trabalho! Continue praticando! 👍"
                : "Continue estudando, você vai conseguir! 💪"}
          </div>
        </div>

        {questions.map((question, index) => {
          const userAnswer = quizAnswers[index]
          const isCorrect = userAnswer === question.correct

          return (
            <div key={index} className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCorrect ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {isCorrect ? "✓" : "✗"}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{question.question}</h4>
                  <div className="text-sm text-white/70 mb-2">
                    <strong>Sua resposta:</strong> {question.options[userAnswer] || "Não respondida"}
                  </div>
                  <div className="text-sm text-white/70 mb-3">
                    <strong>Resposta correta:</strong> {question.options[question.correct]}
                  </div>
                  <div className="text-sm text-yellow-200 bg-yellow-500/10 rounded p-3">
                    <strong>Explicação:</strong> {question.explanation}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#ffd700", "#ff8c00", "#ff4500"]} amplitude={1.5} blend={0.7} speed={1.0} />
      </div>

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/cursos/javascript-basico"
                className="p-2 text-white/70 hover:text-white transition-colors duration-300"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-xl font-semibold">Variáveis em JavaScript</h1>
            </div>
            <div className="text-sm text-white/50">Lição 1 • JavaScript Básico</div>
          </div>
        </header>

        <main className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold">
                {currentStep}
              </div>
              <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
              <div className="ml-auto flex items-center gap-2">
                {currentStepData.type === "content" ? (
                  <BookOpen className="text-yellow-400" size={20} />
                ) : (
                  <Brain className="text-yellow-400" size={20} />
                )}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
              {currentStepData.type === "content" ? (
                currentStepData.content
              ) : showResults ? (
                renderQuizResults()
              ) : (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4">Teste seus conhecimentos!</h3>
                    <p className="text-white/70">
                      Responda às perguntas abaixo para verificar seu entendimento sobre variáveis em JavaScript.
                    </p>
                  </div>

                  {currentStepData.questions?.map((question, questionIndex) => (
                    <div key={questionIndex} className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-semibold mb-4">
                        {questionIndex + 1}. {question.question}
                      </h4>
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                              quizAnswers[questionIndex] === optionIndex
                                ? "bg-yellow-500/20 border border-yellow-500/50"
                                : "bg-white/5 hover:bg-white/10 border border-white/10"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${questionIndex}`}
                              value={optionIndex}
                              checked={quizAnswers[questionIndex] === optionIndex}
                              onChange={() => handleQuizAnswer(questionIndex, optionIndex)}
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                quizAnswers[questionIndex] === optionIndex
                                  ? "border-yellow-400 bg-yellow-400"
                                  : "border-white/30"
                              }`}
                            >
                              {quizAnswers[questionIndex] === optionIndex && (
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                              )}
                            </div>
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  {Object.keys(quizAnswers).length === currentStepData.questions?.length && (
                    <div className="text-center">
                      <button
                        onClick={() => setShowResults(true)}
                        className="py-3 px-8 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-semibold rounded-lg transition-all duration-300"
                      >
                        Ver Resultados
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navegação entre passos */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setCurrentStep(Math.max(1, currentStep - 1))
                  setShowResults(false)
                  setQuizAnswers({})
                }}
                disabled={currentStep === 1}
                className="flex items-center gap-2 py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                <span>Anterior</span>
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={() => {
                    setCurrentStep(Math.min(steps.length, currentStep + 1))
                    setShowResults(false)
                    setQuizAnswers({})
                  }}
                  className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black transition-all duration-300"
                >
                  <span>Próximo</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <Link
                  href="/cursos/javascript-basico/quiz-programacao"
                  className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white transition-all duration-300"
                >
                  <span>Próxima Lição</span>
                  <ChevronRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Botão de ajuda da YA */}
      <YaHelpButton lessonTitle="Variáveis em JavaScript" />
    </div>
  )
}
