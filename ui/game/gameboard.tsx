'use client'

import { ReactNode } from 'react'

interface GameBoardProps {
  children: ReactNode
  className?: string
}

export default function GameBoard({ children, className = '' }: GameBoardProps) {
  return (
    <div className={`game-board min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-6">
        {children}
      </div>
    </div>
  )
}
