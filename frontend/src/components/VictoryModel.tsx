import { RefreshCw, X } from 'lucide-react'

type VictoryModalProps = {
  isOpen: boolean
  onPlayAgain: () => void
  onExit: () => void
}

export function VictoryModal({ isOpen, onPlayAgain, onExit }: VictoryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl p-8 max-w-md w-full m-4">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-4">Parabéns!</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <RefreshCw size={24} className="mr-2" />
            Jogar Novamente
          </button>
          <button
            onClick={onExit}
            className="flex items-center justify-center bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <X size={24} className="mr-2" />
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}