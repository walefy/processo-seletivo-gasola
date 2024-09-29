import { RefreshCw, X } from 'lucide-react'

type GameOverModalProps = {
  isOpen: boolean
  onPlayAgain: () => void
  onExit: () => void
  correctWord: string
}

export function GameOverModal({ isOpen, onPlayAgain, onExit, correctWord }: GameOverModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl p-8 max-w-md w-full m-4">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-4">Game Over</h2>
        <p className="text-xl text-center text-gray-700 mb-6">
          A palavra correta era: <span className="font-bold text-purple-600">{correctWord}</span>
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <RefreshCw size={24} className="mr-2" />
            Play Again
          </button>
          <button
            onClick={onExit}
            className="flex items-center justify-center bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <X size={24} className="mr-2" />
            Exit
          </button>
        </div>
      </div>
    </div>
  )
}