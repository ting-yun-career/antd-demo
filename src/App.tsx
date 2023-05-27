import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Col, Layout, Menu, Row, Space, Switch, theme } from 'antd'
import { GlobalContext, useAuth } from './global/globalProvider'
import { CopyrightOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

const App: React.FC = () => {
  const { darkMode, setDarkMode, locale, changeLocale } = useContext(GlobalContext)
  const { useToken } = theme
  const { token } = useToken()

  const auth = useAuth()

  const { Header, Content, Footer, Sider } = Layout

  const fontSize: CSSStyleDeclaration['fontSize'] = '11px'

  return (
    <Layout
      style={{
        color: token.colorText,
        backgroundColor: token.colorBgContainer,
      }}
    >
      <Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: 'auto',
          lineHeight: 'normal',
          borderBottom: '1px solid ' + token.colorBorder,
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Row align="stretch" justify="end" style={{ padding: '3px' }}>
          <Col style={{ display: 'flex', alignItems: 'center', fontSize: fontSize }}>
            <Space>
              <label>Links:</label>
              <Link to="/protected/dashboard">Dashboard</Link>
              <Link to="/widgets">Widgets</Link>|<label>dark</label>
              <Switch
                size="small"
                defaultChecked={darkMode}
                onChange={(val) => {
                  setDarkMode?.(val)
                }}
              />
              <label>Ch/En</label>
              <Switch
                size="small"
                defaultChecked={locale === 'zh_CN'}
                onChange={(chinese) => {
                  changeLocale?.(chinese ? 'zh_CN' : 'en_US')
                }}
              />
              {auth.user && <a onClick={() => auth.signout?.()}>Sign out</a>}
            </Space>
          </Col>
        </Row>
      </Header>
      <Layout style={{ minHeight: '100vh', paddingTop: '20px' }}>
        {auth.user && (
          <Sider
            breakpoint="lg"
            style={{
              color: token.colorText,
              backgroundColor: token.colorBgContainer,
            }}
          >
            <Menu
              style={{
                color: token.colorText,
                backgroundColor: token.colorBgContainer,
                borderInlineEnd: 'none',
              }}
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map((icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: `nav ${index + 1}`,
              }))}
            />
          </Sider>
        )}
        <Content style={{ padding: '20px' }}>
          <Outlet />
          <Footer
            style={{
              textAlign: 'center',
              backgroundColor: 'inherit',
              outline: '1px dashed ' + token.colorBorder,
              marginTop: '20px',
            }}
          >
            <CopyrightOutlined /> 2023 Ting Yun
          </Footer>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
