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
      title: locale === 'zh_CN' ? '演员名' : 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      sorter: { compare: (a, b) => a.name.localeCompare(b.name) },
      width: 400,
    },
    {
      title: locale === 'zh_CN' ? '年龄' : 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: { compare: (a, b) => a.age - b.age },
      width: 100,
    },
    {
      title: locale === 'zh_CN' ? '类型' : 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (data) => (
        <>
          {data.map((tag: string) => {
            let color
            if (tag === 'sci-fi') {
              color = 'geekblue'
            } else if (tag === 'action') {
              color = 'volcano'
            } else if (tag === 'comedy') {
              color = 'green'
            } else if (tag === 'romance') {
              color = 'pink'
            } else if (tag === 'drama') {
              color = '#557'
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
    {
      key: '6',
      name: 'Benedict Cumberbatch',
      age: 45,
      tags: ['drama', 'action'],
    },
    {
      key: '7',
      name: 'Priyanka Chopra',
      age: 39,
      tags: ['drama', 'comedy'],
    },
    {
      key: '8',
      name: 'Idris Elba',
      age: 49,
      tags: ['action', 'drama'],
    },
    {
      key: '9',
      name: 'Penélope Cruz',
      age: 47,
      tags: ['drama', 'romance'],
    },
    {
      key: '10',
      name: 'Jackie Chan',
      age: 67,
      tags: ['Action', 'comedy'],
    },
    {
      key: '11',
      name: 'Kate Winslet',
      age: 46,
      tags: ['drama', 'romance'],
    },
    {
      key: '12',
      name: 'Javier Bardem',
      age: 52,
      tags: ['drama', 'thriller'],
    },
    {
      key: '13',
      name: "Lupita Nyong'o",
      age: 38,
      tags: ['drama', 'action'],
    },
    {
      key: '14',
      name: 'Hugh Jackman',
      age: 53,
      tags: ['action', 'musical'],
    },
    {
      key: '15',
      name: 'Charlize Theron',
      age: 46,
      tags: ['action', 'drama'],
    },
  ]

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '表格 - 资料展示' : 'Table - Read Only'}</PageTitle>

      <Table columns={columns} dataSource={data} pagination={{ hideOnSinglePage: true }} />
    </>
  )
}
