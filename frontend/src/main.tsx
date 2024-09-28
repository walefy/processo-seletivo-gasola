import { createRoot } from 'react-dom/client'
import { router } from './routes.tsx'
import { RouterProvider } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext.tsx'
import { WordContextProvider } from './context/WordContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <UserContextProvider>
      <WordContextProvider>
        <RouterProvider router={router} />
      </WordContextProvider>
    </UserContextProvider>,
)
