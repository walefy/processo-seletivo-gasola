import { useRef, useState } from 'react'
import { loginSchema } from '../../schemas/login_schema'
import { schemaValidator } from '../../utils/schemaValidator'

export const useLogin = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [isErroredEmail, setIsErroredEmail] = useState(false)
  const [isErroredPassword, setIsErroredPassword] = useState(false)
  const [errorMessageEmail, setErrorMessageEmail] = useState('')
  const [errorMessagePassword, setErrorMessagePassword] = useState('')

  const validateFields = () => {
    const emailEl = emailRef.current
    const passwordEl = passwordRef.current

    if (!emailEl || !passwordEl) {
      throw new Error('Input elements are missing')
    }

    const payload = schemaValidator(loginSchema, {
      email: emailEl.value,
      password: passwordEl.value
    })

    if (!payload) {
      setIsErroredEmail(false)
      setIsErroredPassword(false)
      return
    }

    setIsErroredEmail(payload['email'] !== undefined)
    setErrorMessageEmail(payload['email'] || '')

    setIsErroredPassword(payload['password'] !== undefined)
    setErrorMessagePassword(payload['password'] || '')
  }

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()

    validateFields()
  }


  return {
    emailRef,
    passwordRef,
    isErroredEmail,
    isErroredPassword,
    errorMessageEmail,
    errorMessagePassword,
    handleLogin
  }
}
