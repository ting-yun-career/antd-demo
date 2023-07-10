import { Col, Row } from 'antd'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { MoneyCard } from '../../../components/Card/MoneyCard'

const ColResponseProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
}

export const Sales: React.FC<object> = (props: object) => {
  return (
    <>
      <PageTitle>Sales</PageTitle>
      <Row gutter={20} justify={'start'}>
        <Col {...ColResponseProps} style={{ marginBottom: '10px' }}>
          <MoneyCard
            header={{ title: 15462, subTitle: 'Earnings in Apr', currency: '$', trend: { amount: 3.3, unit: '%' } }}
          >
            <div style={{ padding: `20px`, paddingTop: 0 }}>Detail</div>
          </MoneyCard>
        </Col>
      </Row>
    </>
  )
}
