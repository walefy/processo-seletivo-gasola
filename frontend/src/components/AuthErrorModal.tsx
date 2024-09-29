import { X, AlertCircle } from 'lucide-react'

type AuthErrorModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function AuthErrorModal({ isOpen, onClose }: AuthErrorModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl p-8 max-w-md w-full m-4">
        <div className="flex items-center justify-center mb-4">
          <AlertCircle size={48} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Erro de Autenticação</h2>
        <p className="text-xl text-center text-gray-700 mb-6">
          Email ou senha incorretos. Por favor, tente novamente.
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <X size={24} className="mr-2" />
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}