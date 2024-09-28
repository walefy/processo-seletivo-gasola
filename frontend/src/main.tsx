import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './routes.tsx'
import { RouterProvider } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>,
)
