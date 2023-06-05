import { Card, CardProps, Divider } from 'antd'
import styles from './ChartCard.module.scss'

export interface IChartCardProps extends CardProps {
  title: React.ReactNode
  action?: React.ReactNode
  footer?: React.ReactNode
  loading?: boolean
  style?: React.CSSProperties
}

const ChartCard: React.FC<IChartCardProps> = (props: IChartCardProps) => {
  const { title, action, footer, children, style, loading } = props

  return (
    <Card loading={loading} bodyStyle={{ padding: '20px 24px 8px 24px' }}>
      <div className={styles['antd-demo']}>
        <div className={styles['antd-demo-top']}>
          <span className={styles['antd-demo-title']}>{title}</span>
          <span className={styles['antd-demo-action']}>{action}</span>
        </div>
        {children && <div className={styles['antd-demo-content']}>{children}</div>}
        <Divider />
        {footer && <div className={styles['antd-demo-footer']}>{footer}</div>}
      </div>
    </Card>
  )
}

export default ChartCard
