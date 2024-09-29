type AlphabetButtonProps = {
  letter: string
  isUsed: boolean
  onClick: () => void
}

export function AlphabetButton({ letter, isUsed, onClick }: AlphabetButtonProps) {
  return (
    <button
      className={`
        w-8 h-8 sm:w-10 sm:h-10
        flex items-center justify-center
        rounded-lg text-lg sm:text-xl font-bold
        ${isUsed 
          ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
          : 'bg-white text-purple-800 hover:bg-purple-100'}
      `}
      onClick={onClick}
      disabled={isUsed}
    >
      {letter}
    </button>
  )
}
