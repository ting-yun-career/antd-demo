import { Card, CardProps, Divider } from 'antd'
import styles from './ChartCard.module.scss'

export interface IChartCardProps extends CardProps {
  loading?: boolean
  title: React.ReactNode
}

const ChartCardArchieved: React.FC<IChartCardProps> = (props: IChartCardProps) => {
  const { title, children, loading } = props

  return (
    <Card loading={loading} className={styles['chartcard']} bodyStyle={{ padding: 0, borderRadius: '3px' }}>
      <div className={styles['chartcard-header']}>
        <span className={styles['chartcard-title']}>{title}</span>
      </div>
      {children && <div className={styles['chartcard-content']}>{children}</div>}
    </Card>
  )
}

export default ChartCardArchieved
