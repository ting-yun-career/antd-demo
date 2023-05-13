import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Col, Row, Switch, theme } from 'antd'
import { GlobalContext } from './global/globalProvider'

const App: React.FC = () => {
  const { darkMode, setDarkMode, locale, changeLocale } = useContext(GlobalContext)
  const { useToken } = theme
  const { token } = useToken()

  return (
    <div
      style={{
        color: token.colorText,
        backgroundColor: token.colorBgContainer,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Row gutter={[14, 14]} justify="end" style={{ padding: '1vw', width: '98vw' }}>
        <Col>
          <label>dark mode: </label>
          <Switch
            defaultChecked={darkMode}
            onChange={(val) => {
              setDarkMode?.(val)
            }}
          />
        </Col>
        <Col>
          <label>chinese: </label>
          <Switch
            defaultChecked={locale === 'zh_CN'}
            onChange={(chinese) => {
              changeLocale?.(chinese ? 'zh_CN' : 'en_US')
            }}
          />
        </Col>
      </Row>
      <Outlet />
    </div>
  )
}

export default App
