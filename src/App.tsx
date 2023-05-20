import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Col, Row, Space, Switch, theme } from 'antd'
import { GlobalContext, useAuth } from './global/globalProvider'

const App: React.FC = () => {
  const { darkMode, setDarkMode, locale, changeLocale } = useContext(GlobalContext)
  const { useToken } = theme
  const { token } = useToken()

  const navigate = useNavigate()
  const auth = useAuth()

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
      <Row gutter={[14, 14]} align="stretch" justify="end" style={{ padding: '1vw', width: '98vw' }}>
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <Space>
            <label>Links:</label>
            <Link to="/protected/dashboard">Dashboard</Link>
            <Link to="/protected/widgets">Widgets</Link>
          </Space>
        </Col>
        <Col>
          <Space>
            <label>dark mode: </label>
            <Switch
              defaultChecked={darkMode}
              onChange={(val) => {
                setDarkMode?.(val)
              }}
            />
            <label>chinese: </label>
            <Switch
              defaultChecked={locale === 'zh_CN'}
              onChange={(chinese) => {
                changeLocale?.(chinese ? 'zh_CN' : 'en_US')
              }}
            />
          </Space>
        </Col>
        {auth.user && (
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <a onClick={() => auth.signout?.()}>Sign out</a>
          </Col>
        )}
      </Row>
      <Outlet />
    </div>
  )
}

export default App
