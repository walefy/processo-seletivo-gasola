export type User = {
  id: number
  email: string
  name: string
  currentLife: number
}

export type UserContextType = {
  token: string
  user: User | null
  setToken: (token: string) => void
  clearToken: () => void
  setUser: (user: User) => void
  updateUserData: (token: string) => Promise<void>
}
