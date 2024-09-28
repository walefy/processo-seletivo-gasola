import { useContext } from 'react'
import { useBackend } from '../../hooks/useBackend'
import { UserContext } from '../../context/UserContext'
import { WordContext } from '../../context/WordContext'

export const useHome = () => {
  const { generateWord: generateWordBackend } = useBackend()
  const { token } = useContext(UserContext)
  const { setTip, setWordLength } = useContext(WordContext)

  const generateWord = async () => {
    const data = await generateWordBackend(token)
    setTip(data.tip)
    setWordLength(data.length)
    console.log(data)
  }
  
  return {
    generateWord
  }
}
