import { InfoCircleOutlined } from '@ant-design/icons'
import { Col, Row, Space, Tooltip } from 'antd'
import ChartCard from '../../components/ChartCard/ChartCard'
import { yuan } from '../../utils/number'
import Field from '../../components/Field/Field'
import { GlobalContext } from '../../global/globalProvider'
import { useContext } from 'react'

const ColResponseProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
}

const Dashboard: React.FC = () => {
  const { locale } = useContext(GlobalContext)

  return (
    <div className="antd-demo-dashboard">
      <Row gutter={24}>
        <Col {...ColResponseProps}>
          <ChartCard
            bordered={false}
            title={
              <Space>
                <span>{locale === 'zh_CN' ? '总销售额' : 'Total Sales'}</span>
                <Tooltip title={locale === 'zh_CN' ? '於 2023 年一月一日開始' : 'Since Jan 1 of 2023'}>
                  <InfoCircleOutlined />
                </Tooltip>
              </Space>
            }
            loading={false}
            total={yuan(126560)}
            footer={<Field label={locale === 'zh_CN' ? '日销售额' : 'Daily Sales'} value={yuan(12423)} />}
            contentHeight={46}
          >
            {/*<Trend flag="up" style={{ marginRight: 16 }}>*/}
            {/*  <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />*/}
            {/*  <span className={styles.trendText}>12%</span>*/}
            {/*</Trend>*/}
            {/*<Trend flag="down">*/}
            {/*  <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />*/}
            {/*  <span className={styles.trendText}>11%</span>*/}
            {/*</Trend>*/}
          </ChartCard>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
