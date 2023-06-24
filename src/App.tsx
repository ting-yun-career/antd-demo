import React, { useContext } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Col, Layout, Menu, message, Row, Space, Switch, theme, Tooltip } from 'antd'
import { GlobalContext, useAuth } from './global/globalProvider'
import { CopyrightOutlined } from '@ant-design/icons'
import { Scrollbars } from 'react-custom-scrollbars'

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
              <Tooltip title="Toggle Dark mode">
                <span
                  className="material-symbols-outlined filled"
                  style={{ fontSize: '2em', cursor: 'pointer' }}
                  onClick={() => {
                    setDarkMode?.(!darkMode)
                  }}
                >
                  dark_mode
                </span>
              </Tooltip>
              <Tooltip title="Toggle Language">
                <span
                  className="material-symbols-outlined filled"
                  style={{ fontSize: '2em', cursor: 'pointer' }}
                  onClick={() => {
                    changeLocale?.(locale === 'en_US' ? 'zh_CN' : 'en_US')
                  }}
                >
                  {locale === 'en_US' ? 'language_pinyin' : 'language_us'}
                </span>
              </Tooltip>
              {auth.user && (
                <Tooltip title="Signout">
                  <span
                    className="material-symbols-outlined filled"
                    style={{ fontSize: '2em', cursor: 'pointer' }}
                    onClick={() => {
                      auth.signout?.()
                    }}
                  >
                    output
                  </span>
                </Tooltip>
              )}
            </Space>
          </Col>
        </Row>
      </Header>
      <Layout style={{ minHeight: '100vh', paddingTop: '28px' }}>
        {auth.user && (
          <Sider
            breakpoint="lg"
            style={{
              color: token.colorText,
              backgroundColor: token.colorBgContainer,
            }}
          >
            <Scrollbars style={{ width: 200, height: 'calc(100vh - 30px)' }} autoHide>
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
                        key: 'dashboard/sales',
                        label: 'Sales',
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
                          <span className="material-symbols-outlined" style={{ fontSize: '1.5em' }}>
                            team_dashboard
                          </span>
                        ),
                      },
                    ],
                  },
                  {
                    type: 'divider',
                    style: { margin: '10px 0' },
                  },
                  {
                    key: 'forms',
                    label: 'Forms',
                    icon: (
                      <span className="material-symbols-outlined filled" style={{ fontSize: '1.5em' }}>
                        edit_note
                      </span>
                    ),
                    children: [
                      {
                        key: 'forms/standard',
                        label: 'Standard',
                        icon: (
                          <span className="material-symbols-outlined filled" style={{ fontSize: '1.5em' }}>
                            edit_note
                          </span>
                        ),
                      },
                      {
                        key: 'forms/multi-tab',
                        label: 'Multi-Tab',
                        icon: (
                          <span className="material-symbols-outlined" style={{ fontSize: '1.5em' }}>
                            subheader
                          </span>
                        ),
                      },
                      {
                        key: 'forms/multi-step',
                        label: 'Multi-Step',
                        icon: (
                          <span className="material-symbols-outlined" style={{ fontSize: '1.5em' }}>
                            tab_group
                          </span>
                        ),
                      },
                    ],
                  },
                  {
                    key: 'tables',
                    label: 'Tables',
                    children: [
                      {
                        key: 'tables/readonly',
                        label: 'Readonly',
                        icon: (
                          <span className="material-symbols-outlined filled" style={{ fontSize: '1.5em' }}>
                            table
                          </span>
                        ),
                      },
                      {
                        key: 'tables/searchable',
                        label: 'Searchable',
                        icon: (
                          <span className="material-symbols-outlined filled" style={{ fontSize: '1.5em' }}>
                            table
                          </span>
                        ),
                      },
                    ],
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
                    key: 'widgets',
                    icon: (
                      <span className="material-symbols-outlined filled" style={{ fontSize: '1.5em' }}>
                        widgets
                      </span>
                    ),
                    label: 'Widgets',
                  },
                ]}
                onClick={(e) => {
                  if (e.key === 'dashboard/sales') navigate('/protected/dashboard/sales')
                  else if (e.key === 'dashboard/alternate') navigate('/protected/dashboard/alternate')
                  else if (e.key === 'widgets') navigate('/protected/widgets')
                  else if (e.key === 'charts') navigate('/protected/charts')
                  else if (e.key === 'forms') navigate('/protected/forms/standard')
                  else if (e.key === 'forms/standard') navigate('/protected/forms/standard')
                  else if (e.key === 'forms/multi-tab') navigate('/protected/forms/multi-tab')
                  else if (e.key === 'forms/multi-step') navigate('/protected/forms/multi-step')
                  else if (e.key === 'tables/readonly') navigate('/protected/tables/readonly')
                  else if (e.key === 'tables/searchable') navigate('/protected/tables/searchable')
                  else {
                    message.error('Page not found')
                  }
                }}
              />
            </Scrollbars>
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
