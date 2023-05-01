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
} from '@ant-design/icons';
import {
  Button,
  Card,
  Divider,
  Dropdown,
  Menu,
  Row,
  Space,
  theme,
  Typography,
} from 'antd';
import React from 'react';

interface MyAppProps {
  onModeChange: () => void;
}

const MyApp: React.FC<MyAppProps> = (props) => {
  const { useToken } = theme;

  const { token } = useToken();

  const handleClick = () => {
    props.onModeChange();
  };

  return (
    <div
      style={{
        color: token.colorText,
        backgroundColor: token.colorBgContainer,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5vh',
      }}
    >
      <div style={{ width: '1000px' }}>
        <Row>
          <Button onClick={handleClick}>Toggle</Button>
        </Row>

        <Row style={{ paddingTop: '10px' }}>
          <Card title="Buttons">
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
                <Dropdown
                  placement="bottomRight"
                  overlay={
                    <Menu
                      items={[
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
                      ]}
                    />
                  }
                  trigger={['click']}
                >
                  <Button icon={<EllipsisOutlined />} />
                </Dropdown>
              </Space.Compact>
            </Space>
          </Card>
        </Row>

        <Row style={{ paddingTop: '10px', width: '1000px' }}>
          <Card title="Typography">
            <Typography.Title level={2}>Title</Typography.Title>

            <Divider />

            <Typography.Title>h1. Ant Design</Typography.Title>
            <Typography.Title level={2}>h2. Ant Design</Typography.Title>
            <Typography.Title level={3}>h3. Ant Design</Typography.Title>
            <Typography.Title level={4}>h4. Ant Design</Typography.Title>
            <Typography.Title level={5}>h5. Ant Design</Typography.Title>

            <Typography.Title level={2} style={{ marginTop: '2em' }}>
              Paragraph / Text / Link / blockquote / pre
            </Typography.Title>

            <Divider />

            <Space direction="vertical">
              <Typography.Paragraph>
                After massive project practice and summaries, Ant Design, a
                design language for background applications, is refined by Ant
                UED Team, which aims to
                <Typography.Text strong>
                  uniform the user interface specs for internal background
                  projects, lower the unnecessary cost of design differences and
                  implementation and liberate the resources of design and
                  front-end development
                </Typography.Text>
              </Typography.Paragraph>
              <Typography.Paragraph>
                <ul>
                  <li>
                    <Typography.Link href="/docs/spec/proximity">
                      Principles
                    </Typography.Link>
                  </li>
                  <li>
                    <Typography.Link href="/docs/spec/overview">
                      Patterns
                    </Typography.Link>
                  </li>
                  <li>
                    <Typography.Link href="/docs/resources">
                      Resource Download
                    </Typography.Link>
                  </li>
                </ul>
              </Typography.Paragraph>
              <Space split={'|'}>
                <Typography.Text keyboard>Esc</Typography.Text>
                <Typography.Text mark>『确定』和『自然』</Typography.Text>
                <Typography.Text strong>更好的用户体验</Typography.Text>
                <Typography.Text code>function (a)</Typography.Text>
              </Space>
              <Typography.Paragraph>
                <blockquote>blockquote</blockquote>
                <pre>pre</pre>
              </Typography.Paragraph>
            </Space>
          </Card>
        </Row>
      </div>
    </div>
  );
};

export default MyApp;
