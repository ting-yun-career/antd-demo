import { Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useContext } from 'react'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { GlobalContext } from '../../../global/globalProvider'

interface DataType {
  key: string
  name: string
  age: number
  tags: string[]
}

export const ReadOnlyTable = () => {
  const { locale } = useContext(GlobalContext)

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (data) => (
        <>
          {data.map((tag: string) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'sci-fi') {
              color = 'geekblue'
            } else if (tag === 'action') {
              color = 'volcano'
            } else if (tag === 'comedy') {
              color = 'green'
            } else if (tag === 'documentary') {
              color = 'cyan'
            } else {
              color = 'magenta'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
  ]

  const data: DataType[] = [
    {
      key: '1',
      name: 'Tom Cruise',
      age: 60,
      tags: ['sci-fi', 'action'],
    },
    {
      key: '2',
      name: 'Brad Pitt',
      age: 59,
      tags: ['action', 'comedy', 'romance'],
    },
    {
      key: '3',
      name: 'Tom Hanks',
      age: 66,
      tags: ['documentary', 'comedy'],
    },
    {
      key: '4',
      name: 'Johnny Deep',
      age: 66,
      tags: ['sci-fi', 'action', 'comedy'],
    },
    {
      key: '5',
      name: 'Leonardo DiCaprio',
      age: 48,
      tags: ['sci-fi', 'action', 'romance'],
    },
  ]

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '表格 - 资料展示' : 'Table - Read Only'}</PageTitle>

      <Table columns={columns} dataSource={data} pagination={{ hideOnSinglePage: true }} />
    </>
  )
}
