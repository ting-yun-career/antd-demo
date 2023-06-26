import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './index.css'
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom'
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
        element: (
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        ),
        children: [
          {
            path: 'dashboard',
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: 'sales',
                element: <Dashboard />,
              },
              {
                path: 'assets',
                element: <div>Dashboard - Assets</div>,
              },
            ],
          },
          {
            path: 'forms',
            children: [
              {
                path: 'standard',
                element: <Forms />,
              },
              {
                path: 'multi-tab',
                element: <div>Multi Tab Form</div>,
              },
              {
                path: 'multi-step',
                element: <div>Multi Steps</div>,
              },
            ],
          },
          {
            path: 'tables',
            children: [
              {
                path: 'readonly',
                element: <div>Readonly</div>,
              },
              {
                path: 'searchable',
                element: <div>Searchable</div>,
              },
              {
                path: 'selectable',
                element: <div>Selectable</div>,
              },
              {
                path: 'pageable',
                element: <div>Paginated</div>,
              },
            ],
          },
          {
            id: 'charts',
            path: 'charts',
            element: <Charts />,
          },
          {
            id: 'widgets',
            path: 'widgets',
            element: <Widgets />,
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
