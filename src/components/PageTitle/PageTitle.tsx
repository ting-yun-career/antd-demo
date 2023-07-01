import { ReactNode } from 'react'
import { Breadcrumb, Typography } from 'antd'
import { useLocation } from 'react-router-dom'

interface IPageTitle {
  children: ReactNode
}

export const PageTitle: React.FC<IPageTitle> = (props: IPageTitle) => {
  const location = useLocation()
  const pathItems = location.pathname.split('/').filter((name) => {
    return name
  })
  pathItems.shift()
  const pathElements = pathItems.map((key) => ({ title: key.charAt(0).toUpperCase() + key.slice(1) }))

  return (
    <>
      <Typography.Title level={3} style={{ margin: '0', userSelect: 'none' }}>
        {props.children}
      </Typography.Title>
      {pathElements?.length > 1 ? (
        <Breadcrumb items={pathElements} style={{ fontSize: '0.9em', marginTop: '5px', marginBottom: '20px' }} />
      ) : (
        <div style={{ height: '25px' }} />
      )}
    </>
  )
}
