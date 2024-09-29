import { If } from './If'

type LetterCardProps = {
  letter: string | null
  isRevealed: boolean
}

export function LetterCard({ letter, isRevealed }: LetterCardProps) {
  return (
    <div className={`
      w-12 h-12 sm:w-16 sm:h-16
      flex items-center justify-center
      border-4 rounded-xl 
      text-2xl sm:text-4xl font-bold
      transition-colors duration-300 ease-in-out
      ${isRevealed
        ? 'bg-blue-500 border-blue-600 text-white'
        : 'bg-blue-700 border-blue-800 text-transparent'
      }
    `}>
      <If condition={isRevealed}>
        <If condition={!!letter}>
          {letter!.toUpperCase()}
        </If>
      </If>
    </div>
  )
}