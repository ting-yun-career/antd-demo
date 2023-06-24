import {
  AutoComplete,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Slider,
  Switch,
  TimePicker,
} from 'antd'
import { PageTitle } from '../../components/PageTitle/PageTitle'

const Forms = () => {
  const [baiscForm] = Form.useForm()
  const [advancedForm] = Form.useForm()

  const formItemStyle = { minWidth: '100px' }

  const colResp = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }

  return (
    <>
      <PageTitle>Forms</PageTitle>
      <Row gutter={[10, 20]}>
        <Col {...colResp}>
          <Card title="Basic Form Elements" style={{ width: '100%' }}>
            <Form form={baiscForm} layout="vertical">
              <Form.Item name="text" label="Text" style={formItemStyle}>
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password" style={formItemStyle} hasFeedback>
                <Input.Password />
              </Form.Item>
              <Form.Item name="textarea" label="Textarea" style={formItemStyle}>
                <Input.TextArea showCount />
              </Form.Item>
              <Form.Item name="select" label="Select" hasFeedback>
                <Select
                  placeholder="Please select"
                  options={[
                    { value: 1, label: 'Option 1' },
                    { value: 2, label: 'Option 2' },
                    { value: 3, label: 'Option 3' },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item name="multiselect" label="MultiSelect" hasFeedback>
                <Select
                  mode={'multiple'}
                  placeholder="Please select"
                  options={[
                    { value: 1, label: 'Option 1' },
                    { value: 2, label: 'Option 2' },
                    { value: 3, label: 'Option 3' },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item name="autocomplete" label="AutoComplete">
                <AutoComplete
                  options={[
                    { label: 'Option A', value: 'A' },
                    { label: 'Option B', value: 'B' },
                    { label: 'Option C', value: 'C' },
                  ]}
                  filterOption={(inputValue, option) => {
                    return option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }}
                  placeholder="try typing 'A' or 'B' or 'C'"
                />
              </Form.Item>
              <Form.Item name="numberValue" label="Numeral Value" style={formItemStyle}>
                <InputNumber min={1} max={99} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="toggle" label="Toggle" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item name="slider" label="Slider">
                <Slider
                  marks={{
                    0: 'A',
                    20: 'B',
                    40: 'C',
                    60: 'D',
                    80: 'E',
                    100: 'F',
                  }}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col {...colResp}>
          <Card title="Advanced Form Elements" style={{ width: '100%' }}>
            <Form form={advancedForm} layout="vertical">
              <Form.Item name="date" label="Date Picker">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="time" label="Date Picker">
                <TimePicker style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Forms
