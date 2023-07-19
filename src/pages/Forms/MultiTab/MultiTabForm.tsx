import { Col, Collapse, CollapseProps, Form, Input, Row, Select } from 'antd'
import { useContext } from 'react'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { GlobalContext } from '../../../global/globalProvider'

const MultiTabForm = () => {
  const { locale } = useContext(GlobalContext)
  const [formA] = Form.useForm()
  const [formB] = Form.useForm()
  const [formC] = Form.useForm()

  const formItemStyle = { minWidth: '100px' }

  const colResp = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }

  const items: CollapseProps['items'] = [
    {
      key: 'A',
      label: 'Form A Title',
      children: (
        <Form form={formA} layout="vertical">
          <Form.Item name="text" label={locale === 'zh_CN' ? '名' : 'First Name'} style={formItemStyle}>
            <Input />
          </Form.Item>
          <Form.Item name="text" label={locale === 'zh_CN' ? '姓' : 'Last Name'} style={formItemStyle}>
            <Input />
          </Form.Item>
          <Form.Item name="select" label={locale === 'zh_CN' ? '國籍' : 'Country'} hasFeedback>
            <Select
              placeholder="Please select"
              options={[
                { value: 'USA', label: locale === 'zh_CN' ? '美國' : 'USA' },
                { value: 'CN', label: locale === 'zh_CN' ? '中國' : 'China' },
                { value: 'CA', label: locale === 'zh_CN' ? '加拿大' : 'Canada' },
              ]}
            ></Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'B',
      label: 'Form B Title',
      children: (
        <Form form={formB} layout="vertical">
          <Form.Item name="text" label={locale === 'zh_CN' ? '名' : 'First Name'} style={formItemStyle}>
            <Input />
          </Form.Item>
          <Form.Item name="text" label={locale === 'zh_CN' ? '姓' : 'Last Name'} style={formItemStyle}>
            <Input />
          </Form.Item>
          <Form.Item name="select" label={locale === 'zh_CN' ? '國籍' : 'Country'} hasFeedback>
            <Select
              placeholder="Please select"
              options={[
                { value: 'USA', label: locale === 'zh_CN' ? '美國' : 'USA' },
                { value: 'CN', label: locale === 'zh_CN' ? '中國' : 'China' },
                { value: 'CA', label: locale === 'zh_CN' ? '加拿大' : 'Canada' },
              ]}
            ></Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'C',
      label: 'Form C Title',
      children: (
        <Form form={formC} layout="vertical">
          <Form.Item name="text" label={locale === 'zh_CN' ? '名' : 'First Name'} style={formItemStyle}>
            <Input />
          </Form.Item>
          <Form.Item name="text" label={locale === 'zh_CN' ? '姓' : 'Last Name'} style={formItemStyle}>
            <Input />
          </Form.Item>
          <Form.Item name="select" label={locale === 'zh_CN' ? '國籍' : 'Country'} hasFeedback>
            <Select
              placeholder="Please select"
              options={[
                { value: 'USA', label: locale === 'zh_CN' ? '美國' : 'USA' },
                { value: 'CN', label: locale === 'zh_CN' ? '中國' : 'China' },
                { value: 'CA', label: locale === 'zh_CN' ? '加拿大' : 'Canada' },
              ]}
            ></Select>
          </Form.Item>
        </Form>
      ),
    },
  ]

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '表单 - 多标签' : 'Form - Multi-Tab'}</PageTitle>
      <Row gutter={[10, 20]}>
        <Col {...colResp}>
          <Collapse items={items} defaultActiveKey={['A']} />
        </Col>
      </Row>
    </>
  )
}

export default MultiTabForm
