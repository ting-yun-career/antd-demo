import { ReactNode } from 'react'
import { Typography } from 'antd'

interface IPageTitle {
  children: ReactNode
}

export const PageTitle: React.FC<IPageTitle> = (props: IPageTitle) => {
  return (
    <Typography.Title level={2} style={{ margin: '20px 0' }}>
      {props.children}
    </Typography.Title>
  )
}
