import { Col, Row } from 'antd'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { ProgressCard } from '../../../components/Card/ProgressCard'

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
          {/*<ProgressCard title={'Stores'} subTitle={'Sales Target'} total={100} completed={50} />*/}
        </Col>
      </Row>
    </>
  )
}
