import { Space } from 'antd'
import styles from './ChartField.module.scss'
import React, { CSSProperties } from 'react'

interface IChartFieldProps {
  label: string
  value: string | number
  postIcon?: React.ReactElement
  style?: CSSProperties
}

const ChartField: React.FC<IChartFieldProps> = (props: IChartFieldProps) => {
  const { label, value, postIcon, style } = props
  let clonedPostIcon = null
  if (postIcon) {
    clonedPostIcon = React.cloneElement(postIcon, { style: { marginLeft: '5px', ...postIcon.props.style } })
  }
  return (
    <Space className={styles['antd-demo-field']} style={style}>
      <span className={styles['antd-demo-label']}>{label}</span>
      <span className={styles['antd-demo-value']}>
        {value}
        {clonedPostIcon}
      </span>
    </Space>
  )
}

export default ChartField
