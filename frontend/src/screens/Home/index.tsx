import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { useHome } from './use_home';

export function Home() {
  const { generateWord } = useHome();

  useEffect(() => {
    generateWord()
  }, [])

  return (
    <div>
      <Header />
    </div>
  )
}
