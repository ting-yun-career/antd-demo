import React, { useState } from 'react'
import { createContext } from 'react'
import { ConfigProvider, theme } from 'antd'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import { Locale } from 'antd/lib/locale'
import { Navigate, useLocation } from 'react-router-dom'

export const GlobalContext = createContext<{
  darkMode?: boolean
  setDarkMode?: (darkMode: boolean) => void

  locale?: string
  changeLocale?: (locale: string) => void

  user?: any
  signin?: (loginData: UserLoginData, callback: (user: User) => void) => void
  signout?: (callback: VoidFunction) => void
}>({})

export function useAuth() {
  return React.useContext(GlobalContext)
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.user) {
    return <Navigate to={`/login?from=${location.pathname}`} state={{ from: location }} replace />
  }

  return children
}

function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)

  const signin = (loginData: UserLoginData, callback: (user: User) => void) => {
    debugger
    if (loginData.username === 'tcruise' && loginData.password === '123') {
      const userData = { id: 123, fname: 'tom', lname: 'cruise', username: 'tcruise', password: '123' }
      setUser(userData)
      callback(userData)
      return Promise.resolve(userData)
    }
    return Promise.reject(new Error('invalid username or password'))
  }

  const signout = (callback: VoidFunction) => {
    setUser(null)
    callback()
    return Promise.resolve(true)
  }

  const { defaultAlgorithm, darkAlgorithm } = theme
  const [darkMode, setDarkMode] = useState(true)
  const [localeData, setLocaleData] = useState<Locale>(zhCN)

  const changeLocale = (locale: string) => {
    if (locale === 'zh_CN') {
      setLocaleData(zhCN)
      return
    }
    setLocaleData(enUS)
  }

  return (
    <GlobalContext.Provider value={{ darkMode, setDarkMode, locale: 'zh_CN', changeLocale, user, signin, signout }}>
      <ConfigProvider
        locale={localeData}
        theme={{
          algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
          token: darkMode
            ? {
                colorTextBase: '#fff',
                colorPrimary: '#13C2C2',
                wireframe: true,
              }
            : {},
        }}
      >
        {children}
      </ConfigProvider>
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
