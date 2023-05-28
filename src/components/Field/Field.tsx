import { CaretUpOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import styles from './Field.module.scss'
import { red } from '@ant-design/colors'

interface IChartFieldProps {
  label: string
  value: string | number
}

const ChartField: React.FC<IChartFieldProps> = (props: IChartFieldProps) => {
  const { label, value } = props
  return (
    <Space className={styles['antd-demo-field']}>
      <span className={styles['antd-demo-label']}>{label}</span>
      <span className={styles['antd-demo-number']}>
        {value}
        <CaretUpOutlined style={{ marginLeft: '5px', color: red[5] }} />
      </span>
    </Space>
  )
}

export default ChartField
