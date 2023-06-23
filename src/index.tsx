import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './index.css'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import Error from './pages/Error'
import Widgets from './pages/Widgets/Widgets'
import App from './App'
import GlobalContextProvider, { RequireAuth } from './global/globalProvider'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Charts from './pages/Charts/Charts'
import Forms from './pages/Forms/Forms'
import Tables from './pages/Tables/Tables'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: 'login',
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: 'protected',
        children: [
          {
            path: 'dashboard',
            children: [
              {
                index: true,
                element: (
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                ),
              },
              {
                path: 'alternate',
                element: (
                  <RequireAuth>
                    <div>Alternate Dashboard</div>
                  </RequireAuth>
                ),
              },
            ],
          },
          {
            id: 'widgets',
            path: 'widgets',
            element: (
              <RequireAuth>
                <Widgets />
              </RequireAuth>
            ),
          },
          {
            id: 'charts',
            path: 'charts',
            element: (
              <RequireAuth>
                <Charts />
              </RequireAuth>
            ),
          },
          {
            id: 'forms',
            path: 'forms',
            element: (
              <RequireAuth>
                <Forms />
              </RequireAuth>
            ),
          },
          {
            id: 'tables',
            path: 'tables',
            element: (
              <RequireAuth>
                <Tables />
              </RequireAuth>
            ),
          },
        ],
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </React.StrictMode>
)
