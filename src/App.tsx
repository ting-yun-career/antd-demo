import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Col, Layout, Menu, Row, Space, Switch, theme } from 'antd'
import { GlobalContext, useAuth } from './global/globalProvider'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

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
      <Header style={{ height: 'auto', lineHeight: 'normal', background: 'none' }}>
        <Row gutter={[14, 14]} align="stretch" justify="end" style={{ padding: '3px' }}>
          <Col style={{ display: 'flex', alignItems: 'center', fontSize: fontSize }}>
            <Space>
              <label>Links:</label>
              <Link to="/protected/dashboard">Dashboard</Link>
              <Link to="/protected/widgets">Widgets</Link>
            </Space>
          </Col>
          <Col style={{ fontSize: fontSize }}>
            <Space>
              <label>dark</label>
              <Switch
                defaultChecked={darkMode}
                onChange={(val) => {
                  setDarkMode?.(val)
                }}
              />
              <label>Ch/En</label>
              <Switch
                defaultChecked={locale === 'zh_CN'}
                onChange={(chinese) => {
                  changeLocale?.(chinese ? 'zh_CN' : 'en_US')
                }}
              />
            </Space>
          </Col>
          {auth.user && (
            <Col style={{ display: 'flex', alignItems: 'center', fontSize: fontSize }}>
              <a onClick={() => auth.signout?.()}>Sign out</a>
            </Col>
          )}
        </Row>
      </Header>
      <Layout>
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
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Footer</Footer>
    </Layout>
  )
}

export default App
