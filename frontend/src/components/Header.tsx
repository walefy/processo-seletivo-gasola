import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { WordContext } from '../context/WordContext'
import { Heart, LogOut } from 'lucide-react'

export function Header() {
  const { clearToken, user } = useContext(UserContext)
  const { tip } = useContext(WordContext)
  const navigate = useNavigate()


  const logout = () => {
    clearToken()
    navigate('/')
  }

  return (
    <header className="w-full flex justify-between items-center mb-8">
      <button onClick={logout} className="text-white hover:text-pink-300 transition-colors">
        <LogOut size={24} />
      </button>
      <div className="text-white text-xl font-bold">Dica: {tip}</div>
      <div className="flex items-center">
          {[...Array(user?.currentLife)].map((_, i) => (
            <Heart key={i} size={24} className="text-pink-500 mr-1" fill="currentColor" />
          ))}
        </div>
    </header>
  )
}
