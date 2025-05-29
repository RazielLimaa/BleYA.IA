import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "BleYA - Aprenda Programação com IA",
  keywords: [
    "programação",
    "aprendizado de máquina",
    "inteligência artificial",
    "cursos de programação",
    "educação online",
    "tecnologia",
    "aprendizado personalizado",
    "desenvolvimento de software",
    "habilidades de programação",
    "futuro da tecnologia",
  ],
  authors: [{ name: "BleYA" }],
  openGraph: {
    title: "BleYA - Aprenda Programação com IA",
    description:
      "Aprenda programação com o poder da inteligência artificial. Cursos interativos, feedback em tempo real e aprendizado personalizado.",
    url: "https://bleya.dev",
    siteName: "BleYA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
