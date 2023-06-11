import {
  CommentOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  HeartOutlined,
  LikeOutlined,
  MailOutlined,
  MobileOutlined,
  PoweroffOutlined,
  ShareAltOutlined,
  StarOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Dropdown,
  MenuProps,
  Pagination,
  Row,
  Select,
  Space,
  TimePicker,
  Typography,
} from 'antd'
import React from 'react'
import { PageTitle } from '../../components/PageTitle/PageTitle'

const Widgets: React.FC = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Report',
      icon: <WarningOutlined />,
    },
    {
      key: '2',
      label: 'Mail',
      icon: <MailOutlined />,
    },
    {
      key: '3',
      label: 'Mobile',
      icon: <MobileOutlined />,
    },
  ]

  return (
    <>
      <PageTitle>Widgets</PageTitle>

      <Row>
        <Card title="I18n" style={{ width: '95%' }}>
          <Space direction="vertical">
            <Pagination defaultCurrent={1} total={50} showSizeChanger />
            <Select showSearch style={{ width: 200 }}>
              <Select.Option value="jack">jack</Select.Option>
              <Select.Option value="lucy">lucy</Select.Option>
            </Select>
            <DatePicker />
            <TimePicker />
          </Space>
        </Card>
      </Row>

      <Row style={{ marginTop: '10px' }}>
        <Card title="Buttons" style={{ width: '95%' }}>
          <Space direction="vertical">
            <Space wrap>
              <Button>Default Button</Button>
              <Button type="primary">Primary Button</Button>
              <Button type="primary" loading={true}>
                Loading
              </Button>
              <Button type="dashed">Dashed Button</Button>
              <Button type="text">Text Button</Button>
              <Button ghost>Text Button</Button>
              <Button type="link">Link Button</Button>
              <Button type="primary" icon={<PoweroffOutlined />}>
                With icon
              </Button>
            </Space>

            <Space wrap style={{ paddingTop: '10px' }}>
              <Button type="primary" danger>
                Primary
              </Button>
              <Button danger>Default</Button>
              <Button type="dashed" danger>
                Dashed
              </Button>
              <Button type="text" danger>
                Text
              </Button>
              <Button type="link" danger>
                Link
              </Button>
            </Space>

            <Space wrap style={{ paddingTop: '10px' }}>
              <Button type="primary" disabled>
                Primary(disabled)
              </Button>
              <Button disabled>Default(disabled)</Button>
              <Button type="dashed" disabled>
                Dashed(disabled)
              </Button>
              <Button type="text" disabled>
                Text(disabled)
              </Button>
              <Button type="link" disabled>
                Link(disabled)
              </Button>
            </Space>

            <Space wrap style={{ paddingTop: '10px' }}>
              <Button danger disabled>
                Danger Default(disabled)
              </Button>
              <Button danger type="text" disabled>
                Danger Text(disabled)
              </Button>
              <Button type="link" danger>
                Danger Link
              </Button>
              <Button type="link" danger disabled>
                Danger Link(disabled)
              </Button>
            </Space>

            <Space.Compact style={{ paddingTop: '10px' }}>
              <Button icon={<LikeOutlined />} />
              <Button icon={<CommentOutlined />} />
              <Button icon={<StarOutlined />} />
              <Button icon={<HeartOutlined />} />
              <Button icon={<ShareAltOutlined />} />
              <Button icon={<DownloadOutlined />} />
              <Dropdown placement="bottomRight" menu={{ items }} trigger={['click']}>
                <Button icon={<EllipsisOutlined />} />
              </Dropdown>
            </Space.Compact>
          </Space>
        </Card>
      </Row>

      <Row style={{ marginTop: '10px' }}>
        <Card title="Typography" style={{ width: '95%' }}>
          <Typography.Title level={2}>Title</Typography.Title>

          <Divider />

          <Typography.Title>h1. Ant Design</Typography.Title>
          <Typography.Title level={2}>h2. Ant Design</Typography.Title>
          <Typography.Title level={3}>h3. Ant Design</Typography.Title>
          <Typography.Title level={4}>h4. Ant Design</Typography.Title>
          <Typography.Title level={5}>h5. Ant Design</Typography.Title>

          <Typography.Title level={2} style={{ marginTop: '2em' }}>
            Paragraph / blockquote / pre
          </Typography.Title>

          <Divider />

          <Space direction="vertical">
            <Typography.Paragraph>
              After massive project practice and summaries, Ant Design, a design language for background applications,
              is refined by Ant UED Team, which aims to
              <Typography.Text strong>
                uniform the user interface specs for internal background projects, lower the unnecessary cost of design
                differences and implementation and liberate the resources of design and front-end development
              </Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <ul>
                <li>
                  <Typography.Link href="/docs/spec/proximity">Principles</Typography.Link>
                </li>
                <li>
                  <Typography.Link href="/docs/spec/overview">Patterns</Typography.Link>
                </li>
                <li>
                  <Typography.Link href="/docs/resources">Resource Download</Typography.Link>
                </li>
              </ul>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <blockquote>blockquote</blockquote>
              <pre>pre</pre>
            </Typography.Paragraph>
          </Space>

          <Typography.Title level={2} style={{ marginTop: '2em' }}>
            Text
          </Typography.Title>

          <Divider />

          <Space direction="vertical">
            <Typography.Text>Ant Design (default)</Typography.Text>
            <Typography.Text type="secondary">Ant Design (secondary)</Typography.Text>
            <Typography.Text type="success">Ant Design (success)</Typography.Text>
            <Typography.Text type="warning">Ant Design (warning)</Typography.Text>
            <Typography.Text type="danger">Ant Design (danger)</Typography.Text>
            <Typography.Text disabled>Ant Design (disabled)</Typography.Text>
            <Typography.Text mark>Ant Design (mark)</Typography.Text>
            <Typography.Text code>Ant Design (code)</Typography.Text>
            <Typography.Text keyboard>Ant Design (keyboard)</Typography.Text>
            <Typography.Text underline>Ant Design (underline)</Typography.Text>
            <Typography.Text delete>Ant Design (delete)</Typography.Text>
            <Typography.Text strong>Ant Design (strong)</Typography.Text>
            <Typography.Text italic>Ant Design (italic)</Typography.Text>
            <Typography.Link href="https://ant.design" target="_blank">
              Ant Design (Link)
            </Typography.Link>
          </Space>
        </Card>
      </Row>
    </>
  )
}

export default Widgets
