import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Error from './pages/Error'
import Widgets from './pages/Widgets/Widgets'
import App from './App'
import GlobalContextProvider, { RequireAuth } from './global/globalProvider'
import Login from './pages/Login/Login'
import Charts from './pages/Charts/Charts'
import { Investments } from './pages/Dashboard/Investments'
import { Sales } from './pages/Dashboard/Sales'
import MultiTabForm from './pages/Forms/MultiTab/MultiTabForm'
import StandardForm from './pages/Forms/Standard/StandardForm'
import { MultiStepForm } from './pages/Forms/MultiStep/MultiStepForm'
import { ReadOnlyTable } from './pages/Tables/ReadOnly/ReadOnlyTable'
import { InteractiveForm } from './pages/Forms/Interactive/InteractiveForm'
import { SearchableTable } from './pages/Tables/Searchable/SearchableTable'
import SelectableTable from './pages/Tables/Selectable/SelectableTable'

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
                path: 'sales',
                element: <Sales />,
              },
              {
                path: 'investments',
                element: <Investments />,
              },
            ],
          },
          {
            path: 'forms',
            children: [
              {
                path: 'standard',
                element: <StandardForm />,
              },
              {
                path: 'multi-tab',
                element: <MultiTabForm />,
              },
              {
                path: 'multi-step',
                element: <MultiStepForm />,
              },
              {
                path: 'interactive',
                element: <InteractiveForm />,
              },
            ],
          },
          {
            path: 'tables',
            children: [
              {
                path: 'readonly',
                element: <ReadOnlyTable />,
              },
              {
                path: 'searchable',
                element: <SearchableTable />,
              },
              {
                path: 'selectable',
                element: <SelectableTable />,
              },
              {
                path: 'tenstack',
                element: <div>tenstack</div>,
              },
            ],
          },
          // {
          //   id: 'calendar',
          //   path: 'calendar',
          //   element: <div>Calendar</div>,
          // },
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
