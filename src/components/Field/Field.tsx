import { Space } from 'antd'
import styles from './Field.module.scss'

interface IChartFieldProps {
  label: string
  value: string | number
}

const ChartField: React.FC<IChartFieldProps> = (props: IChartFieldProps) => {
  const { label, value } = props
  return (
    <Space className={styles['antd-demo-field']}>
      <span className={styles['antd-demo-label']}>{label}</span>
      <span className={styles['antd-demo-number']}>{value}</span>
    </Space>
  )
}

export default ChartField
