import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

type ProtectedRouterProps = {
  children: React.ReactNode
}

export function ProtectedRouter({ children }: ProtectedRouterProps) {
  const { token } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token, navigate])

  return <>{children}</>
}
