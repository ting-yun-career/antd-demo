import React from 'react'

import { Outlet } from 'react-router-dom'
import GlobalContextProvider from './global/globalProvider'

const App: React.FC = () => {
  return (
    <GlobalContextProvider>
      <Outlet />
    </GlobalContextProvider>
  )
}

export default App
