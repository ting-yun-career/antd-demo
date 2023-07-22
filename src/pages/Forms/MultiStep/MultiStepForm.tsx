import { Button, Card, Divider, Form, Input, InputNumber, Select, Steps } from 'antd'
import { useContext, useState } from 'react'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { GlobalContext } from '../../../global/globalProvider'

export const MultiStepForm = () => {
  const { locale } = useContext(GlobalContext)

  const [formA] = Form.useForm()
  const [formB] = Form.useForm()
  const [formC] = Form.useForm()

  const formItemAttributes = {
    style: { minWidth: '100px' },
  }

  const [current, setCurrent] = useState(1)

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '表单 - 多步骤' : 'Form - MultiStep'}</PageTitle>

      <Card style={{ overflow: 'hidden' }}>
        <Steps
          current={current}
          items={[
            {
              title: locale === 'zh_CN' ? '已完成' : 'Finished',
              description: locale === 'zh_CN' ? '说明 A' : 'Form A description',
            },
            {
              title: locale === 'zh_CN' ? '进行中' : 'In Progress',
              description: locale === 'zh_CN' ? '说明 B' : 'Form B description',
            },
            {
              title: locale === 'zh_CN' ? '等候中' : 'Waiting',
              description: locale === 'zh_CN' ? '说明 C' : 'Form C description',
            },
          ]}
        />

        <Divider />

        {current === 0 && (
          <Form form={formA} layout="vertical">
            <Form.Item name="fname" label={locale === 'zh_CN' ? '名' : 'First Name'} {...formItemAttributes}>
              <Input />
            </Form.Item>
            <Form.Item name="lname" label={locale === 'zh_CN' ? '姓' : 'Last Name'} {...formItemAttributes}>
              <Input />
            </Form.Item>
            <Form.Item name="country" label={locale === 'zh_CN' ? '國籍' : 'Country'} hasFeedback>
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
        )}

        {current === 1 && (
          <Form form={formB} layout="vertical">
            <Form.Item name="phone" label={locale === 'zh_CN' ? '电话' : 'Telephone'} {...formItemAttributes}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label={locale === 'zh_CN' ? '地址' : 'Address'} {...formItemAttributes}>
              <Input />
            </Form.Item>
            <Form.Item
              name="years"
              label={locale === 'zh_CN' ? '居住年数' : 'Years living at this address'}
              {...formItemAttributes}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        )}

        {current === 2 && (
          <Form form={formC} layout="vertical">
            <Form.Item name="info" label={locale === 'zh_CN' ? '评论' : 'Comments'} {...formItemAttributes}>
              <Input.TextArea autoSize={{ minRows: 9, maxRows: 20 }} />
            </Form.Item>
          </Form>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => {
              current > 0 && setCurrent(current - 1)
            }}
          >
            {locale === 'zh_CN' ? '上頁' : 'Previous'}
          </Button>
          <Button
            onClick={() => {
              current < 2 && setCurrent(current + 1)
            }}
          >
            {locale === 'zh_CN' ? '下頁' : 'Next'}
          </Button>
        </div>
      </Card>
    </>
  )
}
