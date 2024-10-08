import { Header } from '../../components/Header'
import { useHome } from './useHome'
import { LetterCard } from '../../components/LetterCard'
import { AlphabetButton } from '../../components/AlphabetButton'
import { GameOverModal } from '../../components/GameOverModal'
import { VictoryModal } from '../../components/VictoryModel'

export function Home() {
  const {
    wordLength,
    alphabet,
    letters,
    guessedLetters,
    gameOver,
    victory,
    correctWord,
    handleGuess,
    playAgain,
    clearToken
  } = useHome()

  if (!letters) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex flex-col items-center justify-between p-4">
      <Header />
      
      <section className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {[...Array(wordLength)].map((_, i) => (
            <LetterCard key={i} letter={letters[i]} isRevealed={letters[i] !== ''} />
          ))}
        </div>
      </section>

      <section className="w-full max-w-lg">
        <div className="grid grid-cols-7 gap-2 justify-items-center">
          {alphabet.map((letter) => (
            <AlphabetButton
              key={letter}
              letter={letter}
              isUsed={guessedLetters.includes(letter)}
              onClick={() => handleGuess(letter)}
            />
          ))}
        </div>
      </section>

      <GameOverModal
        isOpen={gameOver}
        onPlayAgain={playAgain}
        onExit={clearToken}
        correctWord={correctWord}
      />

      <VictoryModal
        isOpen={victory}
        onPlayAgain={playAgain}
        onExit={clearToken}
      />
    </div>
  )
}
