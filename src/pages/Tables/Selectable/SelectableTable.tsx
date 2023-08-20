import { Button, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useContext, useState } from 'react'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { GlobalContext } from '../../../global/globalProvider'
import { ActorData, TagColorData } from '../tableData'
import _ from 'lodash'

const actorNameFilterItems = ActorData.map((data) => ({
  text: data.name,
  value: data.name,
}))

const tagFilterItems = Array.from(new Set(ActorData.flatMap((data) => data.tags))).map((tag) => ({
  text: tag,
  value: tag,
}))

export const SelectableTable = () => {
  const { locale } = useContext(GlobalContext)

  const columns: ColumnsType<DataType> = [
    {
      title: locale === 'zh_CN' ? '演员名' : 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      sorter: { compare: (a, b) => a.name.localeCompare(b.name) },
      width: 400,
      filterSearch: true,
      filters: actorNameFilterItems,
      onFilter: (value, record) => record.name.includes(value as string),
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
            const color = TagColorData[tag] || TagColorData['default']
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
      filters: tagFilterItems,
      onFilter: (value, record) => record.tags.includes(value as string),
    },
  ]

  const [selectedActors, setSelectedActors] = useState<DataType[]>([])

  const onSelectChange = (selectedKeys: (string | number)[], selectedRows: DataType[]) => {
    setSelectedActors(selectedRows)
  }

  const onSubmit = () => {
    alert(
      JSON.stringify(
        selectedActors,
        (key, value) => {
          if (key === 'id' || key === 'tags') return undefined
          return value
        },
        2
      )
    )
  }

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '表格 - 勾选数据' : 'Table - Selectable'}</PageTitle>
      <Table
        columns={columns}
        dataSource={ActorData}
        pagination={{ hideOnSinglePage: true }}
        rowSelection={{
          onChange: onSelectChange,
        }}
      />
      <Button onClick={onSubmit}>Submit</Button>
    </>
  )
}

export default SelectableTable
