import { createContext, useState } from 'react';
import { WordContextType } from '../types/word_context_type';

export const WordContext = createContext({} as WordContextType)

export function WordContextProvider({ children }: { children: React.ReactNode }) {
  const [tip, setTip] = useState('');
  const [wordLength, setWordLength] = useState(0);

  return (
    <WordContext.Provider value={{ tip, wordLength, setTip, setWordLength }}>
      {children}
    </WordContext.Provider>
  )
}
