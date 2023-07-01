import { Space, Typography } from 'antd'

interface IProgressCard {
  title: string
  subTitle: string
  total: number
  completed: number
}

export const ProgressCard: React.FC<IProgressCard> = ({ title, subTitle, total, completed }: IProgressCard) => {
  return (
    <Space style={{ border: '1px solid white', width: '100%' }} direction="vertical">
      <Typography.Title level={2} style={{ margin: '0' }}>
        {title}
      </Typography.Title>
      <div>{subTitle}</div>
      <div style={{ marginTop: '3rem' }}>
        completed: {completed}
        <br />
        progress bar
        <br />
        {Math.floor((completed / total) * 100)}%
      </div>
    </Space>
  )
}
