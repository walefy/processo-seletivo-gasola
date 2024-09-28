import { createBrowserRouter } from 'react-router-dom';
import { Login } from './screens/Login';

export const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/home', element: <div>home</div> },
])
