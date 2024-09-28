import Input from '../../components/Input'
import { useLogin } from './useLogin'

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
    <form onSubmit={handleLogin}>
      <Input
        innerRef={emailRef}
        label="email"
        type="email"
        isErrored={isErroredEmail}
        errorMessage={errorMessageEmail}
      />
      <Input
        innerRef={passwordRef}
        label="password"
        type="password"
        isErrored={isErroredPassword}
        errorMessage={errorMessagePassword}
      />

      <button type="submit">Entrar</button>
    </form>
  )
}
