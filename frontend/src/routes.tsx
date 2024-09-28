import { createBrowserRouter } from 'react-router-dom';
import { Login } from './screens/Login';
import { Home } from './screens/Home';
import { ProtectedRouter } from './components/ProtectedRouter';

export const router = createBrowserRouter([
  { path: '', element: <Login /> },
  { path: '/home', element: <ProtectedRouter><Home /></ProtectedRouter> },
])
