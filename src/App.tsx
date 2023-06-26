import React, { CSSProperties, useContext } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Col, Layout, Menu, Row, Space, theme, Tooltip } from 'antd'
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

  const menuItemStyle: CSSProperties = {
    fontSize: '1.5em',
  }

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
          <Col style={{ display: 'flex', alignItems: 'center', fontSize: '11px' }}>
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
                defaultOpenKeys={['dashboard']}
                items={[
                  {
                    key: 'dashboard',
                    icon: (
                      <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                        browse
                      </span>
                    ),
                    label: 'Dashboard',
                    children: [
                      {
                        key: 'dashboard/sales',
                        label: 'Sales',
                        icon: (
                          <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                            auto_awesome_mosaic
                          </span>
                        ),
                      },
                      {
                        key: 'dashboard/assets',
                        label: 'Assets',
                        icon: (
                          <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
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
                      <span className="material-symbols-outlined filled" style={{ ...menuItemStyle }}>
                        edit_note
                      </span>
                    ),
                    children: [
                      {
                        key: 'forms/standard',
                        label: 'Standard',
                        icon: (
                          <span className="material-symbols-outlined filled" style={{ ...menuItemStyle }}>
                            edit_note
                          </span>
                        ),
                      },
                      {
                        key: 'forms/multi-tab',
                        label: 'Multi-Tab',
                        icon: (
                          <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                            subheader
                          </span>
                        ),
                      },
                      {
                        key: 'forms/multi-step',
                        label: 'Multi-Step',
                        icon: (
                          <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                            tab_group
                          </span>
                        ),
                      },
                    ],
                  },
                  {
                    key: 'tables',
                    label: 'Tables',
                    icon: (
                      <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                        table
                      </span>
                    ),
                    children: [
                      {
                        key: 'tables/readonly',
                        label: 'Readonly',
                        icon: (
                          <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                            visibility_lock
                          </span>
                        ),
                      },
                      {
                        key: 'tables/searchable',
                        label: 'Searchable',
                        icon: (
                          <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                            feature_search
                          </span>
                        ),
                      },
                      {
                        key: 'tables/selectable',
                        label: 'Selectable',
                        icon: (
                          <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                            select_check_box
                          </span>
                        ),
                      },
                    ],
                  },
                  {
                    key: 'charts',
                    icon: (
                      <span className="material-symbols-outlined filled" style={{ ...menuItemStyle }}>
                        finance
                      </span>
                    ),
                    label: 'Charts',
                  },
                  {
                    key: 'widgets',
                    icon: (
                      <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                        widgets
                      </span>
                    ),
                    label: 'Widgets',
                  },
                ]}
                onClick={(e) => {
                  navigate(`/protected/${e.key}`)
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
