import { GetTokenReturn } from '../types/get_token_return';

export const useBackend = () => {
  const getToken = async (email: string, password: string): Promise<GetTokenReturn> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();

    console.log(data)
    
    return {
      success: response.ok,
      token: data.token,
      message: data.message
    };
  }

  const getUserInfo = async (token: string) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'GET'
    });

    const data = await response.json();
    
    return {
      success: response.ok,
      user: data.user
    };
  }

  return {
    getToken,
    getUserInfo
  }
}