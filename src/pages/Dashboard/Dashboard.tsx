import { CaretDownOutlined, CaretUpOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Col, Row, Space, Tooltip } from 'antd'
import ChartCard from '../../components/ChartCard/ChartCard'
import { yuan } from '../../utils/number'
import ChartField from '../../components/Field/ChartField'
import { GlobalContext } from '../../global/globalProvider'
import { useContext, useRef } from 'react'
import { green, red } from '@ant-design/colors'
import { useSize } from 'ahooks'

const ColResponseProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
}

const Dashboard: React.FC = () => {
  const { locale } = useContext(GlobalContext)
  const ref = useRef<HTMLDivElement>(null)
  const size = useSize(ref)

  const style2 =
    size && size.width < 282
      ? {
          width: '100%',
          marginLeft: 0,
        }
      : {}

  const data = [
    {
      year: '1991',
      value: 15468,
    },
    {
      year: '1992',
      value: 16100,
    },
    {
      year: '1993',
      value: 15900,
    },
    {
      year: '1994',
      value: 17409,
    },
    {
      year: '1995',
      value: 17000,
    },
    {
      year: '1996',
      value: 31056,
    },
    {
      year: '1997',
      value: 31982,
    },
    {
      year: '1998',
      value: 32040,
    },
    {
      year: '1999',
      value: 33233,
    },
  ]

  return (
    <div className="antd-demo-dashboard">
      <Row gutter={10} justify={'start'}>
        <Col {...ColResponseProps}>
          <div ref={ref}>
            <ChartCard
              bordered={true}
              title={
                <Space>
                  <span>{locale === 'zh_CN' ? '总销售额' : 'Total Sales'}</span>
                  <Tooltip title={locale === 'zh_CN' ? '從 2023/01/01' : 'Since 2023/01/01'}>
                    <InfoCircleOutlined />
                  </Tooltip>
                </Space>
              }
              loading={false}
              total={yuan(126560)}
              footer={<ChartField label={locale === 'zh_CN' ? '今日销售额' : 'Today Sales'} value={yuan(12423)} />}
            >
              <ChartField
                label={locale === 'zh_CN' ? '周销售额' : 'Weekly Sales'}
                value={'12%'}
                postIcon={<CaretUpOutlined style={{ color: green[5] }} />}
              />
              <ChartField
                style={{ marginLeft: '10px', ...style2 }}
                label={locale === 'zh_CN' ? '日销售额' : 'Daily Sales'}
                value={'12%'}
                postIcon={<CaretDownOutlined style={{ color: red[5] }} />}
              />
            </ChartCard>
          </div>
        </Col>
        <Col {...ColResponseProps}>
          <ChartCard
            bordered={true}
            title={
              <Space>
                <span>{locale === 'zh_CN' ? '访问量' : 'Visitors'}</span>
                <Tooltip title={locale === 'zh_CN' ? '從 2023/01/01' : 'Since 2023/01/01'}>
                  <InfoCircleOutlined />
                </Tooltip>
              </Space>
            }
            total={'8,840'}
            footer={<ChartField label={locale === 'zh_CN' ? '今日销售额' : 'Today Sales'} value={yuan(12423)} />}
          >
            <div>Area Chart</div>
          </ChartCard>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
