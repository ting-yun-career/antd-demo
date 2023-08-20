import { Button, Col, Result, Row } from 'antd'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { MoneyCard } from '../../../components/Card/MoneyCard'
import { GlobalContext } from '../../../global/globalProvider'
import { useContext } from 'react'

const ColResponseProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
}

export const Sales: React.FC<object> = (props: object) => {
  const { locale } = useContext(GlobalContext)

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '仪表板 - 销售成绩' : 'Sales'}</PageTitle>
      <Result
        status="500"
        title={locale === 'zh_CN' ? '正在架構中' : 'Work in Progress'}
        subTitle={
          locale === 'zh_CN'
            ? '抱歉，此页面仍在建设中。很快就可以用啦。'
            : 'Sorry this page is still under construction. Will be available soon.'
        }
      />
      {/* 
      <Row gutter={20} justify={'start'}>
        <Col {...ColResponseProps} style={{ marginBottom: '10px' }}>
          <MoneyCard
            header={{
              title: 15462,
              subTitle: locale === 'zh_CN' ? '四月份的收入' : 'Earnings in Apr',
              currency: '$',
              trend: { amount: 3.3, unit: '%' }
            }}
          >
            <div style={{ padding: `20px`, paddingTop: 0 }}>{locale === 'zh_CN' ? "详情" : "Detail"}</div>
          </MoneyCard>
        </Col>
      </Row>
      */}
    </>
  )
}
