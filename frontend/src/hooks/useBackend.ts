import { GetTokenReturn } from '../types/get_token_return'

export const useBackend = () => {
  const getToken = async (email: string, password: string): Promise<GetTokenReturn> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    
    return {
      success: response.ok,
      token: data.token,
      message: data.message
    }
  }

  const getUserInfo = async (token: string) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/info`, {
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'GET'
    })

    const data = await response.json()
    
    return {
      success: response.ok,
      user: data
    }
  }

  const generateWord = async (token: string) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/word`, {
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'POST'
    })

    const data = await response.json()
    
    return {
      success: response.ok,
      length: data.length,
      tip: data.tip
    }
  }

  const verifyLetter = async (token: string, letter: string) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/word?letter=${letter}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'GET',
    })

    const data = await response.json()
    
    return {
      success: response.ok,
      includes: data.includes,
      indexArray: data.indexArray,
      life: data.life,
      gameOver: data.gameOver
    }
  }

  return {
    getToken,
    getUserInfo,
    generateWord,
    verifyLetter
  }
}