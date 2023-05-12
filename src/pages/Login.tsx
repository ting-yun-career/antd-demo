import { CSSProperties, useContext, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { GlobalContext, useAuth } from '../global/globalProvider'
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { Divider, message, Space, Tabs, theme } from 'antd'
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons'
import styles from './Login.module.css'

type LoginType = 'phone' | 'account'

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const { useToken } = theme
  const { token } = useToken()

  const [searchParams] = useSearchParams()
  const { darkMode } = useContext(GlobalContext)

  const [username, setUsername] = useState('tcruise')
  const [password, setPassword] = useState('123456')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    auth.signin?.({ username, password }, () => {
      const from = searchParams.get('from')
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.
      navigate(from ?? '', { replace: true })
    })
  }

  const [loginType, setLoginType] = useState<LoginType>('account')

  return (
    <div
      className={styles['login-form']}
      style={{
        color: token.colorText,
        backgroundColor: token.colorBgContainer,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginForm
        onFinish={(formValues) => {
          console.log(formValues)
          return Promise.resolve(true)
        }}
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        subTitle="登入平台"
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}>其他登录方式</span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <WeiboOutlined style={{ ...iconStyles, color: '#aaa' }} />
              </div>
            </Space>
          </div>
        }
      >
        <Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
                autoComplete: 'off',
              }}
              placeholder={'用户名: admin or user'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码: ant.design'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />,
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`
                }
                return '获取验证码'
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234')
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        {/*<form onSubmit={handleSubmit}>*/}
        {/*  <label>*/}
        {/*    Username:{' '}*/}
        {/*    <input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />*/}
        {/*  </label>*/}
        {/*  <label>*/}
        {/*    Password:*/}
        {/*    <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />*/}
        {/*  </label>*/}
        {/*  <button type="submit">Login</button>*/}
        {/*</form>*/}
      </LoginForm>
    </div>
  )
}

export default Login
