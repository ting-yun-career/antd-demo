import React, { useState } from 'react'
import { createContext } from 'react'
import { ConfigProvider, theme } from 'antd'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import { Locale } from 'antd/lib/locale'
import { Navigate, useLocation } from 'react-router-dom'
import { authenticate } from './api'

export const GlobalContext = createContext<{
  darkMode?: boolean
  setDarkMode?: (darkMode: boolean) => void

  locale?: string
  changeLocale?: (locale: string) => void

  user?: any
  signin?: (loginData: UserLoginData, callback: (user: User) => void) => Promise<any>
  signout?: (callback?: VoidFunction) => Promise<any>

  colors?: any
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
  const [user, setUser] = React.useState<User | null>({
    id: 101,
    username: 'admin',
    password: '1****6',
    fname: 'Admin',
    lname: '',
  })

  const signin = (loginData: UserLoginData, callback: (user: User) => void) => {
    return authenticate({ payload: loginData }).then((resp) => {
      if (resp.status === 200) {
        setUser(resp.data)
        callback(resp.data)
        return Promise.resolve(resp.data)
      }

      return Promise.reject(new Error('invalid username or password'))
    })
  }

  const signout = (callback: VoidFunction | undefined) => {
    setUser(null)
    callback?.()
    return Promise.resolve(true)
  }

  const { defaultAlgorithm, darkAlgorithm } = theme
  const [darkMode, setDarkMode] = useState(false)
  const [locale, setLocale] = useState<string>('zh_CN')
  const [localeData, setLocaleData] = useState<Locale>(zhCN)

  const changeLocale = (locale: string) => {
    if (locale === 'zh_CN') {
      setLocale(locale)
      setLocaleData(zhCN)
      return
    }
    setLocale('en_US')
    setLocaleData(enUS)
  }

  const colors = {
    cardBgColor: darkMode ? '#1e1e2d' : '#ececef',
  }

  return (
    <GlobalContext.Provider value={{ darkMode, setDarkMode, locale, changeLocale, user, signin, signout, colors }}>
      <ConfigProvider
        locale={localeData}
        theme={{
          algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorLink: '#367AD9',
            colorSuccess: '#50cd89',
            colorWarning: '#ffc700',
            colorError: '#f1416c',
            colorInfo: '#7239ea',
            colorPrimary: darkMode ? '#13C2C2' : '#367AD9',
            colorTextBase: darkMode ? '#fdfdff' : '#181C32',
            colorBgContainer: darkMode ? '#101015' : '#f0f0f2',
            wireframe: true,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
