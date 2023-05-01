import { ConfigProvider, theme } from 'antd';
import React, { useState } from 'react';
import MyApp from './MyApp/MyApp';

const App: React.FC = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: isDarkMode
          ? {
              colorTextBase: '#fff',
              colorPrimary: '#13C2C2',
              wireframe: true,
            }
          : {},
      }}
    >
      <MyApp onModeChange={() => setIsDarkMode(!isDarkMode)} />
    </ConfigProvider>
  );
};

export default App;
