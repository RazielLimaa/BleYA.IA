"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, ChevronLeft, BookOpen, Brain } from "lucide-react"
import Aurora from "@/components/aurora"
import YaHelpButton from "@/components/ya-help-button"

export default function ProgrammingQuizPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)

  const steps = [
    {
      title: "Arrays e Loops em JavaScript",
      type: "content",
      content: (
        <div className="prose prose-invert max-w-none">
          <h3 className="text-2xl font-bold mb-6 text-yellow-400">Entendendo Arrays</h3>

          <p className="text-lg mb-6 leading-relaxed">
            Imagine que você tem uma lista de compras. Em vez de escrever cada item em um papel separado, você escreve
            todos em uma única lista. Os <strong>arrays</strong> funcionam da mesma forma: eles nos permitem armazenar
            múltiplos valores em uma única variável!
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold mb-3 text-yellow-400">O que é um Array?</h4>
            <p className="text-white/90">
              Um <strong>array</strong> é uma estrutura de dados que pode armazenar múltiplos valores em uma única
              variável. É como uma caixa com vários compartimentos numerados, onde cada compartimento pode guardar um
              item diferente.
            </p>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Criando Arrays</h4>

          <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
            <pre className="text-sm">
              <code>{`// Diferentes formas de criar arrays
let frutas = ["maçã", "banana", "laranja"];
let numeros = [1, 2, 3, 4, 5];
let misto = ["João", 25, true, "programador"];

// Array vazio
let listaVazia = [];

// Exibindo arrays
console.log(frutas);        // ["maçã", "banana", "laranja"]
console.log(numeros[0]);    // 1 (primeiro elemento)
console.log(frutas[1]);     // "banana" (segundo elemento)`}</code>
            </pre>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-blue-400 mb-3">🔢 Índices em Arrays</h5>
            <p className="text-white/90 mb-3">
              Os elementos de um array são numerados começando do <strong>0</strong> (zero). Isso significa que o
              primeiro elemento está na posição 0, o segundo na posição 1, e assim por diante.
            </p>
            <div className="bg-gray-800/50 rounded p-3">
              <code>["maçã", "banana", "laranja"]</code>
              <br />
              <code>
                &nbsp;&nbsp; 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2
              </code>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Propriedades e Métodos Úteis</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-cyan-400 mb-2">Propriedade length</h5>
              <pre className="text-sm">
                <code>{`let cores = ["azul", "verde", "vermelho"];
console.log(cores.length); // 3`}</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-pink-400 mb-2">Adicionar elementos</h5>
              <pre className="text-sm">
                <code>{`cores.push("amarelo");
// cores agora é ["azul", "verde", "vermelho", "amarelo"]`}</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-green-400 mb-2">Remover último elemento</h5>
              <pre className="text-sm">
                <code>{`let ultimaCor = cores.pop();
// ultimaCor = "amarelo", cores volta ao original`}</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-orange-400 mb-2">Encontrar elemento</h5>
              <pre className="text-sm">
                <code>{`let posicao = cores.indexOf("verde");
// posicao = 1`}</code>
              </pre>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-6 text-yellow-400">Loops: Repetindo Ações</h3>

          <p className="text-lg mb-6 leading-relaxed">
            Imagine que você precisa cumprimentar 100 pessoas. Seria muito cansativo escrever "Olá" 100 vezes no seu
            código! Os <strong>loops</strong> nos permitem repetir ações de forma automática e eficiente.
          </p>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">O Loop For</h4>

          <p className="mb-4">
            O loop <code>for</code> é perfeito quando sabemos exatamente quantas vezes queremos repetir algo:
          </p>

          <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
            <pre className="text-sm">
              <code>{`// Estrutura básica do for
for (inicialização; condição; incremento) {
    // código a ser repetido
}

// Exemplo prático
for (let i = 0; i < 5; i++) {
    console.log("Contando:", i);
}
// Resultado: 0, 1, 2, 3, 4`}</code>
            </pre>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-green-400 mb-3">🔄 Partes do Loop For</h5>
            <ul className="space-y-2 text-white/90">
              <li>
                <strong>Inicialização:</strong> <code>let i = 0</code> - Define onde começar
              </li>
              <li>
                <strong>Condição:</strong> <code>i &lt; 5</code> - Quando parar
              </li>
              <li>
                <strong>Incremento:</strong> <code>i++</code> - Como avançar (i++ significa i = i + 1)
              </li>
            </ul>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Combinando Arrays e Loops</h4>

          <p className="mb-4">
            A verdadeira magia acontece quando combinamos arrays com loops. Podemos percorrer todos os elementos de um
            array automaticamente:
          </p>

          <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
            <pre className="text-sm">
              <code>{`// Array de linguagens de programação
let linguagens = ["JavaScript", "Python", "Java", "C++"];

// Percorrendo o array com for
console.log("Linguagens que eu conheço:");
for (let i = 0; i < linguagens.length; i++) {
    console.log((i + 1) + ". " + linguagens[i]);
}

// Resultado:
// 1. JavaScript
// 2. Python  
// 3. Java
// 4. C++`}</code>
            </pre>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Exemplo Prático: Sistema de Quiz</h4>

          <p className="mb-4">Vamos ver como usar arrays e loops para criar um sistema de quiz simples:</p>

          <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
            <pre className="text-sm">
              <code>{`// Arrays com perguntas e respostas
let perguntas = [
    "Qual é a capital do Brasil?",
    "Quanto é 2 + 2?",
    "Qual é a linguagem da web?"
];

let respostas = ["Brasília", "4", "JavaScript"];

// Simulando respostas do usuário
let respostasUsuario = ["Brasília", "4", "HTML"];

// Verificando as respostas com loop
let pontuacao = 0;

for (let i = 0; i < perguntas.length; i++) {
    console.log("Pergunta " + (i + 1) + ": " + perguntas[i]);
    console.log("Sua resposta: " + respostasUsuario[i]);
    
    if (respostasUsuario[i] === respostas[i]) {
        console.log("✓ Correto!");
        pontuacao++;
    } else {
        console.log("✗ Incorreto! Resposta: " + respostas[i]);
    }
    console.log("---");
}

console.log("Pontuação final: " + pontuacao + "/" + perguntas.length);`}</code>
            </pre>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
            <h5 className="font-semibold text-purple-400 mb-3">💡 Dica Pro</h5>
            <p className="text-white/90">
              Arrays e loops são fundamentais na programação! Eles aparecem em quase todos os programas. Pratique
              criando diferentes arrays e percorrendo-os com loops. Tente criar uma lista de seus filmes favoritos e use
              um loop para exibi-los!
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Quiz: Arrays e Loops",
      type: "quiz",
      questions: [
        {
          question: "Como acessamos o primeiro elemento de um array chamado 'frutas'?",
          options: ["frutas[1]", "frutas[0]", "frutas.first", "frutas.primeiro"],
          correct: 1,
          explanation:
            "Os arrays em JavaScript começam no índice 0, então o primeiro elemento é acessado com frutas[0].",
        },
        {
          question: "Qual propriedade nos diz quantos elementos tem um array?",
          options: ["array.size", "array.count", "array.length", "array.total"],
          correct: 2,
          explanation: "A propriedade 'length' retorna o número de elementos em um array.",
        },
        {
          question: "Qual é a estrutura correta de um loop for?",
          options: [
            "for (i = 0; i < 10; i++)",
            "for (let i = 0; i < 10; i++)",
            "for (i < 10; i++)",
            "for (let i = 0; i++; i < 10)",
          ],
          correct: 1,
          explanation:
            "A estrutura correta é: for (inicialização; condição; incremento). É importante declarar a variável com 'let'.",
        },
        {
          question: "O que faz o método push() em um array?",
          options: [
            "Remove o último elemento",
            "Remove o primeiro elemento",
            "Adiciona um elemento no final",
            "Adiciona um elemento no início",
          ],
          correct: 2,
          explanation: "O método push() adiciona um ou mais elementos no final do array.",
        },
        {
          question: "Em um array com 5 elementos, qual é o índice do último elemento?",
          options: ["5", "4", "3", "1"],
          correct: 1,
          explanation:
            "Como os índices começam em 0, um array com 5 elementos tem índices de 0 a 4. O último elemento está no índice 4.",
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
              <h1 className="text-xl font-semibold">Arrays e Loops</h1>
            </div>
            <div className="text-sm text-white/50">Lição 2 • JavaScript Básico</div>
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
                      Responda às perguntas abaixo para verificar seu entendimento sobre arrays e loops.
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
                  href="/cursos/javascript-basico/gerador-historias"
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
      <YaHelpButton lessonTitle="Arrays e Loops" />
    </div>
  )
}
