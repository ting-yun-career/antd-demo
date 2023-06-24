import React, { useContext } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Col, Layout, Menu, message, Row, Space, Switch, theme } from 'antd'
import { GlobalContext, useAuth } from './global/globalProvider'
import Icon, {
  AppstoreOutlined,
  AreaChartOutlined,
  ClusterOutlined,
  CopyrightOutlined,
  FormOutlined,
  HomeOutlined,
  InsertRowBelowOutlined,
  TableOutlined,
} from '@ant-design/icons'
import { DashboardAlternate } from './components/Icon/DashboardAlternate'

const App: React.FC = () => {
  const { darkMode, setDarkMode, locale, changeLocale } = useContext(GlobalContext)
  const { useToken } = theme
  const { token } = useToken()
  const navigate = useNavigate()
  const location = useLocation()
  const routeKey = location.pathname.replace('/protected/', '')

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
              <label>dark</label>
              <Switch
                size="small"
                defaultChecked={darkMode}
                onChange={(val) => {
                  setDarkMode?.(val)
                }}
              />
              <label>ch/en</label>
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
                userSelect: 'none',
              }}
              mode="inline"
              defaultSelectedKeys={[routeKey]}
              items={[
                {
                  key: 'dashboard',
                  icon: (
                    <span className="material-symbols-outlined" style={{ fontSize: '1.5em' }}>
                      browse
                    </span>
                  ),
                  label: 'Dashboard',
                  children: [
                    {
                      key: 'dashboard/default',
                      label: 'Default',
                      icon: (
                        <span className="material-symbols-outlined" style={{ fontSize: '1.5em' }}>
                          auto_awesome_mosaic
                        </span>
                      ),
                    },
                    {
                      key: 'dashboard/alternate',
                      label: 'Alternate',
                      icon: (
                        <span className="material-symbols-outlined filled" style={{ fontSize: '1.5em' }}>
                          team_dashboard
                        </span>
                      ),
                    },
                  ],
                },
                {
                  key: 'widgets',
                  icon: (
                    <span className="material-symbols-outlined filled" style={{ fontSize: '1.5em' }}>
                      widgets
                    </span>
                  ),
                  label: 'Widgets',
                },
                {
                  key: 'charts',
                  icon: (
                    <span className="material-symbols-outlined filled" style={{ fontSize: '1.5em' }}>
                      finance
                    </span>
                  ),
                  label: 'Charts',
                },
                {
                  key: 'forms',
                  icon: (
                    <span className="material-symbols-outlined filled" style={{ fontSize: '1.5em' }}>
                      edit_note
                    </span>
                  ),
                  label: 'Forms',
                },
                {
                  key: 'tables',
                  icon: (
                    <span className="material-symbols-outlined filled" style={{ fontSize: '1.5em' }}>
                      table
                    </span>
                  ),
                  label: 'Tables',
                },
              ]}
              onClick={(e) => {
                console.log(e.key)
                if (e.key === 'dashboard/default') navigate('/protected/dashboard')
                else if (e.key === 'dashboard/alternate') navigate('/protected/dashboard/alternate')
                else if (e.key === 'widgets') navigate('/protected/widgets')
                else if (e.key === 'charts') navigate('/protected/charts')
                else if (e.key === 'forms') navigate('/protected/forms')
                else if (e.key === 'tables') navigate('/protected/tables')
                else {
                  message.error('Page not found')
                }
              }}
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
