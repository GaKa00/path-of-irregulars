'use client'

interface PassButtonProps {
  isPlayerTurn: boolean
  onClick: () => void
  disabled?: boolean
}

export default function PassButton({
  isPlayerTurn,
  onClick,
  disabled = false
}: PassButtonProps) {
  const isDisabled = !isPlayerTurn || disabled

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        btn btn-primary rounded-xl px-6 py-3 text-base font-semibold
        transition-all duration-200
        ${isDisabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20'
        }
      `}
    >
      <span>Pass</span>
      {!isDisabled && (
        <span className="ml-2 text-xs opacity-70">End Turn</span>
      )}
    </button>
  )
}
