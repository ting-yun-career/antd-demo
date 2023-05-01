import { ConfigProvider, theme } from 'antd';
import React, { useState, createContext, useContext } from 'react';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import MyApp from './MyApp/MyApp';
import { Locale } from 'antd/lib/locale';
import { MyContext } from './globalContext';

const App: React.FC = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [darkMode, setDarkMode] = useState(false);
  const [locale, setLocale] = useState<string>('en_US');
  const [localeData, setLocaleData] = useState<Locale>(enUS);

  const changeLocale = (locale: string) => {
    if (locale === 'zh_CN') {
      setLocaleData(zhCN);
      return;
    }
    setLocaleData(enUS);
  };

  return (
    <MyContext.Provider value={{ darkMode, setDarkMode, locale, changeLocale }}>
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
        <MyApp />
      </ConfigProvider>
    </MyContext.Provider>
  );
};

export default App;
