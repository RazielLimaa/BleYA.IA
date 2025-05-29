"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, ChevronLeft, BookOpen, Brain } from "lucide-react"
import Aurora from "@/components/aurora"
import YaHelpButton from "@/components/ya-help-button"

export default function StoryGeneratorPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)

  const steps = [
    {
      title: "Strings e Funções em JavaScript",
      type: "content",
      content: (
        <div className="prose prose-invert max-w-none">
          <h3 className="text-2xl font-bold mb-6 text-yellow-400">Trabalhando com Strings</h3>

          <p className="text-lg mb-6 leading-relaxed">
            Strings são sequências de caracteres - basicamente, qualquer texto que você queira usar no seu programa.
            Desde uma simples palavra até um parágrafo inteiro, tudo é considerado uma string em programação!
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold mb-3 text-yellow-400">O que são Strings?</h4>
            <p className="text-white/90">
              Uma <strong>string</strong> é uma sequência de caracteres (letras, números, símbolos) que representa
              texto. Em JavaScript, criamos strings colocando o texto entre aspas.
            </p>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Formas de Criar Strings</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-cyan-400 mb-2">Aspas Simples</h5>
              <pre className="text-sm whitespace-pre-wrap break-words">
                <code>
                  {`let nome = 'João';
let cidade = 'São Paulo';`}
                </code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-pink-400 mb-2">Aspas Duplas</h5>
              <pre className="text-sm whitespace-pre-wrap break-words">
                <code>
                  {`let frase = "Olá, mundo!";
let mensagem = "Bem-vindo";`}
                </code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-green-400 mb-2">Template Literals</h5>
              <pre className="text-sm whitespace-pre-wrap break-words">
                <code>
                  {`let nome = "Fulano";
let saudacao = \`Oi, \${nome}!\`;
let texto = \`Linha 1
Linha 2\`;`}
                </code>
              </pre>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Concatenação de Strings</h4>

          <p className="mb-4">
            Concatenação é o processo de juntar duas ou mais strings. É como colar pedaços de texto:
          </p>

          <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
            <pre className="text-sm">
              <code>{`// Método tradicional com +
let nome = "Maria";
let sobrenome = "Silva";
let nomeCompleto = nome + " " + sobrenome;
console.log(nomeCompleto); // "Maria Silva"

// Concatenação com múltiplas strings
let saudacao = "Olá, " + nome + "! Como você está?";
console.log(saudacao); // "Olá, Maria! Como você está?"

// Concatenação com números
let idade = 25;
let apresentacao = "Eu tenho " + idade + " anos.";
console.log(apresentacao); // "Eu tenho 25 anos."`}</code>
            </pre>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Template Literals: A Forma Moderna</h4>

          <p className="mb-4">
            Template literals são uma forma mais elegante e legível de trabalhar com strings. Usamos crases (`) e
            podemos inserir variáveis com <code>${"{variável}"}</code>:
          </p>

          <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
            <pre className="text-sm">
              <code>{`let nome = "Carlos";
let idade = 30;
let profissao = "desenvolvedor";

// Com template literals
let biografia = \`Meu nome é \${nome}, tenho \${idade} anos e trabalho como \${profissao}.\`;
console.log(biografia);
// "Meu nome é Carlos, tenho 30 anos e trabalho como desenvolvedor."

// Múltiplas linhas
let historia = \`
Era uma vez, um \${profissao} chamado \${nome}.
Ele tinha \${idade} anos e adorava programar.
Todos os dias ele criava coisas incríveis!
\`;`}</code>
            </pre>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-blue-400 mb-3">✨ Vantagens dos Template Literals</h5>
            <ul className="space-y-2 text-white/90">
              <li>
                • <strong>Mais legível:</strong> Evita concatenação complexa com +
              </li>
              <li>
                • <strong>Múltiplas linhas:</strong> Quebras de linha são preservadas
              </li>
              <li>
                • <strong>Expressões:</strong> Pode calcular valores: <code>${"{2 + 3}"}</code>
              </li>
              <li>
                • <strong>Flexível:</strong> Aceita qualquer expressão JavaScript
              </li>
            </ul>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Métodos Úteis de String</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-cyan-400 mb-2">Tamanho e Transformação</h5>
              <pre className="text-sm whitespace-pre-wrap break-words">
                <code>{`let texto = "JavaScript";
console.log(texto.length);        // 10
console.log(texto.toUpperCase()); // "JAVASCRIPT"
console.log(texto.toLowerCase()); // "javascript"`}</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-pink-400 mb-2">Busca e Substituição</h5>
              <pre className="text-sm whitespace-pre-wrap break-words">
                <code>{`let frase = "Eu amo programar";
console.log(frase.includes("amo"));     // true
console.log(frase.replace("amo", "adoro")); // "Eu adoro programar"`}</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-green-400 mb-2">Extração de Partes</h5>
              <pre className="text-sm whitespace-pre-wrap break-words">
                <code>{`let palavra = "programação";
console.log(palavra.slice(0, 7));    // "programa"
console.log(palavra.substring(7));   // "ção"
console.log(palavra.charAt(0));      // "p"`}</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-orange-400 mb-2">Divisão e Junção</h5>
              <pre className="text-sm whitespace-pre-wrap break-words">
                <code>{`let lista = "maçã,banana,laranja";
let frutas = lista.split(",");       // ["maçã", "banana", "laranja"]
let juntado = frutas.join(" - ");    // "maçã - banana - laranja"`}</code>
              </pre>
            </div>
          </div>


          <h3 className="text-2xl font-bold mb-6 text-yellow-400">Introdução às Funções</h3>

          <p className="text-lg mb-6 leading-relaxed">
            Imagine que você tem uma receita de bolo que usa várias vezes. Em vez de escrever todos os passos toda vez,
            você simplesmente diz "fazer bolo". As <strong>funções</strong>
            funcionam da mesma forma: são blocos de código reutilizáveis!
          </p>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold mb-3 text-purple-400">O que são Funções?</h4>
            <p className="text-white/90">
              Uma <strong>função</strong> é um bloco de código que executa uma tarefa específica. Você pode "chamar"
              (executar) a função quantas vezes quiser, evitando repetição de código.
            </p>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Criando Funções</h4>

          <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
            <pre className="text-sm">
              <code>{`// Função simples sem parâmetros
function saudar() {
    console.log("Olá! Bem-vindo!");
}

// Chamando a função
saudar(); // "Olá! Bem-vindo!"

// Função com parâmetros
function saudarPessoa(nome) {
    console.log("Olá, " + nome + "!");
}

saudarPessoa("Maria"); // "Olá, Maria!"
saudarPessoa("João");  // "Olá, João!"

// Função que retorna um valor
function somar(a, b) {
    return a + b;
}

let resultado = somar(5, 3);
console.log(resultado); // 8`}</code>
            </pre>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-400">Exemplo Prático: Gerador de Histórias</h4>

          <p className="mb-4">Vamos combinar strings, arrays e funções para criar um gerador de histórias:</p>

          <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
            <pre className="text-sm">
              <code>{`// Arrays com elementos da história
let personagens = ["cavaleiro", "mago", "princesa", "dragão"];
let locais = ["castelo", "floresta", "montanha", "caverna"];
let objetos = ["espada", "varinha", "tesouro", "mapa"];

// Função para escolher elemento aleatório
function escolherAleatorio(array) {
    let indice = Math.floor(Math.random() * array.length);
    return array[indice];
}

// Função para gerar história
function gerarHistoria() {
    let personagem = escolherAleatorio(personagens);
    let local = escolherAleatorio(locais);
    let objeto = escolherAleatorio(objetos);
    
    let historia = \`Era uma vez, um \${personagem} que vivia em um \${local}.
Um dia, ele encontrou um \${objeto} mágico que mudou sua vida para sempre.
E assim começou uma grande aventura!\`;
    
    return historia;
}

// Gerando uma história
console.log(gerarHistoria());`}</code>
            </pre>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
            <h5 className="font-semibold text-green-400 mb-3">🎯 Conceitos Importantes</h5>
            <ul className="space-y-2 text-white/90">
              <li>
                • <strong>Parâmetros:</strong> Valores que a função recebe (como ingredientes)
              </li>
              <li>
                • <strong>Return:</strong> O que a função "devolve" como resultado
              </li>
              <li>
                • <strong>Reutilização:</strong> Uma função pode ser chamada várias vezes
              </li>
              <li>
                • <strong>Organização:</strong> Funções tornam o código mais organizado e legível
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Quiz: Strings e Funções",
      type: "quiz",
      questions: [
        {
          question: "Qual é a forma mais moderna de criar strings com variáveis em JavaScript?",
          options: ["Aspas simples com +", "Aspas duplas com +", "Template literals com ${}", "Método concat()"],
          correct: 2,
          explanation: "Template literals com ${} são a forma mais moderna e legível de inserir variáveis em strings.",
        },
        {
          question: "O que faz o método .length em uma string?",
          options: ["Converte para maiúsculas", "Retorna o número de caracteres", "Remove espaços", "Divide a string"],
          correct: 1,
          explanation: "O método .length retorna o número de caracteres (incluindo espaços) que a string possui.",
        },
        {
          question: "Como declaramos uma função em JavaScript?",
          options: [
            "function nomeFuncao() {}",
            "def nomeFuncao() {}",
            "func nomeFuncao() {}",
            "create function nomeFuncao() {}",
          ],
          correct: 0,
          explanation: "Em JavaScript, usamos a palavra-chave 'function' seguida do nome da função e chaves {}.",
        },
        {
          question: "O que a palavra-chave 'return' faz em uma função?",
          options: ["Reinicia a função", "Para a execução e retorna um valor", "Repete a função", "Deleta a função"],
          correct: 1,
          explanation: "'return' para a execução da função e retorna o valor especificado para quem chamou a função.",
        },
        {
          question: "Qual método de string divide o texto em um array?",
          options: ["slice()", "split()", "substring()", "charAt()"],
          correct: 1,
          explanation: "O método split() divide uma string em um array, usando um separador especificado.",
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
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${isCorrect ? "bg-green-500" : "bg-red-500"
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
              <h1 className="text-xl font-semibold">Strings e Funções</h1>
            </div>
            <div className="text-sm text-white/50">Lição 3 • JavaScript Básico</div>
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
                      Responda às perguntas abaixo para verificar seu entendimento sobre strings e funções.
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
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${quizAnswers[questionIndex] === optionIndex
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
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${quizAnswers[questionIndex] === optionIndex
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
                  href="/cursos/javascript-basico"
                  className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white transition-all duration-300"
                >
                  <span>Concluir Curso</span>
                  <ChevronRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Botão de ajuda da YA */}
      <YaHelpButton lessonTitle="Strings e Funções" />
    </div>
  )
}
