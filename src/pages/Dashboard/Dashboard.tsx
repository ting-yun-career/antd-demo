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

  return (
    <div className="antd-demo-dashboard">
      {new Array(1).fill(null).map((_, index) => (
        <Row key={index}>
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
        </Row>
      ))}
    </div>
  )
}

export default Dashboard
