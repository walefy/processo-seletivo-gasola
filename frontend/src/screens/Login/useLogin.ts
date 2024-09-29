import { useContext, useRef, useState } from 'react'
import { loginSchema } from '../../schemas/loginSchema'
import { schemaValidator } from '../../utils/schemaValidator'
import { useBackend } from '../../hooks/useBackend'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

export const useLogin = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [isAuthErrorModalOpen, setIsAuthErrorModalOpen] = useState(false)
  const [isErroredEmail, setIsErroredEmail] = useState(false)
  const [isErroredPassword, setIsErroredPassword] = useState(false)
  const [errorMessageEmail, setErrorMessageEmail] = useState('')
  const [errorMessagePassword, setErrorMessagePassword] = useState('')

  const { getToken } = useBackend()
  const { setToken } = useContext(UserContext)
  const navigate = useNavigate()

  const validateFields = (emailEl: HTMLInputElement, passwordEl: HTMLInputElement) => {
    const payload = schemaValidator(loginSchema, {
      email: emailEl.value,
      password: passwordEl.value
    })

    if (!payload) {
      setIsErroredEmail(false)
      setIsErroredPassword(false)
      return true
    }

    setIsErroredEmail(payload['email'] !== undefined)
    setErrorMessageEmail(payload['email'] || '')

    setIsErroredPassword(payload['password'] !== undefined)
    setErrorMessagePassword(payload['password'] || '')
    return false
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()

    const emailEl = emailRef.current
    const passwordEl = passwordRef.current

    if (!emailEl || !passwordEl) {
      throw new Error('Input elements are missing')
    }

    const isValidFields = validateFields(emailEl, passwordEl)

    if (!isValidFields) return

    const payload = await getToken(emailEl.value, passwordEl.value)
    
    if (!payload.success) {
      setIsAuthErrorModalOpen(true)
      return
    }

    setToken(payload.token)
    navigate('/home')
  }

  const closeAuthErrorModal = () => {
    setIsAuthErrorModalOpen(false)
  }

  return {
    emailRef,
    passwordRef,
    isErroredEmail,
    isErroredPassword,
    errorMessageEmail,
    errorMessagePassword,
    isAuthErrorModalOpen,
    closeAuthErrorModal,
    handleLogin
  }
}
