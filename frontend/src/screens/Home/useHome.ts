import { useContext, useEffect, useState } from 'react'
import { useBackend } from '../../hooks/useBackend'
import { UserContext } from '../../context/UserContext'
import { WordContext } from '../../context/WordContext'

const genLettersObject = (wordLength: number) => [...Array(wordLength)].reduce((acc, _, i) => {
  return {...acc, [i]: ''}
}, {})

export const useHome = () => {
  const { generateWord: generateWordBackend, verifyLetter } = useBackend()
  const { token, user, setUser, clearToken, updateUserData } = useContext(UserContext)
  const { setTip, setWordLength, wordLength } = useContext(WordContext)
  const [letters, setLetters] = useState<Record<number, string>>()
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const [correctWord, setCorrectWord] = useState('')

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const generateWord = async () => {
    const data = await generateWordBackend(token)
    setTip(data.tip)
    setWordLength(data.length)
    setLetters(genLettersObject(data.length))
  }

  const handleGuess = async (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters((prev) => [...prev, letter])
      const payload = await verifyLetter(token, letter)

      if (payload.gameOver) {
        setGameOver(true)
        setUser({...user!, currentLife: 0})
        setCorrectWord(payload.word)
        return
      }
      
      setUser({...user!, currentLife: payload.life})
      setLetters((prev) => {
        const newLetters = {...prev}
        payload.indexArray.forEach((index: number) => {
          newLetters[index] = letter
        })
        return newLetters
      })
    }
  }

  const playAgain = async () => {
    setGuessedLetters([])
    setGameOver(false)
    setVictory(false)
    await generateWord()
    await updateUserData(token)
  }

  useEffect(() => {
    generateWord()
  }, [])

  useEffect(() => {
    if (letters && Object.values(letters).every((letter) => letter !== '')) {
      setVictory(true)
    }
  }, [letters])
  
  return {
    wordLength,
    alphabet,
    letters,
    guessedLetters,
    gameOver,
    victory,
    correctWord,
    playAgain,
    handleGuess,
    clearToken
  }
}
