import React, { CSSProperties, useContext } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Col, Layout, Menu, Row, Space, theme, Tooltip } from 'antd'
import { GlobalContext, useAuth } from './global/globalProvider'
import { CopyrightOutlined } from '@ant-design/icons'
import Color from 'color'

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
          padding: '0 20px',
        }}
      >
        <Row align="stretch" justify="end" style={{ padding: '0' }}>
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
            collapsedWidth="50"
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
              defaultOpenKeys={['dashboard', 'forms', 'tables']}
              onClick={(e) => {
                navigate(`/protected/${e.key}`)
              }}
              items={[
                // {
                //   type: 'group',
                //   key: 'dashboard',
                //   style: { marginTop: '10px' },
                //   label: locale === 'en_US' ? 'Dashboard' : '仪表板',
                //   children: [
                //     {
                //       key: 'dashboard/sales',
                //       label: locale === 'en_US' ? 'Sales' : '销售成绩',
                //       icon: (
                //         <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                //           supervisor_account
                //         </span>
                //       ),
                //     },
                //     {
                //       key: 'dashboard/investments',
                //       label: locale === 'en_US' ? 'Investments' : '投资看板',
                //       icon: (
                //         <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                //           attach_money
                //         </span>
                //       ),
                //     },
                //   ],
                // },
                {
                  type: 'divider',
                  style: { margin: '10px 0' },
                },
                {
                  type: 'group',
                  key: 'forms',
                  label: locale === 'en_US' ? 'Forms' : '表单',
                  children: [
                    {
                      key: 'forms/standard',
                      label: locale === 'en_US' ? 'Standard' : '标准格式',
                      icon: (
                        <span className="material-symbols-outlined filled" style={{ ...menuItemStyle }}>
                          edit_note
                        </span>
                      ),
                    },
                    {
                      key: 'forms/multi-tab',
                      label: locale === 'en_US' ? 'Multi-Tab' : '多标签',
                      icon: (
                        <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                          subheader
                        </span>
                      ),
                    },
                    {
                      key: 'forms/multi-step',
                      label: locale === 'en_US' ? 'Multi-Step' : '多步骤',
                      icon: (
                        <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                          tab_group
                        </span>
                      ),
                    },
                    {
                      key: 'forms/interactive',
                      label: locale === 'en_US' ? 'Interactive' : '依賴互动',
                      icon: (
                        <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                          published_with_changes
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
                  type: 'group',
                  key: 'tables',
                  label: locale === 'en_US' ? 'Ant Design Tables' : 'AD 表格',
                  children: [
                    {
                      key: 'tables/readonly',
                      label: locale === 'en_US' ? 'Readonly' : '资料展示',
                      icon: (
                        <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                          visibility_lock
                        </span>
                      ),
                    },
                    {
                      key: 'tables/searchable',
                      label: locale === 'en_US' ? 'Searchable' : '查询搜索',
                      icon: (
                        <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                          feature_search
                        </span>
                      ),
                    },
                    {
                      key: 'tables/selectable',
                      label: locale === 'en_US' ? 'Selectable' : '勾选数据',
                      icon: (
                        <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                          select_check_box
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
                  type: 'group',
                  key: 'tenstack',
                  label: locale === 'en_US' ? 'Tenstack Table' : 'Tenstack 表格',
                  children: [
                    {
                      key: 'tenstack/basic',
                      label: locale === 'en_US' ? 'Basic' : '基本示例',
                      icon: (
                        <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                          dataset
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
                  type: 'group',
                  key: 'dsa',
                  label: locale === 'en_US' ? 'DSA' : '結構算法',
                  children: [
                    {
                      key: 'dsa/tree',
                      icon: (
                        <span className="material-symbols-outlined filled" style={{ ...menuItemStyle }}>
                          device_hub
                        </span>
                      ),
                      label: locale === 'en_US' ? 'Tree' : '樹結構',
                    },
                  ],
                },
                {
                  type: 'divider',
                  style: { margin: '10px 0' },
                },
                {
                  type: 'group',
                  label: locale === 'en_US' ? 'Others' : '其他',
                  children: [
                    {
                      key: 'charts',
                      icon: (
                        <span className="material-symbols-outlined filled" style={{ ...menuItemStyle }}>
                          finance
                        </span>
                      ),
                      label: locale === 'en_US' ? 'Charts' : '图表',
                    },
                    {
                      key: 'widgets',
                      icon: (
                        <span className="material-symbols-outlined" style={{ ...menuItemStyle }}>
                          widgets
                        </span>
                      ),
                      label: locale === 'en_US' ? 'Widgets' : '功能模块',
                    },
                  ],
                },
              ]}
            />
          </Sider>
        )}
        <Content
          style={{
            backgroundColor: darkMode
              ? Color(token.colorBgContainer).lighten(0.1).hex()
              : Color(token.colorBgContainer).lighten(0.01).mix(Color('blue'), 0.01).hex(),
            padding: '20px',
          }}
        >
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
