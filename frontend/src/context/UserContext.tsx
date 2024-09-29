import { createContext, useState } from 'react'
import { User, UserContextType } from '../types/UserContext'
import { TOKEN_KEY } from '../constants'
import { useBackend } from '../hooks/useBackend'

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [token, setLocalToken] = useState('')
  const [user, setLocalUser] = useState<User | null>(null)
  const { getUserInfo } = useBackend()

  const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
    setLocalToken(token)
    updateUserData(token)
  }

  const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY)
    setLocalToken('')
  }

  const setUser = (user: User) => {
    setLocalUser(user)
  }

  const updateUserData = async (token: string) => {
    const payload = await getUserInfo(token)
    if (payload.success) {
      setLocalUser(payload.user)
    }
  }

  return (
    <UserContext.Provider value={{ token, user, setToken, clearToken, setUser, updateUserData }}>
      {children}
    </UserContext.Provider>
  )
}