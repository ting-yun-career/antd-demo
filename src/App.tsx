import { ConfigProvider, theme } from 'antd'
import React, { useState } from 'react'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import { Locale } from 'antd/lib/locale'
import { MyContext } from './globalContext'
import { Outlet } from 'react-router-dom'

const App: React.FC = () => {
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
    <MyContext.Provider value={{ darkMode, setDarkMode, locale: 'zh_CN', changeLocale }}>
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
        <Outlet />
      </ConfigProvider>
    </MyContext.Provider>
  )
}

export default App
