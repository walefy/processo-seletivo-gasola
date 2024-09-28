import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { WordContext } from '../context/WordContext'

export function Header() {
  const { clearToken, user } = useContext(UserContext)
  const { tip } = useContext(WordContext)
  const navigate = useNavigate()


  const logout = () => {
    clearToken()
    navigate('/')
  }

  return (
    <header>
      <button onClick={logout}>logout</button>
      <span>{tip}</span>
      <span>{user?.currentLife ?? 0}</span>
    </header>
  )
}
