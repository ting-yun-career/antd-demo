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
  gender: 'Male' | 'Female'
}

const tagColors: { [key: string]: string } = {
  'sci-fi': 'geekblue',
  action: 'volcano',
  comedy: 'green',
  romance: 'pink',
  drama: '#557',
  documentary: 'cyan',
  default: 'magenta',
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
      title: locale === 'zh_CN' ? '性别' : 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: { compare: (a, b) => a.gender.localeCompare(b.gender) },
      render: (gender: 'Male' | 'Female') => {
        const color = gender === 'Female' ? 'red' : 'blue'
        return <Tag color={color}>{gender}</Tag>
      },
      width: 100,
    },
    {
      title: locale === 'zh_CN' ? '类型' : 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            const color = tagColors[tag] || tagColors['default']
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
      gender: 'Male',
    },
    {
      key: '2',
      name: 'Brad Pitt',
      age: 59,
      tags: ['action', 'comedy', 'romance'],
      gender: 'Male',
    },
    {
      key: '3',
      name: 'Tom Hanks',
      age: 66,
      tags: ['documentary', 'comedy'],
      gender: 'Male',
    },
    {
      key: '4',
      name: 'Johnny Depp',
      age: 66,
      tags: ['sci-fi', 'action', 'comedy'],
      gender: 'Male',
    },
    {
      key: '5',
      name: 'Leonardo DiCaprio',
      age: 48,
      tags: ['sci-fi', 'action', 'romance'],
      gender: 'Male',
    },
    {
      key: '6',
      name: 'Benedict Cumberbatch',
      age: 45,
      tags: ['drama', 'action'],
      gender: 'Male',
    },
    {
      key: '7',
      name: 'Priyanka Chopra',
      age: 39,
      tags: ['drama', 'comedy'],
      gender: 'Female',
    },
    {
      key: '8',
      name: 'Idris Elba',
      age: 49,
      tags: ['action', 'drama'],
      gender: 'Male',
    },
    {
      key: '9',
      name: 'Penélope Cruz',
      age: 47,
      tags: ['drama', 'romance'],
      gender: 'Female',
    },
    {
      key: '10',
      name: 'Jackie Chan',
      age: 67,
      tags: ['action', 'comedy'],
      gender: 'Male',
    },
    {
      key: '11',
      name: 'Kate Winslet',
      age: 46,
      tags: ['drama', 'romance'],
      gender: 'Female',
    },
    {
      key: '12',
      name: 'Javier Bardem',
      age: 52,
      tags: ['drama', 'thriller'],
      gender: 'Male',
    },
    {
      key: '13',
      name: "Lupita Nyong'o",
      age: 38,
      tags: ['drama', 'action'],
      gender: 'Female',
    },
    {
      key: '14',
      name: 'Hugh Jackman',
      age: 53,
      tags: ['action', 'musical'],
      gender: 'Male',
    },
    {
      key: '15',
      name: 'Charlize Theron',
      age: 46,
      tags: ['action', 'drama'],
      gender: 'Female',
    },
  ]

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '表格 - 资料展示' : 'Table - Read Only'}</PageTitle>
      <Table columns={columns} dataSource={data} pagination={{ hideOnSinglePage: true }} />
    </>
  )
}

export default ReadOnlyTable
