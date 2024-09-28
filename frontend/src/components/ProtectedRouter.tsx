import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

type ProtectedRouterProps = {
  children: React.ReactNode
}

export function ProtectedRouter({ children }: ProtectedRouterProps) {
  const { user, token } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token || !user) {
      navigate('/')
    }
  }, [token, user, navigate])

  return <>{children}</>
}
