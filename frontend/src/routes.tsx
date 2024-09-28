import { createBrowserRouter } from 'react-router-dom';
import { Login } from './screens/Login';
import { ProtectedRouter } from './components/ProtectedRouter';

export const router = createBrowserRouter([
  { path: '', element: <Login /> },
  { path: '/home', element: <ProtectedRouter><h1>home</h1></ProtectedRouter> },
])
