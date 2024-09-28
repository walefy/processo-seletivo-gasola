import Input from '../../components/Input'
import { useLogin } from './use_login'

export function Login() {
    const {
      emailRef,
      passwordRef,
      isErroredEmail,
      isErroredPassword,
      errorMessageEmail,
      errorMessagePassword,
      handleLogin
    } = useLogin()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">Jogo da Forca</h1>
        <p className="text-center text-gray-700 mb-6">
          Entre para começar a adivinhar palavras!
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            innerRef={emailRef}
            label="email"
            type="email"
            isErrored={isErroredEmail}
            errorMessage={errorMessageEmail}
            inputId='email'
          />
          <Input
            innerRef={passwordRef}
            label="password"
            type="password"
            isErrored={isErroredPassword}
            errorMessage={errorMessagePassword}
            inputId='password'
          />

          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out">
            Iniciar jogo
          </button>
        </form>
      </div>
    </div>
  )
}
