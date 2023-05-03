import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './pages/Error'
import Widgets from './pages/Widgets'
import App from './App'
import { RequireAuth } from './global/globalProvider'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: 'widgets',
        element: <Widgets />,
      },
      {
        path: 'protected',
        element: (
          <RequireAuth>
            <div>Protected Resources</div>
          </RequireAuth>
        ),
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
